require("dotenv").config();

var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var colors = require("colors");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASS,
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("-----------------------------------------------------------------------------------".cyan);
    console.log("Thank you for visiting Bamazon! What would you like to purchase from our inventory?".bold);
    console.log("-----------------------------------------------------------------------------------".cyan);
    start();
});

function start() {
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;

        var table = new Table({
            head: ["ID".blue, "Product".blue, "Department".blue, "Price".blue, "In Stock".blue],
            colWidths:[5, 23, 15, 10, 10 ]
        });
        for (var i = 0; i < res.length; i++){
            table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            )
        };
        console.log(table.toString());
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
            orderItems(idPicked, quantityPicked);
        });              
};

function orderItems(pickId, quantityNeeded) {  
    connection.query("SELECT * FROM products WHERE id = " + pickId, function(err, res) {
        if (err) throw err;
        if(quantityNeeded <= res[0].stock_quantity) {
            var costTotal = res[0].price * quantityNeeded;
            console.log("---------------------------------------------------------------------".cyan);
            console.log("Your total cost is " + ("$" + costTotal.toFixed(2)).green + ", for (" + quantityNeeded + ") " + res[0].product_name + "(s).");
            console.log("---------------------------------------------------------------------".cyan);
            connection.query("UPDATE products SET stock_quantity = stock_quantity - " + quantityNeeded + " WHERE id = " + pickId);
        }
        else {
            console.log("------------------------------------------------------------------------------------------------------".cyan);
            console.log("Sorry insufficient quantity or out of stock! Please change total quantity or product ID and try again.".red);
            console.log("------------------------------------------------------------------------------------------------------".cyan);
            //start();
        }
       start();    
    });  
};

