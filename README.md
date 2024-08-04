# Railway_Backend_Server

## How to setup?
1. install node js on your machine
2. Clone the repository first go to the main branch Run Command :

``` npm install ```

3. Start the project 
``` npm start ```
# I have provided db url for testing purpose you can change if needed
### .env file


 DB_URL=mongodb+srv://railway_management:HTqt3E6H6x4hx40P@cluster0.6ina2db.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
SECRET_TOKEN=88b16e0e2b6436b915fef2856c119522968bf2fca9a676e7fff06184501f2dbbd0e04fe456cca63f6e41743905a5aec46bcd3032b130fb4b612a606bc59441a8
PORT=8000

## key features :
1. User Management with Admin role with jwt authetication and authorization
2. station Management
3. Wallet management with fund and transections
4. Train management with details
5. Admin can create Train Schedule other wise it will automatically create everyday with node cron job.
6. seat has 3 types (economy , buisness , vip) and it has diffrent prices.
7. fare calculation will count by stopage of train and seat class like economy buissness and vip
8. if a user who has sufficient balance can buy ticket .
9. user can cancel the ticket and refund his wallet
10. 5 train will schedule in a day .
   

 
 ## Admin Credentials :
 email : iftekharSalmin@gmail.com
 password : 123456

 ## Postman for Api Documentations : https://documenter.getpostman.com/view/22373551/2sA3rwNaUh
