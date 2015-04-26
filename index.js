/**
 * Filter variables from the environment.
 *
 * @param  {String[]} envVars          Array of environment variables to filter out
 * @param  {Object=}  env              Environment object. Defaults to `process.env`
 * @return {Object}   result           Environment
 * @return {Object}   result.env       Clean environment
 * @return {String}   result.arguments Arguments string
 */
function filter(envVars, env) {
  // New, clean environment
  var cleanEnv = {};
  // Filtered environment variables
  var extraEnvArr = [];
  var extraEnv = {};

  env = env || process.env;

  // Copy environment but filter variables
  Object.keys(env)
    .forEach(function(property) {
      if (envVars.indexOf(property) > -1) {
        // Copy into result object
        extraEnv[property] = env[property];

        // If empty, don't add to arguments string
        if (env[property].length > 0) {
          extraEnvArr.push(env[property]);
        }
      } else {
        cleanEnv[property] = env[property];
      }
    });

  return {
    env: cleanEnv,
    extraEnv: extraEnv,
    args: extraEnvArr.join(' ')
  };
}

exports.filter = filter;
