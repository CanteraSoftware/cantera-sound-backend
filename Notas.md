//Que hacer antes de comenzar el Proyecto
##instalar las dependencias
npm i

## correr en docker
 docker-compose start postgres
 docker-compose start pgadmin

## correr la migration para que se creen las tablas en la base de datos con sus propiedades(Solo en caso de que no se haya corrido una vez al menos)
 npm run migrations:run

##Si la migracion ya se corrio entonces comenzar el servidor para probar los endpoint en insomnia
 npm run dev


//Datos adicionales
## ver que contenedor esta corriendo
docker ps

## inspeccionar 
docker inspect ab912ffc58fd

## genera el modelo en la base de datos segun la migracion que generaste
 npm run migrations:run

c@nteraSOund

ip
18.117.98.49:5000

{
		"nameFile": "PLAYAMANE x Nateki - MIDNIGHT",
		"nameAuthor": "PLAYANAME",
		"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7HfzPt1iMbl-2nN7_0l-FnhQWYijI_bRHtYN72ri7IYer2hdjTJGN0S__OtISchxgcHw&usqp=CAU",
		"fileUrl": "https://rodri-nodejs-aws.s3.sa-east-1.amazonaws.com/midnight.mp3",
		"categoryId": 1,
		"genderId": 6
	} 
