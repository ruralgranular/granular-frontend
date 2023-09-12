To access password protected live website, the password can be found at Websites/Granular/https://repository.ruralgranular.eu/

If you want to deploy to the live site's server you must first do:
Original instruction for help(https://informatique.iamm.fr/connexion-vpn/)
1. You have to install VPN client which is FortiClientVPN(https://www.fortinet.com/support/product-downloads#vpn)
2. Configure VPN with: VPN CIHEAM MTP1 as connection name and description. 
   Use: https://vpn1.iamm.fr as remote gateway and 443 as port
   Use: None as client certificate
   After configuring the connection, use username and password that are in KeePass at Servers/GranualVPS/User for Granular VPS
   With the same credentials you can ssh the server to start the deployment at the IP mentioned in KeePass
3. You should be connected to continue with the deployment steps of granular repository


Granual repository deployment steps:

1. If it is the first time, clone the project from granular frontend repository. 
   In other case, in granular fronted run: sudo git pull origin main 
2. As backend is linked as submodule to front, in order to run it and update it, you have to update 
the submodule's content. To do that:
 -If it is the first time cloning the repo, first run: git submodule update --init granular-backend
 -To pull the latest changes and update backend: Run inside granular-frontend folder: git submodule update --remote granular-backend      
3. Check that after running the command, the backend folder's content is updated
4. Check that the URLs are pointing to correct endpoint. In the default configuration, 
   they are pointing to IAMM hosting servers. In order to change the endpoints, modify docker-compose.yml
   inside granular-fronted and change REACT_APP_API_URL variable to point to the correct backend endpoint.
   Moreover, to change backend's endpoint towards Drupal, go to backend/app and edit baseUrl variable in main.py
5. After checking the endpoint, go to Granular frontend folder and run: sudo docker compose up --build -d
6. After running the previous command the repository website should be up and running
7. In case something is wrong, no panic. Check with docker ps to see running containers. Two containers should be running, one for front and one for backend
8. Check with docker logs container_id to see if any errors came up in each container or if anything is shown in console at the browser
9. To verify backend's functionallity, you can also visit http://ipAdrressHere:8000/docs to check if function calls are returning any result from drupal.

Granual drupal deployment steps(if it is necessary):
1. Clone project from granular admin database repository
2. In the granular-admin-database folder, where docker-compose.yml file is located, run docker compose up --build -database
3. After that, at http://ipaddresshere:8005 the drupal's instanse should be running
4. To acccess drupal as an admin, the password can be found in KeePass at Websites/Granular/Drupal admin

Good to know:
In case of server modification for live website(https://repository.ruralgranular.eu/), the mapping for redirecting is in etc/nginx/sites-enabled/default 
The passwords for MariaDB of drupal are in Websites/Granular/Docker DB passwords



