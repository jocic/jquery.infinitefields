# jQuery Infinity

jQuery Infinity is a library that allows users to add and process infinite number of input fields.

# Versioning Scheme

I use a 3-digit version identifier, for example 1.0.1. These digits have the following meaning:

* The first digit (1) specifies the major version number.
* The second digit (0) specifies the minor version number.
* The third digit (1) specifies the patch version number.

# Examples

Before using the library you have to upload the files from the "src" folder to your server and add the library to your project.

```html
<link href="src/css/infinity.css" rel="stylesheet" type="text/css" />
<script src="src/js/infinity.js" type="text/javascript"></script>
```

Be sure to check out the demo if you are confused.

# Settings

Default library settings is as follows.

```json
{
    fields : [
        { title : "Input", type : "input", size : "12" }
    ],
    values : [
    ],
    inputs : { id : "infinity", align : "left" },
    options : { title : "Options", size : "3", align : "left" }
}
```
