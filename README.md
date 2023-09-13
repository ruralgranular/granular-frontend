   <b>To run Granural repository locally , you will need:</b>
1. Clone the project to your directory or if it already exists run 'git pull origin main'
2. Backend is linked as submodule to front, in order to run it and update it you have to
      a.If it is the first time cloning the repo, first run: git submodule update --init granular-backend
      b.To pull the latest changes and update backend: Run inside granular-frontend folder: git submodule update --remote granular-backend
3. Check that the URLs are pointing to correct endpoint. In the default configuration, they are pointing to IAMM hosting servers. In order to change the endpoints, modify docker-compose.ymlinside granular-frontend and change REACT_APP_API_URL variable to point to the correct backend endpoint.Moreover, to change backend's endpoint towards Drupal, go to backend/app and edit baseUrl variable in main.py
4. Run docker compose up --build -d on the root directory where the docker-compose.yml exist in frontend folder
5. Two containers should be running, one for front and one for backend
