// install console.table? npm install console.table
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "photoacy?3I",
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("\nWELCOME TO BAMAZON - WHERE YOU CAN DISCOVER ANYTHING YOU WANT TO BUY ONLINE\n");
    queryItems();
});
// Step 1
function queryItems() {
    var query = connection.query(
        "SELECT * FROM products", function (err, res) {
            initializeApp(res);
            // connection.end(); // Remove this when the app is built
        });
};

function initializeApp(res) {
    console.table(res);
    shop();
};
// Step 2
function shop() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What is the ID of the item you would like to purchase?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many of units of this item would you like to buy?"
        }
    ]).then(function (ans) {
        purchase(ans);
    }); // end inquirer prompt
}; // end shop function

function purchase(ans) {
    let id = ans.id;
        let num = ans.quantity;
        var query = connection.query(
            // code to search database for item id
            "SELECT * FROM products WHERE item_id = ?", 
            [id], function (err, res) {
                if(err) {
                    console.log(err);
                }
            let stock = res[0].stock_quantity;
            let unitCost = res[0].price;
            // code to compare requested quantity with inventory - include inventoryQuery statement (either PURCHASE OR SOLD OUT)
            if(num > stock) {
                console.log("INSUFFICIENT QUANTITY");
                continueShopping();
            } else {
                stock = (stock - num);
                var query = connection.query(
                    "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
                    [stock, id],
                function (err, res) {
                    if(err) {
                        console.log(err);
                    }
                    let invoice = (num * unitCost);     
                    console.log("\nSOLD\nYour total purchase cost: $" + invoice + "\n");
                    continueShopping();
                });
            };
        }); // end DB query
}; // end purchase function
function continueShopping() {
    inquirer.prompt([
        {
            name: "command",
            type: "list",
            message: "Would you like to continue shopping?",
            choices: ["YES", "NO"]
        }
    ]).then(function (ans) {
        let command = ans.command;
        console.log(command);
        if(command === "YES") {
            queryItems();
        } else{
            console.log("\nTHANK YOU FOR SHOPPING WITH BAMAZON\n")
            connection.end();
        }
    }); // end inquirer prompt
};