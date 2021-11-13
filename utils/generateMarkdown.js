// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
// data = {
//   title,
//   description,
//   features,
//   installation,
//   usage,
//   usageImg,
//   credits,
//   license,
//   contribute,
//   tests
// }
function generateMarkdown(data) {
  return `# ${data.title}
  ![status: in development](https://img.shields.io/badge/status-in%20development-orange)

  ${data.description}


## Table of Contents
1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Tests](#tests)
5. [Credits](#credits)
6. [License](#license)
7. [How to Contribute](#how_to_contribute)

## [Features]()
${data.features}

## [Installation]()
${data.installation}

## [Usage]()
${data.usage}

![Usage demo](${data.usageImg})

## [Tests]()
${data.tests}

## [Credits]()
${data.credits}

## [License]()
${data.license}

## [How to Contribute]()
${data.contribute}`;
}

module.exports = generateMarkdown;
