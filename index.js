/**
 * Filter variables from the environment.
 *
 * @param  {String[]} keys             Array of environment variables to filter out
 * @param  {Object=}  oldEnv           Environment object. Defaults to `process.env`
 * @return {Object}   result           Environment
 * @return {Object}   result.env       Clean environment
 * @return {String}   result.arguments Arguments string
 */
function filter(keys, oldEnv) {
  // New process environment
  var cleanEnv = {};
  // Filtered options
  var filteredOpts = [];
  var filteredEnv = {};

  oldEnv = oldEnv || process.env;

  // Copy environment but filter variables
  Object.keys(oldEnv)
    .forEach(function (property) {
      if (keys.indexOf(property) > -1) {
        // Copy into result object
        filteredEnv[property] = oldEnv[property];

        // If empty, don't add to arguments string
        if (oldEnv[property].length > 0) {
          filteredOpts.push(oldEnv[property]);
        }
      } else {
        cleanEnv[property] = oldEnv[property];
      }
    });

  filteredEnv.env = cleanEnv;
  filteredEnv.arguments = filteredOpts.join(' ');

  return filteredEnv;
}

exports.filter = filter;
