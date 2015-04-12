# env-filter

Filter the environment to exclude certain environment variables from being passed on to your processes.

Will help you if you are spawning a process eg Java and trying to parse stderr. Java will output a message like:

    Picked up JAVA_TOOL_OPTIONS:
    {"your":"json"}

Note that there is currently no way to hide this message on stderr.

## How do I use it?

```js
var clean = require('env-filter')
  .filter(['JAVA_TOOL_OPTIONS', '_JAVA_OPTIONS']);

process.spawn('java -jar some.jar ' + clean.arguments, {
  env: clean.env
})
```

## API

### .filter(string[])
Clean the specified environment variables. If the environment variables aren't present they are ignored.

```js
var clean = envFilter.filter(['JAVA_TOOL_OPTIONS']);

clean.env; // The clean environment
clean.arguments; // String of filtered variables concatenated. Suitable to pass to the application as arguments.
clean.JAVA_TOOL_OPTIONS; // Filtered environment variables
```
