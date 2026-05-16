import { app } from "./app.js";
import { env } from "./env.js";

app.listen(env.PORT, () => {
  console.log(`Elite Doorstep Salon API listening on port ${env.PORT}`);
});
