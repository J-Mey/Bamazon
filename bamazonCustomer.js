require("dotenv").config();

var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASS,
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});

function start() {
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        for (var i = 0; i < res.length; i++){
            console.log("ID: " + res[i].id);
            console.log("Product: " + res[i].product_name);
            console.log("Department: " + res[i].department_name);
            console.log("Price: $" + res[i].price);
            console.log("Quantity in stock: " + res[i].stock_quantity);
            console.log("-----------------------")
        }
        pickItemId();
    });
};

function pickItemId(){
    inquirer
        .prompt([{
            name: "pickId",
            type: "input",
            message: "What item by ID number would you like to purchase?",    
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?"

        }])
        .then(function(answer){
            console.log("Choosen product by ID: " + answer.pickId);
            console.log("Quantity choosen: " + answer.quantity);
        })
     
           
      connection.end()
};
