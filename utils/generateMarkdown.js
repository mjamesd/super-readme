// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Author: Mark Drummond
// Date: 13-Nov-2021
// Assignment: README Generator
// See README.md for more information
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Use Chalk package to color console.log
// Usage: console.log(chalk.blue.bgWhite('Hello world!'));
const chalk = require('../node_modules/chalk');

const newLine = `
`;

// Function that returns a license badge based on which license is passed in
// If there is no license, console log a warning and return an empty string
function renderLicenseBadge(license) {
  if (!license || license == `None`) {
    console.error(chalk.black.bgYellowBright(` Warning: No License `));
    return ``;
  }
  return `![License: ${license}](https://img.shields.io/badge/license-${encodeURI(license)}-yellowgreen)`;
}

// Function that returns a license badge based on which license is passed in
// If there is no license, console log a warning and return an empty string
function renderLicenseInfo(license) {
  if (!license || license === `None`) {
    // no error here because it would have already errored in renderLicenseBadge()
    return ``;
  }
  return `This work is licensed under ${license}.`;
}

// Function that returns a demo usage image based on which usage demo image URL is passed in
// If there is no usageImg, console log a warning and return an empty string
function renderUsageImg(usageImg) {
  if (!usageImg) {
    return ``;
  }
  return `See this usage demo:${newLine + newLine}![Usage demo](${encodeURI(usageImg)})`;
}

function getLicenseFileName(license) {
  switch (true) {
    case (license === `Apache License 2.0`):
      return `apache2License`;
    case (license === `GNU General Publice License v3.0`):
      return `gnuGpl3License`;
    case (license === `MIT License`):
      return `mitLicense`;
    case (license === `BSD 2-Clause "Simplified" License`):
      return `bsd2-ClauseLicense`;
    case (license === `BSD 3-Clause "New" or "Revised" License`,
      `Boost Software License 1.0`):
      return `bsd3-ClauseLicense`;
    case (license === `Boost Software License 1.0`):
      return `boostLicense`;
    case (license === `Creative Commons Zero v1.0 Universal`):
      return `CreativeCommonsZeroV1UniversalLicense`;
    case (license === `Eclipse Public License 2.0`):
      return `eclipsePublicLicense2License`;
    case (license === `GNU Affero General Public License v2.0`):
      return `gnuAfferoGpl3License`;
    case (license === `GNU Lesser General Public License v2.1`):
      return `gnuLesserGpl2.1License`;
    case (license === `Mozilla Public License 2.0`):
      return `mozillaLicense`;
    case (license === `The Unlicense`):
      return `unlicenseLicense`;
    default:
      return ``;
  };
}

// A function that returns an array of all the licenses offered by GitHub 
function renderLicenseList() {
  return [
    `None`, `Apache License 2.0`, `GNU General Publice License v3.0`,
    `MIT License`, `BSD 2-Clause "Simplified" License`, `BSD 3-Clause "New" or "Revised" License`,
    `Boost Software License 1.0`, `Creative Commons Zero v1.0 Universal`, `Eclipse Public License 2.0`,
    `GNU Affero General Public License v2.0`, `GNU Lesser General Public License v2.1`,
    `Mozilla Public License 2.0`, `The Unlicense`
  ];
}

