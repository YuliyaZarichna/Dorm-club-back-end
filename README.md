These are the steps to run the application:

1. Run MySQL

2. Install dependencies: 
   $ npm install

3. Run server: 
   $ npm start

To create a new table in DB, example for User
sequelize model:create --name User --attributes name:string

To push changes to DB 
sequelize db:migrate
