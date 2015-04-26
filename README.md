# env-filter

Filter the environment to exclude certain environment variables from being passed on to your processes.

This will help you if you are spawning a process eg Java and trying to parse stderr, perhaps as valid JSON. With some environment variables, Java will output a message like:

    Picked up JAVA_TOOL_OPTIONS:
    {"your":"json"}

Note that there is currently no way to hide this Java message on stderr.

## How do I use it?

```js
var clean = require('env-filter').filter(['JAVA_TOOL_OPTIONS', '_JAVA_OPTIONS']);

process.spawn('java -jar some.jar ' + clean.argsString, {
    env: clean.env
});
```

## API

### .filter(envVars, oldEnv)
Clean the specified environment variables. If the environment variables aren't present they are ignored.

__envVars__ `String[]` The array of the environment variable names that you want to filter out.
__env__     `Object=`  Environment to filter. Defaults to `process.env`.

```js
var clean = envFilter.filter(['JAVA_TOOL_OPTIONS']);

clean.env;       // The clean environment: process.env without envVars
clean.extraEnv;  // Object containing filtered variables.
clean.args;      // String of filtered variables' values concatenated. Suitable to pass to the application as arguments eg 'JAVA_TOOL_OPTIONS=-Dname=john -Dage=30', _JAVA_OPTIONS=-Dhello=world => "-Dname=john -Dage=30 -Dhello=world"
```

## Example

Environment:
```
    JAVA_TOOL_OPTIONS: "-Dname=john -Dage=30",
    _JAVA_OPTIONS: "abc"
```

```js
var clean = envFilter.filter(['JAVA_TOOL_OPTIONS']);

{
  env: {
    PATH: ...
    ...
  },
  extraEnv: {
    JAVA_TOOL_OPTIONS: "-Dname=john -Dage=30",
    \_JAVA_OPTIONS: "abc"
  },
  args: "-Dname=john -Dage=30 abc"
}
```