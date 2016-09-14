var fs = require('fs');

// Make the output directory if it doesn't exist
fs.existsSync("output") || fs.mkdirSync("output");

// Build the basins JSON
require('./tools/basins.js');

// Build the catchments JSON
require('./tools/catchments.js');