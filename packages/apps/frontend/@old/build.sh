cd backend
docker build -t lascuolaopensource/join-backend --build-arg backendurl=https://admin.lascuolaopensource.xyz .
docker push lascuolaopensource/join-backend
cd ..
cd frontend
docker build -t lascuolaopensource/join-frontend .
docker push lascuolaopensource/join-frontend