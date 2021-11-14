// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Author: Mark Drummond
// Date: 13-Nov-2021
// Assignment: README Generator
// See README.md for more information
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Use Inquirer package
const inquirer = require('./node_modules/inquirer');
// Add 'loop' type to Inquirer
inquirer.registerPrompt('recursive', require('inquirer-recursive'));
// Use Chalk package to color console.log
// Usage: console.log(chalk.blue('Hello world!'));
const chalk = require('./node_modules/chalk');
// Use filesystem package
const fs = require('fs');
// Use modularized functions
const generateMarkdown = require('./utils/generateMarkdown');

// Change these for development
const fsFileName = 'READMEtemplate.md';
const fsFolder = "."; // do not include trailing slash

// Loop variables
let descriptionLoop = 0;
let installationLoop = 0;
let usageLoop = 0;
let contributeLoop = 0;

// Array of questions for user input via Inquirer
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter the title of your project:'
    },
    {
        type: 'input',
        name: 'subtitle',
        message: 'Enter your project\'s subtitle (will be displayed directly below your title):'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license:',
        choices: generateMarkdown.renderLicenseList(),
        loop: false
    },
    {
        type: 'recursive',
        name: 'description',
        message: 'Add to the Description section?',
        prompts: [
            {
                type: 'input',
                name: 'item',
                message: 'Add a paragraph to the description:'
            }
        ]
    },
    {
        type: 'recursive',
        name: 'installation',
        message: 'Add to the Installation section?',
        prompts: [
            {
                type: 'input',
                name: 'item',
                message: 'Add a list item to the installation instructions:'
            }
        ]
    },
    {
        type: 'recursive',
        name: 'usage',
        message: 'Add to the "Usage" section?',
        prompts: [
            {
                type: 'input',
                name: 'item',
                message: 'Add a list item to the usage instructions:'
            },
            {
                type: 'input',
                name: 'imageUrl',
                message: 'Enter the URL or relative filepath of an image for this instruction (or leave blank if none):'
            }
        ]
    },
    {
        type: 'recursive',
        name: 'contribute',
        message: 'Add to the "Contributing" section?',
        prompts: [
            {
                type: 'input',
                name: 'item',
                message: 'Add a paragraph to this section:'
            }
        ]
    },
    {
        type: 'recursive',
        name: 'tests',
        message: 'Add to the "Tests" section?',
        prompts: [
            {
                type: 'input',
                name: 'item',
                message: 'Provide an example of how to run tests:'
            }
        ]
    },
    {
        type: 'recursive',
        name: 'credits',
        message: 'List your collaborators, if any, and then provide links to their GitHub profiles:',
        prompts: [
            {
                type: 'input',
                name: 'collaboratorName',
                message: 'Provide this contributor\'s name:'
            },
            {
                type: 'input',
                name: 'collaboratorGithub',
                message: 'Provide this contributor\'s GitHub username:'
            }
        ]
    },
    {
        type: 'recursive',
        name: 'questions',
        message: 'Add to the "Questions" section?',
        prompts: [
            {
                type: 'input',
                name: 'github',
                message: 'Enter your GitHub username:'
            },
            {
                type: 'input',
                name: 'email',
                message: 'Enter your email address:'
            }
        ]
    },
];

// Initialization fuction
// User can pass filename to use
function init(userFileName = null) {
    console.info(chalk.yellow.bgBlueBright(` Welcome to Super Readme! `));
    console.info(chalk.yellow.bgBlue(`Answer the questions to generate a professional README.md file for your project!`));
    // Check if user supplied a filename
    let thisFilePath = fsFolder + '/' + fsFileName; // set to default
    if (userFileName !== null && userFileName !== `README.md`) {
        userFileExtension = userFileName.split('.').pop();
        if (userFileExtension === "md") {
            thisFilePath = fsFolder + '/' + userFileName; // set dynamically
        } else {
            console.error(chalk.black.bgRed(`File extension must be ".md".`));
        }
    } else {
        console.info(chalk.yellow.bgBlue(`You can pass a .md filename to the script when you run it to specify the filename. Don't use "README.md", though.`));
    }
    console.warn(chalk.black.bgYellowBright(`Saving file as "${thisFilePath}" `));
    inquirer.prompt(questions)
        .then((answers) => {
            const data = generateMarkdown.generateMarkdown(answers);
            // <-- use thisFilePath here <--
            fs.writeFile(thisFilePath, data, (err) =>
                err ? console.error(chalk.black.bgRed(err)) : console.log(chalk.white.bgGreen("README file generated successfully."))
            );
            const licenseFile = generateMarkdown.getLicenseFileName(answers.license);
            fs.copyFileSync(`./assets/data/${licenseFile}`, `./LICENSE`);
            console.log(chalk.white.bgGreen("LICENSE file copied & renamed successfully."))
            // fs.rename(`./assets/data/${licenseFile}`, `./LICENSE`, (err) => {
            //     err ? console.error(chalk.black.bgRed(err)) : console.log(chalk.white.bgGreen("LICENSE file copied & renamed successfully."))
            // });
        });
}

// Function call to initialize app
init(process.argv[2]);
