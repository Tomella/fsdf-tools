var config = require('./config.json');
// var config = JSON.parse(require('fs').readFileSync(__dirname + '/config.json', 'utf8')).catchments;

var request = require('request');
var fs = require('fs');

request.get(config.catchments.allDataUrl, function (err, response, data) {
  if (err) {
    return console.log(err);
  }

  var outCatchments = buildCatchments(JSON.parse(data));
  fs.writeFile(config.core.outputDirectory + config.catchments.filename, JSON.stringify(outCatchments, null, 3) , 'utf-8');
});

function buildCatchments(data) {
   var response = {},
      features = data.features;

   response.catchments = features.map(function(feature) {
      var catchment = {
         name : feature.attributes.Level2Name,
         bbox : {
            xMin : 180,
            xMax : -180,
            yMin : 90,
            yMax : -90,
            complete : true
         },
         id : feature.attributes.OBJECTID
      },
      bbox = catchment.bbox;

      feature.geometry.rings.forEach(function(ring) {
         ring.forEach(function(coords) {
            var x = coords[0],
               y = coords[1];

            bbox.xMin = Math.min(bbox.xMin, x);
            bbox.xMax = Math.max(bbox.xMax, x);
            bbox.yMin = Math.min(bbox.yMin, y);
            bbox.yMax = Math.max(bbox.yMax, y);
         });
      });
      return catchment;
   }).sort(function(a, b) {
      return a.name < b.name ? -1: 1;
   });
   return response;
}