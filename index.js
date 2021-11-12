// Use Inquirer package
const inquirer = require('./node_modules/inquirer');
// Use Chalk package to color console.log
// Usage: console.log(chalk.blue('Hello world!'));
const chalk = require('./node_modules/chalk');
// Use filesystem package
const fs = require('fs');
// Use modularized functions
const generateMarkdown = require('./utils/generateMarkdown');

// This probably won't change, but let's take it out of the procedural code just in case.
const fsFileName = 'README.md';

// Array of questions for user input via Inquirer
const questions = [
    {
        type: 'input',
        message: 'Enter the title of your project',
        name: 'title'
    },
    {
        type: 'input',
        message: 'Enter the project description',
        name: 'description'
    },
    {
        type: 'list',
        message: question3,
        name: 'comm_pref'
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
        err ? console.error(err) : console.log(chalk.white.bgGreen("README file generated successfully."))
    );
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
    .then((answer) => {
        try {
            const data = generateMarkdown(answer);
        } catch(err) {
            console.error("Error generating markdown: ", err);
        }

    });
}

// Function call to initialize app
init();
