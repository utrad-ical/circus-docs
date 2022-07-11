const yaml = require('js-yaml');
const fs = require('fs');

// We are loading the sidebar from the following yaml file
const fileContent = fs.readFileSync('./sidebars.yaml');
module.exports = yaml.load(fileContent);
