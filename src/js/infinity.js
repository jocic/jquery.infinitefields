/**************************************************\
|* Script Author: Djordje Jocic                   *|
|* Script Year: 2016                              *|
|* Script Version: 1.0.1                          *|
|* Script License: MIT License (MIT)              *|
|* ============================================== *|
|* Official Website: http://www.djordjejocic.com/ *|
|* ============================================== *|
|* Permission is hereby granted, free of charge,  *|
|* to any person obtaining a copy of this         *|
|* software and associated documentation files    *|
|* (the "Software"), to deal in the Software      *|
|* without restriction, including without         *|
|* limitation the rights to use, copy, modify,    *|
|* merge, publish, distribute, sublicense, and/or *|
|* sell copies of the Software, and to permit     *|
|* persons to whom the Software is furnished to   *|
|* do so, subject to the following conditions:    *|
|* ---------------------------------------------- *|
|* The above copyright notice and this permission *|
|* notice shall be included in all copies or      *|
|* substantial portions of the Software.          *|
|* ---------------------------------------------- *|
|* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT      *|
|* WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,      *|
|* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF *|
|* MERCHANTABILITY, FITNESS FOR A PARTICULAR      *|
|* PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL *|
|* THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR *|
|* ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER *|
|* IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,   *|
|* RISING FROM, OUT OF OR IN CONNECTION WITH THE  *|
|* SOFTWARE OR THE USE OR OTHER DEALINGS IN THE   *|
|* SOFTWARE.                                      *|
\**************************************************/

// Infinity Logic.

function InfinityRenderer() {
    
    this.addHeader = function(element, settings) {
        
        // Create Fields.
        
        var fields = "";
        
        $.each(settings.fields, function(index, value) {
            
            fields += "<div class='infinity-col-" + value.size + "'>" + value.title + "</div>";
            
        });
        
        fields += "<div class='infinity-clear'></div>";
        
        // Create Header.
        
        var header = "<div class='infinity-header'>" +
                            "<div class='input-column infinity-col-" + settings.inputs.size + " infinity-" + settings.inputs.align + "'>" + fields + "</div>" +
                            "<div class='options-column infinity-col-" + settings.options.size + " infinity-" + settings.options.align + "'>" + settings.options.title +"</div>" +
                            "<div class='infinity-clear'></div>" +
                        "</div>";
        
        element.append(header);
        
    };
    
    this.addRow = function(position, element, settings) {
        
        var that = this;
        
        // Create Fields.
        
        var fields = "";
        
        $.each(settings.fields, function(index, value) {
            
            fields += "<div class='infinity-col-" + value.size + "'><div class='infinity-input-wrapper'>" + that.createInput(value) + "</div></div>";
            
        });
        
        fields += "<div class='infinity-clear'></div>";
        
        // Create Options.
        
        var options = "<a class='infinity-btn infinity-btn-add' title='Add' href='#'></a>" +
                      "<a class='infinity-btn infinity-btn-remove' title='Remove' href='#'></a>" +
                      "<div cass='infinity-clear'></div>";
        
        // Create Row.
        
        var row = "<div class='infinity-row'>" +
                      "<div class='input-column infinity-col-" + settings.inputs.size + " infinity-" + settings.inputs.align + "'>" + fields + "</div>" +
                      "<div class='options-column infinity-col-" + settings.options.size + " infinity-" + settings.options.align + "'>" + options +"</div>" +
                      "<div class='infinity-clear'></div>" +
                  "</div>";
        
        element.children().eq(position).after(row);
        
    };
    
    this.createInput = function(inputParameters) {
        
        if (inputParameters.type === "textarea") {
            
            return "<textarea class='infinity-object infinity-textarea'></textarea>";
            
        }
        else if (inputParameters.type === "select") {
            
            var options = "";
            
            $.each(inputParameters.options, function(index, param) {
                
                options += "<option value='" + param.value + "'>" + param.text + "</option>";
                
            });
            
            return "<select class='infinity-object'>" + options + "</select>";
            
        }
        
        return "<input class='infinity-object infinity-input' type='text' />";
    };
    
    this.handleValues = function(element, settings) {
        
        var that = this;
        
        $.each(settings.values, function(rIndex, rValue) {
            
            // Process Values.
            
            if (!(rValue instanceof Array)) {
                
                rValue = [
                    rValue
                ];
                
            }
            
            // Add New Row - If Needed.
            
            if (rIndex > 0) {
                
                that.addRow(rIndex, element, settings);
                
            }
            
            // Set Values.
            
            $.each(rValue, function(cIndex, cValue) {
                
                element.children(".infinity-row").eq(rIndex).find(".infinity-object").eq(cIndex).val(cValue);
                
            });
            
        });
        
    };
    
    this.handleObjects = function(element, settings) {
        
        element.find(".infinity-row").each(function(rIndex, rValue) {
            
            $(this).find(".infinity-object").each(function(cIndex, cValue) {
                
                var objectName = settings.inputs.id + "[" + rIndex + "][" + cIndex + "]";
                
                $(this).attr("name", objectName);
                
            });
            
        });
        
    };
    
}

