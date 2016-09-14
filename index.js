var fs = require('fs');

// Make the output directory if it doesn't exist
try {
  fs.mkdirSync("output");
} catch(e) {
  if ( e.code !== 'EEXIST' ) throw e;
}

require('./tools/basins.js');
require('./tools/catchments.js');