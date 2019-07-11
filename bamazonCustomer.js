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
    console.log("Thank you for visiting Bamazon! What would you like to purchase from our inventory?" + "\n");
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
            var idPicked = answer.pickId;
            var quantityPicked = answer.quantity;
            
            //console.log("Product ID: " + answer.pickId);
            //console.log("Quantity chosen: " + answer.quantity);
            
            orderItems(idPicked, quantityPicked);
        });              
};

function orderItems(pickId, quantityNeeded) {
    
    connection.query("SELECT * FROM products WHERE id = " + pickId, function(err, res) {
        if (err) throw err;
        if(quantityNeeded <= res[0].stock_quantity) {
            var costTotal = res[0].price * quantityNeeded;
            console.log("Your total cost is " + costTotal + ", for " + quantityNeeded + " " + res[0].product_name + "(s).");
            console.log("------------------------------------------------------------------------------------------------------");
            connection.query("UPDATE products SET stock_quantity = stock_quantity - " + quantityNeeded + " WHERE id = " + pickId);
        }
        else {
            console.log("Sorry insufficient quantity or out of stock! Please change total quantity or product ID and try again.");
            console.log("------------------------------------------------------------------------------------------------------");
            //start();
        }
       start();    
    });
    
};

