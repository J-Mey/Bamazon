# Bamazon Node.js & MySQL

Bamazon is a Amazon-like storefront that was created with the MySQL skills we learned this week. The app will take in orders from customers and deplete stock from the store's inventory.

## Deployed GitHub

https://j-mey.github.io/Bamazon/

## GitHub page

https://github.com/J-Mey/Bamazon

# bamazonCustomer.js 

## Running the node

When running the node for the first time, make sure to first run the required commands in the terminal before running the application.

* *npm install mysql*
* *npm install inquirer*
* *npm install cli-table*
* *npm install colors*

Now you can run *node bamazonCustomer.js*. Running this application will first display all of the items available for sale. It display the ids, names, and prices of products for sale along with a message asking which item you would like to purchase by entering the ID number:

![Node initial start](https://github.com/J-Mey/Bamazon/blob/master/images/node-start.JPG?raw=true)

## Entering the item id and quantity to purchase

Once the customer has placed the order, the application should check the inventory to make sure there is a sufficient quantity. If there is a sufficient quantity to purchase then the application will show the customer the total cost of their purchase while also updating the quantity in the database.

![Node purchase](https://github.com/J-Mey/Bamazon/blob/master/images/node-purchase.JPG?raw=true)

![Node purchase](https://github.com/J-Mey/Bamazon/blob/master/images/node-finish.JPG?raw=true)

If the customer enters an invalid quantity that exceeds what is in stock, then it console log an error stating `Sorry insufficient quantity or out of stock! Please change total quantity or product ID and try again.`

![Node error](https://github.com/J-Mey/Bamazon/blob/master/images/node-error.JPG?raw=true)

## Technologies used includes:

* Node
* mySQL
* inquirer
* cli-table
* colors

Jeremy Mey was the developer in this application