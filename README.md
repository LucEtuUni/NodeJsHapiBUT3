# iut-project
# NodeJsHapiBUT3

Installation des dépendances :





commande pour lancer le docker :

docker run --name hapi-mysql -e MYSQL_USER=mysqluser -e MYSQL_PASSWORD=hapi -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user -d -p 3308:3306 mysql:8 mysqld --default-authentication-plugin=mysql_native_password


Mettre dans le .env :

MAIL_HOST=smtp.ethereal.email<br>
MAIL_PORT=587<br>
MAIL_USER=(adresse mail ethereal)<br>
MAIL_PASS=(mot de passe ethereal)<br>
MAIL_SECURE=false


Remplacer MAIL_USER et MAIL_PASS par le compte que ethereal mail donne.