function InfinityParser() {
    
    this.toTXT = function(element) {
        
        var result = "";
        var line   = "";
        
        element.find(".infinity-row").each(function(rIndex, rValue) {
            
            line = "";
            
            $(this).find(".infinity-object").each(function(cIndex, cValue) {
                
                line += $(this).val() + " ";
                
            });
            
            result += line.trim() + "\n";
            
        });
        
        return result;
        
    };
    
    this.toJSON = function(element) {
        
        var result = [ ];
        var row    = [ ];
        
        element.find(".infinity-row").each(function(rIndex, rValue) {
            
            row = [ ];
            
            $(this).find(".infinity-object").each(function(cIndex, cValue) {
                
                row.push($(this).val());
                
            });
            
            if (row.length === 1) {
                
                row = row[0];
                
            }
            
            result.push(row);
            
        });
        
        return JSON.stringify(result);
        
    };
    
    this.toXML = function(element) {
        
        var result = "<xml>";
        var row    = [ ];
        var temp   = null;
        
        element.find(".infinity-row").each(function(rIndex, rValue) {
            
            temp = $(this).find(".infinity-object");
            
            row = "<row-" + (rIndex + 1) + ">";
            
            $.each(temp, function(cIndex, cValue) {
                
                if (temp.length === 1) {
                    
                    row += $(this).val();
                    
                }
                else {
                    
                    row += "<col-" + (cIndex + 1) + ">" + $(this).val() + "</col-" + (cIndex + 1) + ">";
                    
                }
                
            });
            
            row += "</row-" + (rIndex + 1) + ">";
            
            result += row;
            
        });
        
        return result + "</xml>";
        
    };
    
};

// Extending JQuery.

(function($) {
    
    // Data Needed For The Library To Work.
    
    $.fn.infinityCore = {
        renderer : new InfinityRenderer(),
        parser : new InfinityParser()
    };
    
    // JQuery Infinity Function (Used For Initialization).
    
    $.fn.infinity = function(settings) {
        
        // Get Element & Element Settings.
        
        var element         = $(this);
        var elementSettings = $(this).data("infinitySettings");
        
        // Handle Settings.
        
        if (typeof elementSettings === "undefined") {
            
            // Check Settings.
            
            if (typeof settings === "undefined") {
                
                settings = { };
                
            }
              
            // Check Fields.
            
            if (typeof settings.fields === "undefined") {
                
                settings.fields = [
                    { title : "Input", type : "input", size : "12" }
                ];
                
            }
            
            // Check Values.
            
            if (typeof settings.values === "undefined") {
                
                settings.values = [ ];
                
            }
            
            // Check Inputs.
            
            if (typeof settings.inputs === "undefined") {
                
                settings.inputs = { id : "infinity", align : "left" };
                
            }
            
            // Check Options.
            
            if (typeof settings.options === "undefined") {
                
                settings.options = { title : "Options", size : "3", align : "left" };
                
            }
            
            settings.inputs.size = 12 - settings.options.size;
            
            element.data("infinitySettings", settings);
            
            elementSettings = settings;
            
        }
        
        // Initialize Plugin.
        
        if (typeof elementSettings.infinityInit === "undefined") {
            
            // Create Initial Content
            
            $.fn.infinityCore.renderer.addHeader(element, elementSettings);
            $.fn.infinityCore.renderer.addRow(0, element, elementSettings);
            $.fn.infinityCore.renderer.handleValues(element, elementSettings);
            $.fn.infinityCore.renderer.handleObjects(element, elementSettings);
            
            // Add Required Events.
            
            element.on("click", ".infinity-btn-add", function(e) {
                
                var rowPosition = $(this).parent().parent().index();
                
                $.fn.infinityCore.renderer.addRow(rowPosition, element, elementSettings);
                $.fn.infinityCore.renderer.handleObjects(element, settings);
                
                e.preventDefault();
                
            });
            
            element.on("click", ".infinity-btn-remove", function(e) {
                
                var row       = $(this).parent().parent();
                var container = row.parent();
                var rowNumber = container.children(".infinity-row").length;
                
                if (rowNumber > 1) {
                    
                    row.remove();
                    
                }
                
                $.fn.infinityCore.renderer.handleObjects(element, settings);
                
                e.preventDefault();
                
            });
            
            // Toggle Initialization Flag.
            
            elementSettings.infinityInit = true;
            
            element.data("infinitySettings", elementSettings);
            
        }
        
    };
    
    // JQuery Infinity Parse Function (Used For Parsing The Fields To Text, JSON).
    
    $.fn.infinityParse = function(parseType, customParser) {
        
        // Get Element & Element Settings.
        
        var element         = $(this);
        var elementSettings = $(this).data("infinitySettings");
        
        // Parse Element.
        
        if (typeof customParser === "undefined") {
            
            if (parseType === "txt") {
                
                return $.fn.infinityCore.parser.toTXT(element);
                
            }
            else if (parseType === "json") {
                
                return $.fn.infinityCore.parser.toJSON(element);
                
            }
            else if (parseType == "xml") {
                
                return $.fn.infinityCore.parser.toXML(element);
                
            }
            
            return $.fn.infinityCore.parser.toTXT(element);
            
        }
        else {
            
            return customParser;
            
        }
        
    };
    
}(jQuery));
