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
    console.log("connected as id " + connection.threadId + "\n");
    clockIn();
});

function clockIn() {
    console.log("\nHello Bamazon Manager!\n");
    inquirer.prompt([
        {
            name: "task",
            type: "list",
            message: "Please choose a task from the list below.",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function (ans) {
        console.log(ans.task);
    }); // end inquirer prompt
};
function productsForSale() {
    // code
};
function lowInventory() {
    // code
};
function addInventory() {
    // code 
};
function addProduct() {
    // code
};