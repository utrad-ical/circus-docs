const yaml = require('js-yaml');
const fs = require('fs');

const fileContent = fs.readFileSync('./sidebars.yaml');
module.exports = yaml.load(fileContent);
