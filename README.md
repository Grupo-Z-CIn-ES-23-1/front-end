# front-end

This is the Front-End application of the Flood Forecasting project.
You can check more info about this project [here](https://github.com/Grupo-Z-CIn-ES-23-1/projeto-es)

# Running in dev mode

Clone this repository  
Set up the .env file with NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, and run these commands:

```cmd
cd app
npm start
```

<br>

# Testing

Just run

```cmd
npm test
```

to execute tests for this app  
<br>

# Docker Deploy

You can use tools like Docker Desktop to deploy this project in your local machine.

Clone this repository  
Set up the .env file with NEXT_PUBLIC_GOOGLE_MAPS_API_KEY and run these commands:

```cmd
cd app
docker build -t nextjs-docker-front-floodforec .
docker run -dp 8080:8080 --env-file .env  nextjs-docker-front-floodforec
```

# GCP Deploy (Manual)

You can deploy this application in GCP following these steps:

To deploy for the first time, you gotta run:

```
gcloud config set project stellar-lock-399303
gcloud artifacts repositories create nextjs-docker-front-floodforec-docker-repo --repository-formar=docker --location=us-west2 --description="Docker repository"
gcloud builds submit --region=us-west2 --tag us-west2-docker.pkg.dev/stellar-lock-399303/nextjs-docker-front-floodforec-docker-repo/nextjs-docker-front-floodforec-image:prd
gcloud run deploy --image=us-west2-docker.pkg.dev/stellar-lock-399303/nextjs-docker-front-floodforec-docker-repo/nextjs-docker-front-floodforec-image:prd
```

To redeploy, you need to run:

```
gcloud builds submit --region=us-west2 --tag us-west2-docker.pkg.dev/stellar-lock-399303/nextjs-docker-front-floodforec-docker-repo/nextjs-docker-front-floodforec-image:prd
gcloud run deploy --image=us-west2-docker.pkg.dev/stellar-lock-399303/nextjs-docker-front-floodforec-docker-repo/nextjs-docker-front-floodforec-image:prd
```
