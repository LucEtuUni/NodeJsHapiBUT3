# iut-project
# NodeJsHapiBUT3

# Installation des dépendances :

npm i @hapi/hapi
npm i
npm install debug


# Commande pour lancer le docker :

docker run --name hapi-mysql -e MYSQL_USER=mysqluser -e MYSQL_PASSWORD=hapi -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user -d -p 3308:3306 mysql:8 mysqld --default-authentication-plugin=mysql_native_password


# Mettre dans le .env :

MAIL_HOST=smtp.ethereal.email<br>
MAIL_PORT=587<br>
MAIL_USER=(adresse mail ethereal)<br>
MAIL_PASS=(mot de passe ethereal)<br>
MAIL_SECURE=false

Remplacer MAIL_USER et MAIL_PASS par le compte que ethereal mail donne.



# Pour tester aller sur :
http://localhost:3000/documentation

Se connecter avec User-> login 
Prendre le token JWT et le copier dans Authorize avec Bearer devant.
