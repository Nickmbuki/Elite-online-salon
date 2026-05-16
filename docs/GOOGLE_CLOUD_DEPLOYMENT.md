# Google Cloud Deployment

The project deploys containerized Node and static frontend services to Cloud Run. Google Cloud Run runs container images and supports Node services through containers or source deployment.

## Artifact Registry

```bash
gcloud artifacts repositories create elite-doorstep-salon \
  --repository-format=docker \
  --location=us-central1
```

## Backend on Cloud Run

Build and deploy:

```bash
gcloud builds submit --config cloudbuild.backend.yaml \
  --substitutions=_REGION=us-central1,_SERVICE=elite-doorstep-salon-backend,_CORS_ORIGIN=https://YOUR_FRONTEND_URL,_CLOUD_SQL_INSTANCE=PROJECT_ID:REGION:INSTANCE
```

Set `DATABASE_URL` from Secret Manager after deployment:

```bash
gcloud run services update elite-doorstep-salon-backend \
  --region=us-central1 \
  --set-secrets=DATABASE_URL=elite-salon-database-url:latest
```

## Frontend on Cloud Run

Deploy after the backend URL is known:

```bash
gcloud builds submit --config cloudbuild.frontend.yaml \
  --substitutions=_REGION=us-central1,_SERVICE=elite-doorstep-salon-frontend,_VITE_API_BASE_URL=https://YOUR_BACKEND_URL
```

## Frontend Alternative

The Vite build output in `frontend/dist` can also be uploaded to Cloud Storage and served through Cloud CDN. Keep SPA fallback configured so `/booking` loads `index.html`.

## Required Environment Variables

Backend:

```env
DATABASE_URL=
PORT=8080
CORS_ORIGIN=https://YOUR_FRONTEND_URL
```

Frontend build:

```env
VITE_API_BASE_URL=https://YOUR_BACKEND_URL
```

## Sources

- Cloud Run overview and container deployment docs: https://cloud.google.com/run/docs
- Cloud Run Node.js quickstart: https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service
