'use strict';
var inquirer = require('inquirer');
const fs = require('fs');

const year = new Date().getFullYear();

/* var contributorsList = []; */

/* const requireLetter = value => {
  if (/\w/.test(value)) {
    return true;
  }
  return 'Username needs to have at least a letter';
};
 */


console.log('Hi, welcome to Node README Generator');

var questions = [
  {
    type: 'input',
    name: 'userName',
    message: "What is your Github username?",
/*     filter: function(val) {
      let userName = val;
    } */
 /*    validate: requireLetter */
 
  },
  {
    type: 'input',
    name: 'projectTitle',
    message: "What is the Project's title?",
  },
  {
    type: 'input',
    name: 'description',
    message: "Describe your project.",
  },
  {
    type: 'input',
    name: 'installation',
    message: "What are the steps required to install your project?",
  },
  {
    type: 'input',
    name: 'usage',
    message: "Provide instructions and examples for use.",
  },
  {
    type: 'list',
    name: 'license',
    message: "Select a license to use.",
    choices: ['MIT', 'GPL', 'CC'],
    filter: function(val) {
      return val.toLowerCase();
    }
  },
  {
  type: 'list',
  name: 'badge',
  message: "Select a badge to display.",
  choices: ['License', 'Github Repo Size', 'GitHub Followers'],
  filter: function(val) {
    return val.toLowerCase();
    }
  },
  {
    type: 'input',
    name: 'contributors',
    message: "Who contributed to this project? (just hit enter for no one else)",
  },
/*   {
    type: 'confirm',
    name: 'askAgain',
    message: 'Do you want to add another contributor? (just hit enter for YES)',
    default: true
  }, */
  {
    type: 'input',
    name: 'tests',
    message: 'Please provide any tests for your project.',
    default: 'None.'
  },
  {
    type: 'input',
    name: 'questions',
    message: 'Are there any questions for your project you would like to list?',
    default: "None."
  }
];

function ask() {
  inquirer.prompt(questions).then(answers => {
   /*  contributorsList.push(answers.contributors);
    if (answers.askAgain) {
      ask().questions.contributors;
    } */

    let data = JSON.stringify(answers, null, '  ');
    let logger = fs.createWriteStream('README.MD', {
      flags: 'a'
    })

    logger.write('# ' + answers.projectTitle);
    logger.write('\n## Description \n' + answers.description);
    logger.write('\n## Table of Contents \n' + 
    "* [Installation](#installation)\n" + 
    "* [Usage](#usage)\n" +
    "* [Credits](#credits)\n" +
    "* [License](#license)");
    logger.write('\n## Installation \n' + answers.installation);
    logger.write('\n## Usage \n' + answers.usage);
    logger.write('\n## Credits \n' + answers.contributors);

    let licenseChoice = (answers.license + '.txt');
    let licenseTemplate = fs.readFileSync(licenseChoice);
    let license = licenseTemplate.toString();
    logger.write('\n## License \n' + license);

    let badge = "";
    switch (answers.badge) {
      case "license":
        badge = ("https://img.shields.io/github/license/" + answers.userName + "/" + answers.projectTitle);
        break;
      case "github repo size":
        badge = ("https://img.shields.io/github/repo-size/" + answers.userName + "/" + answers.projectTitle);
        break;
      case "github followers":
        badge = ("https://img.shields.io/github/followers/" + answers.userName + "/" + answers.projectTitle);
    };
    logger.write('\n## Badges \n' + badge);
    logger.write('\n## Tests \n' + answers.tests);
    logger.write('\n## Questions \n' + answers.questions);

    logger.end();
  });
}

ask();
