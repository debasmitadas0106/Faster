@echo off
echo ----------------------------------------
echo  Building Docker Image...
echo ----------------------------------------
docker build -t faster-backend .

echo ----------------------------------------
echo  Tagging Image as latest...
echo ----------------------------------------
docker tag faster-backend gcr.io/faster-479316/faster-backend:latest

echo ----------------------------------------
echo  Pushing Image to Google Cloud...
echo ----------------------------------------
docker push gcr.io/faster-479316/faster-backend:latest

echo ----------------------------------------
echo  Restarting Kubernetes Deployment...
echo ----------------------------------------
kubectl rollout restart deployment faster-backend

echo ----------------------------------------
echo  Deployment updated successfully! 🚀
echo ----------------------------------------
pause
