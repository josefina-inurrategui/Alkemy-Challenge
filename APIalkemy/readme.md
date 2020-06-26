# API-Alkemy
RESTful API utilizando: 
  - express
  - nodejs
  - MySQL 
  - Javascript 
descripcion: "API para manejo eventos." 
version: "1.0.0"
titulo: "API-alkemy" 
contacto: Josefina Iñurrategui
email: josefina.inurrategui@gmail.com
 

# SERVIDOR: 
  Para iniciar el servidor:
    -Instalar la dependencia "express" (npm install express);
    -Dentro del archivo "server.js" se puede ver que el puerto que se esta utilizando es 3000, si desea puede cambiarlo.
    
# DEPENDENCIAS:
  En esta API se utilizan las siguientes dependencias que deberá instalar:
    - body-parser
    - sequelize
    - MySQL2
(Encontrarán todas las dependencias en el archivo "package.json")

# BASE DE DATOS:
  Una vez instalada la dependencia, en la carpeta Database se encuentran dos archivos. Uno .sql con los comandos necesarios para crear la base de    datos. Y un archivo .js donde se podrá configurar la ruta a la base de datos.
  Se utilizó PhpMyAdmin.

# POSTMAN:
  En el archivo "AlkemyAPI.postman_collection.json" se encuentran las pruebas a los endopoints con los request necesarios.  

# ENDPOINTS Y REQUEST:
  A eventos: 
    - get/events/week/:week
	Este endopint recibe como paramentro el numero de la semana de la cual se quiere consultar. Devuelve un json con los eventos asignidados en esa semana.
 
     - get/events/month/:month
	Este endopint recibe como paramentro el numero del mes del cual se quiere consultar. Devuelve un json con los eventos asignidados ese mes.

      - get/event/:id
	Este endpoint recibe como parametro el ID del evento a 	consultar.Devuelve un json con la información de dicho evento.

      - get/events/cancelled
	Este endpoint devuelve un json con todos los eventos cancelados.

      - post/events
	Endpoint para crear un nuevo evento. El request debe incluir un json con la siguiente informacion:{
        	"event_date": "2000-12-31", #(String con la fecha del evento) 
	        "start_time": "24:59:59", #(String con el horario de inicio)
	        "end_time": "24:59:59" , #(String con el horario de finalización)
	        "participants":[ #(Array con 1 o más objetos)
			{"id_participant": 1}, #(Cada objecto debera incluir el id del participante.
			{"id_participant": 2}]}

       - put/event/:id
	Este endpoint recibe como paramentro el ID del evento que se desea modificar. Y el request debe incluir un json con la siguiente información:{
	    "event_date": "2000-12-31", #(String con la fecha del evento) 
	    "start_time": "24:59:59", #(String con el horario de inicio)
	    "end_time": "24:59:59" , #(String con el horario de finalización)}

       - delete/event/cancel/:id
	Este endopint recibe el id del evento al que se quiere cancelar. Los eventos no serán eliminados para poder tener un registro de ellos. Es por esto que éste endpoint cambia el estado de "ACTIVE" a 0 (False). En el request se deberá incluir un json con la siguiente información:{
            "active":  #(Agregar: 0 en caso de que el evento se cancele o 1 en caso de querer reactivar el evento.)}

  A assistance:
       - get/assistance/:id
	Este endpoint recibe como paramentro el Id del evento al cual se quiere recibir la información de los invitados a participar. Devuelve un json con dicha información.

       - put/assistance/:id
	Este endpoint recibe como parametro el Id del participante que desea modificar la asistencia al evento. El request debe incluir un json con la siguiente informacion:{
            "assistance": "" #(Dentro del string hay 3 opciones'sin respuesta', 'voy', 'no voy'. Por default se colocará sin respuesta hasta que el participante confirme si va o no va.)}

  A Participants
      - post/participants
	Este endopoint crea un nuevo participante. El request debe incluir un json con la siguiente informacion:{
            "complete_name":"", #(String con el nombre completo)
            "email":"", #(string con la dirección de mail)
            "participant_desc":"" #(String con información o descripción del participante)} 