// Function to generate markdown for README
function generateMarkdown(data) {
  let titleBlock = `# ${data.title}`;
  titleBlock += newLine;
  titleBlock += `> *${data.subtitle}*`;
  titleBlock += newLine;
  titleBlock += newLine;
  titleBlock += `![status: in development](https://img.shields.io/badge/status-in%20development-orange)`;
  titleBlock += newLine;
  titleBlock += newLine;
  titleBlock += renderLicenseBadge(data.license);

  let tableOfContentsBlock = `## Table of Contents`;
  let tocI = 1;
  let descriptionBlock = ``;
  let installationBlock = ``;
  let usageBlock = ``;
  let testsBlock = ``;
  let creditsBlock = ``;
  let licenseBlock = ``;
  let contributeBlock = ``;
  let questionsBlock = ``;
  if (data.description.length) {
    tableOfContentsBlock += newLine;
    tableOfContentsBlock += `${tocI}. [Description](#description)`;
    tocI++;
    descriptionBlock = `## Description`;
    data.description.forEach(paragraph => {
      descriptionBlock += newLine;
      descriptionBlock += newLine;
      descriptionBlock += paragraph.item;
    });
  }
  if (data.installation.length) {
    tableOfContentsBlock += newLine;
    tableOfContentsBlock += `${tocI}. [Installation](#installation)`;
    tocI++;
    installationBlock = `## Installation`;
    data.installation.forEach(paragraph => {
      installationBlock += newLine;
      installationBlock += newLine;
      installationBlock += paragraph.item;
    });
  }
  if (data.usage.length) {
    tableOfContentsBlock += newLine;
    tableOfContentsBlock += `${tocI}. [Usage](#usage)`;
    tocI++;
    usageBlock = `## Usage`;
    data.usage.forEach(paragraph => {
      usageBlock += newLine;
      usageBlock += newLine;
      usageBlock += paragraph.item;
      usageBlock += newLine;
      usageBlock += newLine;
      usageBlock += renderUsageImg(paragraph.imageUrl);
    });
  }
  if (data.tests.length) {
    tableOfContentsBlock += newLine;
    tableOfContentsBlock += `${tocI}. [Tests](#tests)`;
    tocI++;
    testsBlock = `## Tests`;
    data.tests.forEach(paragraph => {
      testsBlock += newLine;
      testsBlock += newLine;
      testsBlock += paragraph.item;
    });
  }
  if (data.credits.length) {
    tableOfContentsBlock += newLine;
    tableOfContentsBlock += `${tocI}. [Credits](#credits)`;
    tocI++;
    creditsBlock = `## Credits`;
    data.credits.forEach(block => {
      creditsBlock += newLine;
      creditsBlock += newLine;
      creditsBlock += `Visit [${block.collaboratorName} on GitHub](https://github.com/${block.collaboratorGithub})`;
    });
  }
  if (data.license.length) {
    tableOfContentsBlock += newLine;
    tableOfContentsBlock += `${tocI}. [License](#license)`;
    tocI++;
    licenseBlock = `## License`;
    if (data.license) {
      licenseBlock += newLine;
      licenseBlock += newLine;
      licenseBlock += renderLicenseInfo(data.license);
    } else {
      console.warn(chalk.black.bgYellowBright(`**_Warning: No license chosen._**`));
      licenseBlock += newLine;
      licenseBlock += newLine;
      licenseBlock += `I chose not to license this project.`;
    }
  }
  if (data.contribute.length) {
    tableOfContentsBlock += newLine;
    tableOfContentsBlock += `${tocI}. [Contributing](#contributing)`;
    tocI++;
    contributeBlock = `## Contributing`;
    data.contribute.forEach(paragraph => {
      contributeBlock += newLine;
      contributeBlock += newLine;
      contributeBlock += paragraph.item;
    });
  }
  if (data.questions.length) {
    tableOfContentsBlock += newLine;
    tableOfContentsBlock += `${tocI}. [Questions](#questions)`;
    tocI++;
    questionsBlock = `## Questions`;
    data.questions.forEach(block => {
      questionsBlock += newLine;
      questionsBlock += newLine;
      questionsBlock += `Visit [my GitHub profile](https://github.com/${block.github})`;
      questionsBlock += newLine;
      questionsBlock += newLine;
      questionsBlock += `To reach me with additional questions, send me an [email](mailto:${block.email}).`
    });
  }
  // Stitch the blocks together if non-blank
  let output = titleBlock;
  output += newLine;
  if (descriptionBlock !== ``) {
    output += descriptionBlock;
    output += newLine;
  }
  if (tableOfContentsBlock !== `## Table of Contents`) {
    output += tableOfContentsBlock;
    output += newLine;
  }
  if (installationBlock !== ``) {
    output += installationBlock;
    output += newLine;
  }
  if (usageBlock !== ``) {
    output += usageBlock;
    output += newLine;
  }
  if (testsBlock !== ``) {
    output += testsBlock;
    output += newLine;
  }
  if (creditsBlock !== ``) {
    output += creditsBlock;
    output += newLine;
  }
  if (licenseBlock !== ``) {
    output += licenseBlock;
    output += newLine;
  }
  if (contributeBlock !== ``) {
    output += contributeBlock;
    output += newLine;
  }
  if (questionsBlock !== ``) {
    output += questionsBlock;
  }
  return output;
}

module.exports = {
  generateMarkdown,
  renderLicenseList,
  getLicenseFileName
}
