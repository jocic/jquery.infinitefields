# jQuery Infinity

jQuery Infinity is a library that allows users to add and process infinite number of input fields.

![Basic Example](demo/img/example.gif)

Library can be easily used with other libraries, like for example jsGrid.

![jsGrid Example](demo/img/jsgrid-example.png)

Field values can be easily parsed to:

* Plaintext
* JSON
* XML

It is also possible to write and use custom parsing functions.

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

## Example 1 - Basic

```js
$("#my-container").infinity();
```

## Example 2 - Multiple Fields

```js
$("#my-container").infinity({
    fields : [
        { title : "Name", type : "input", size : "9" },
        { title : "Price", type : "input", size : "3" }
    ]
});
```

## Example 3 - Different Field Types

```js
$("#my-container").infinity({
    fields : [
        { title : "Product", type : "input", size : "3" },
        { title : "Description", type : "textarea", size : "7" },
        { title : "Shipping", type : "select", size : "2", options : [
            { text : "Included", value : "Yes"  },
            { text : "Excluded", value : "No" }
        ] }
    ]
});
```

## Example 4 - Preset Values (Basic)

```js
$("#my-container").infinity({
    fields : [
        { title : "Product Name", type : "input", size : "12" }
    ],
    values : [
        "Galaxy S5 G900F BL",
        "Desire 620G DS GR",
        "LED LCD 43AF1000",
        "LED LCD 24AR2000",
        "YotaPhone 2 YD201 BLACK"
    ]
});
```

## Example 5 - Preset Values (Advanced)

```js
$("#my-container").infinity({
    fields : [
        { title : "First Name", type : "input", size : "4" },
        { title : "Middle Name", type : "input", size : "4" },
        { title : "Last Name", type : "input", size : "4" }
    ],
    values : [
        [ "Suzanne", "Jay", "Morgan" ],
        [ "Faith", "Julio", "Freeman" ],
        [ "Merle", "Doreen", "Brock" ]
    ]
});
```

## Example 6 - Custom Settings

```js
$("#my-container").infinity({
    fields : [
        { title : "Fruit", type : "input", size : "12" }
    ],
    values : [
        "Banana",
        "Pineapple",
        "Lemon",
        "Orange"
    ],
    inputs : { id : "fruit", align : "center" },
    options : { title : "Fruit Options", size : "3", align : "center" }
});

```
## Example 7 - Parsing (Basic)

Allowed values are txt, json and xml.

```js
var parsingResult = $("#my-container").infinityParse("txt");
```

## Example 8 - Parsing (Advanced)

You can get code snippet from the *infinity.js* file.

```js
var customParser = function(someParam) {
    return someParam + " COOL!";
};

var parsingResult = $("#my-container").infinityParse(null, customParser);
```

# Settings

Default library settings are as follow.

```js
var settings = {
    fields : [
        { title : "Input", type : "input", size : "12" }
    ],
    values : [
    ],
    inputs : { id : "infinity", align : "left" },
    options : { title : "Options", size : "3", align : "left" }
};
```

Allowed values are as follow:

* fields - Array containing objects, ex. *{ title : "Input", type "input", size : "12", options : null }*
    * object.title - Any string
    * object.type - String with value *input*, *textarea* or *select*
    * object.size - String or a number from 1 to 12 since Infinity uses a 12 grid layout
    * object.options - Array containing parameters for a select field, ex. *[ { text : "Yes", value : "1"  }, { text : "No", value : "0" } ]*
* values - Array or a 2D array containing your desired values, ex. *[ 1, 2, 3, 4 ]*
* inputs - Object containing field parameters
    * object.id - Name of the fields, ex. *products*
    * object.align - String with value *left*, *center* or *right*
* options - Object containing options parameters
    * object.title - Any string
    * object.size - String or a number from 1 to 12 since Infinity uses a 12 grid layout
    * object.align - String with value *left*, *center* or *right*
