var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');
var less = require('less');
var _ = require('lodash');

//the path of the main less file. This could be a global variable, maybe within a global config file
var LESS_FILE = path.join(__dirname, '../', 'less', 'style.less');

/**
 * _.readFile: Helper fn, just "promisify" the reafile and also parses json optionally
 * @param  {String}  filename   The path of the file to parse within the filesystem
 * @param  {Boolean} parseJson  if true, it tries to parse the file as a json
 * @return {Promise}            The promise
 */
var _readFile = function(filename, parseJson) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, function(readError, data) {
      if (readError) { reject(readError); }
      var returnedData = data;
      try {
        if (parseJson === true) {
          returnedData = JSON.parse(data.toString());
        }
        resolve(returnedData);
      }
      catch (parseError) {
        reject(parseError);
      }
    });
  });
};

/**
 * _lessParseVariableOptions: Helper fn, copied from grunt-less,
 * just create some variable context for our less
 *
 * @param  {Object} options Key,Value object for the less context
 * @return {String}         The string to prepend to the less
 */
var _lessParseVariableOptions = function(options) {
  var pairs = _.pairs(options);
  var output = '';
  pairs.forEach(function(pair) {
    output += '@' + pair[0] + ':' + pair[1] + ';';
  });
  return output;
};

/**
 * _getFilenameById: Helper fn, return the filename of the player card
 * @param  {String} id The id coming from the request, the id of the player
 * @return {String}    The filename of that player card
 */
var _getFilenameById = function(id) {
  var filename = id.replace('\\', '').replace('/', '');
  filename = '../datastore/' + filename + '.json';
  return path.join(__dirname, '../', 'datastore', filename);
};

/**
 * buildCss: Creates the css for a player card
 * @param  {Object} playerData The player card data object
 * @return {String}            The css to print within the html template
 */
var buildCss = function(playerData) {
  return new Promise(function(resolve, reject) {
    var filename = LESS_FILE;
    _readFile(filename)
    .then(function(lessString) {
      var lessStringToBuild = _lessParseVariableOptions({
        'brand-color': '#' + playerData.clubTeam.colors.mainColor,
        'player-img': '"' + playerData.imageSrc + '"',
        'team-img': '"' + playerData.clubTeam.logoUrls[1].url + '"'
      }) + '\n' + lessString;
      return less.render(lessStringToBuild);
    })
    .then(function(lessOutput) {
      resolve(lessOutput.css);
    })
    .catch(reject);
  });
};

/**
 * retrieveData: read the player card data five the id
 * @param  {String} id The id coming from the request
 * @return {Promise}   Resolved with the player card data object
 */
var retrieveData = function(id) {
  var filename = _getFilenameById(id);
  return _readFile(filename, true);
};

router.param('playerId', function(req, res, next, playerId) {
  //prepare the references for playerData and its css
  var playerData;
  var css;

  //start the promise chain reading the json file
  retrieveData(playerId)
  .then(function(data) {
    playerData = data.data.info; //store the reference
  })
  .then(function() {
    return buildCss(playerData); //execute the build css
  })
  .then(function(cssData) {
    css = cssData; //store the reference
  })
  .then(function() {
    res.playerData = playerData; // attach to the response the elaborated data
    res.css = css;
    next(); //go ahead
  })
  .catch(function(error) { //if something went wrong, gotta catch'em all
    console.error('error player card', error);
    next(new Error('Unable to Create Player Card, try with id 134 or 135'));
  });
});

router.get('/:playerId', function(req, res, next) {
  console.log('requested id: ', res.playerData.id); //just for fun

  //render the player-card with the elaborated data
  res.render('player-card', {
    data: res.playerData,
    css: res.css
  });
});

module.exports = router;
