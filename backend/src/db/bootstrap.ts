import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "./client.js";
import { seedDatabase } from "./seed.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationName = "0000_initial.sql";

async function tableExists(tableName: string) {
  const result = await pool.query<{ exists: boolean }>(
    "select to_regclass($1) is not null as exists",
    [`public.${tableName}`]
  );

  return result.rows[0]?.exists ?? false;
}

async function hasMigrationRun() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS app_migrations (
      name text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    );
  `);

  const result = await pool.query("select 1 from app_migrations where name = $1", [migrationName]);
  return (result.rowCount ?? 0) > 0;
}

async function markMigrationRun() {
  await pool.query(
    "insert into app_migrations (name) values ($1) on conflict (name) do nothing",
    [migrationName]
  );
}

async function runInitialMigration() {
  if (await hasMigrationRun()) {
    return;
  }

  const servicesTableExists = await tableExists("services");

  if (servicesTableExists) {
    await markMigrationRun();
    return;
  }

  const migrationPath = path.join(__dirname, "..", "..", "drizzle", migrationName);
  const migrationSql = await readFile(migrationPath, "utf8");

  await pool.query("begin");
  try {
    await pool.query(migrationSql);
    await pool.query(
      "insert into app_migrations (name) values ($1) on conflict (name) do nothing",
      [migrationName]
    );
    await pool.query("commit");
  } catch (error) {
    await pool.query("rollback");
    throw error;
  }
}

async function bootstrap() {
  await pool.query("select 1");
  await runInitialMigration();
  await seedDatabase(pool);

  const counts = await pool.query<{
    services_count: string;
    gallery_count: string;
    testimonials_count: string;
  }>(`
    SELECT
      (SELECT count(*) FROM services) AS services_count,
      (SELECT count(*) FROM gallery_items) AS gallery_count,
      (SELECT count(*) FROM testimonials) AS testimonials_count;
  `);

  console.log("Database bootstrap complete", counts.rows[0]);
}

bootstrap()
  .catch((error) => {
    console.error("Database bootstrap failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
