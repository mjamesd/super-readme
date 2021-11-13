// Use Inquirer package
const inquirer = require('./node_modules/inquirer');
// Use Chalk package to color console.log
// Usage: console.log(chalk.blue('Hello world!'));
const chalk = require('./node_modules/chalk');
// Use filesystem package
const fs = require('fs');
// Use modularized functions
const generateMarkdown = require('./utils/generateMarkdown');
const { type } = require('os');

// Change these for development
const fsFileName = 'output.md';
const fsFolder = "."; // do not include trailing slash

// Array of questions for user input via Inquirer
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter the title of your project:'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter the description of your project:'
    },
    {
        type: 'input',
        name: 'features',
        message: 'Enter your project\'s features:'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Enter installation instructions for your project:'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter usage instructions of your project:'
    },
    {
        type: 'input',
        name: 'usageImg',
        message: 'Enter the URL or relative filepath of an image for how to use your project:'
    },
    {
        type: 'input',
        name: 'credits',
        message: 'List your collaborators, if any, with links to their GitHub profiles:'
    },
    {
        type: 'input',
        name: 'license',
        message: 'Choose a license for your project:'
    },
    {
        type: 'input',
        name: 'contribute',
        message: 'How people can contribute to your project:'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Provide examples of how to run tests for your project:'
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
        err ? console.error(err) : console.log(chalk.white.bgGreen("README file generated successfully."))
    );
}

// Initialization fuction
// User can pass filename to use
function init(userFileName) {
    // Check if user supplied a filename
    let thisFilePath = fsFolder + path.sep + fsFileName;
    if (userFileName !== null && typeof userFileName === "string") {
        userFileExtension = userFileName.split('.').pop();
        if (userFileExtension === "md") {
            thisFilePath = fsFolder + path.sep + userFileName + userFileExtension;
        } else {
            return new Error(`File extension must be ".md".`);
        }
    }
    inquirer.prompt(questions)
    .then((answer) => {
        try {
            const data = generateMarkdown(answer);
        } catch(err) {
            console.error(chalk.black.bgRed("Error generating markdown: ", err));
        }
        try {
            writeToFile(thisFilePath, data); // <-- use thisFilePath here <--
        } catch (err) {
            console.error(chalk.black.bgRed("Error writing file: ", err));
        }
    });
}

// Function call to initialize app
init(process.argv[1]);
