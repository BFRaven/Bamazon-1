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
let count = 0;
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Hello Bamazon Manager, what is your name?"
        }
    ]).then(function (ans) {
        let name = ans.name;
        assignTask(name);
    }); // end inquirer prompt
});

function assignTask(name) {
    if(count<1) {
        console.log("\nHello, " + name);
    } else {
        console.log("\n" + name + ",");
    };
    inquirer.prompt([
        {
            name: "task",
            type: "list",
            message: "Please choose a task from the list below.",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function (ans) {
        count++;
        let task = ans.task;
        switch(task) {
            case "View Products for Sale":
                productsForSale(name);
            break;
            case "View Low Inventory":
                lowInventory(name);
            break;
            case "Add to Inventory":
                addInventory(name);
            break;
            case "Add New Product":
                addProduct(name);
            break;
        }; // end task switch
    }); // end inquirer prompt
};
function productsForSale(name) {
    var query = connection.query(
        "SELECT * FROM products", function (err, res) {
            console.log("\nPRODUCTS FOR SALE:\n-------------------");
            console.table(res);
            assignTask(name);
    });
};
function lowInventory(name) {
    var query = connection.query(
        "SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
            console.log("\n" + name + ", the following products may need stocking soon!\n-------------------");
            console.table(res);
            assignTask(name);
    });
};
function addInventory() {
    // code 
};
function addProduct() {
    // code
};
function endOfDay() {
    inquirer.prompt([
        {
            name: "command",
            type: "list",
            message: "Do you have more tasks to complete?",
            choices: ["YES", "NO"]
        }
    ]).then(function (ans) {
        let command = ans.command;
        switch(command) {
            case "YES":
                assignTask();
            break;
            case "NO":
                goodbye();
        }

    });
}