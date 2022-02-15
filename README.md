# MSSQLConnect

Access SQL Server in Node.js
how to access relational database MS SQL Server 2014 in **Node.js** application **using Express.js8** in this section.

In order to access MS SQL database, we need to install drivers for it. There are many drivers available for SQL server in NPM. We will use **mssql driver here.

**Install Driver**
Install mssql driver using npm command, **npm install mssql in the command prompt**. This will add mssql module folder in node_modules folder in your Node.js application. This tutorial uses mssql v2.3.1, which is latest version as of now.

After installing the driver, we are ready to access MS SQL server database. We will connect to a local SQLExpress database server and fetch all the records from table.

Run the above example using **node callapi.js** command and point your browser to **http://localhost:5002/getdb** which displays an array of all record in the db.
