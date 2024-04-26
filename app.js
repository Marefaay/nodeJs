const express = require("express");
const { Command } = require("commander");
const inquirer = require("inquirer");
// const dbconnection = require("./database/dbConnection");
const app = express();
require("dotenv").config();
app.use(express.json());
///connected to db
const dbConnection = require("./database/dbConnection");
const projectModel = require("./models/project");
dbConnection;
//questions
const addQuestions = [
  {
    type: "input",
    name: "title",
    message: "please Enter Project Title",
  },
  {
    type: "number",
    name: "price",
    message: "please Enter Project price",
  },
  {
    type: "input",
    name: "clientName",
    message: "please Enter client name",
  },
];
const delteQuestions = [
  {
    type: "input",
    name: "title",
    message: "please Enter Project Title",
  },
];
//Commands
const program = new Command();

program
  .name("Sertay Plus Projects Manager")
  .description("CLI to Manage Projects For SertayPlus Company")
  .version("1.0.0");
//Add Project
program
  .command("addProject")
  .alias("add")
  .description("Add Project To SeratyPlus Manger")

  .action(() => {
    inquirer
      .prompt(addQuestions)
      .then(async (answers) => {
        await projectModel.insertMany({
          title: answers.title,
          price: answers.price,
          clientName: answers.clientName,
        });
        console.log("Project Add Succefully");
      })
      .catch((error) => {
        if (error.isTtyError) {
          console.log("Can't Add This Project");
        } else {
          console.log("Something Went Wrong");
        }
      });
  });
//delte Project
program
  .command("deleteProject")
  .alias("delte")
  .description("delte Project from SeratyPlus Manger")

  .action(() => {
    inquirer
      .prompt(delteQuestions)
      .then(async (answers) => {
        const project = await projectModel.findOne({ title: answers.title });
        await projectModel.deleteOne({
          title: project.title,
        });
        console.log("Project Delted Succefully");
      })
      .catch((error) => {
        if (error.isTtyError) {
          console.log("Can't Add This Project");
        } else {
          console.log("Something Went Wrong");
        }
      });
  });
//show  Project
program
  .command("showProject")
  .alias("show")
  .description("show Project from SeratyPlus Manger")

  .action(() => {
    inquirer
      .prompt(delteQuestions)
      .then(async (answers) => {
        const project = await projectModel.findOne({ title: answers.title });
        console.log("Success");
      })
      .catch((error) => {
        if (error.isTtyError) {
          console.log("Can't Add This Project");
        } else {
          console.log("Something Went Wrong");
        }
      });
  });

program.parse();
// app.get("/", (req, res) => res.send("Hello World!"));
// app.listen(process.env.PORT, () =>
//   console.log(`Example app listening on port ${process.env.PORT}!`)
// );
