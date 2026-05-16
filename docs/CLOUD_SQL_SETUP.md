# Cloud SQL PostgreSQL Setup

## Create Instance

```bash
gcloud sql instances create elite-salon-postgres \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1
```

## Create Database and User

```bash
gcloud sql databases create elite_doorstep_salon \
  --instance=elite-salon-postgres

gcloud sql users create elite_salon_app \
  --instance=elite-salon-postgres \
  --password=REPLACE_WITH_STRONG_PASSWORD
```

## Cloud Run Connection String

When using the Cloud SQL Unix socket, set `DATABASE_URL` like:

```text
postgres://elite_salon_app:PASSWORD@/elite_doorstep_salon?host=/cloudsql/PROJECT_ID:REGION:elite-salon-postgres
```

Store the value in Secret Manager and expose it to the backend Cloud Run service.

## Migrations

Run migrations from a trusted environment that can reach Cloud SQL:

```bash
npm run db:migrate --workspace backend
```

For private Cloud SQL access, use the Cloud SQL Auth Proxy locally or run a one-off Cloud Run job with the same image and secret configuration.
