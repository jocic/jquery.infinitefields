/**************************************************\
|* Script Author: Djordje Jocic                   *|
|* Script Year: 2016                              *|
|* Script Version: 1.0.0                          *|
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

// Extending JQuery.

(function($) {
    
    // JQuery Infinity Function (Used For Initialization).
    
    $.fn.infinity = function(settings) {
        
        // Get Element & Element Settings.
        
        var element         = $(this);
        var elementSettings = $(this).data("infinitySettings");
        
        // If Settings Not Available, Generate Default Settings.
        
        if (typeof elementSettings === "undefined" && typeof settings === "undefined") {
            
            settings = {
                rowClass : ".infinity-row",
                inputClass : ".infinity-input",
                addClass : ".infinity-btn-add",
                removeClass : ".infinity-btn-remove",
                fieldName : "infinity",
                fields : [
                ],
                fieldCount : 0,
                headerTemplate : "<div class='infinity-header'>" +
                                     "<div class='infinity-col-6'>Name</div>" +
                                     "<div class='infinity-col-3'>Price</div>" +
                                     "<div class='infinity-col-3'>Options</div>" +
                                     "<div class='infinity-clear'></div>" +
                                 "</div>",
                rowTempalte : "<div class='infinity-row'>" +
                                  "<div class='infinity-col-6'>" +
                                      "<div class='infinity-input-wrapper'><input class='infinity-input' /></div>" +
                                  "</div>" +
                                  "<div class='infinity-col-3'>" +
                                      "<div class='infinity-input-wrapper'><input class='infinity-input' /></div>" +
                                  "</div>" +
                                  "<div class='infinity-col-3'>" +
                                      "<a class='infinity-btn infinity-btn-add' title='Add' href='#'></a>" +
                                      "<a class='infinity-btn infinity-btn-remove' title='Remove' href='#'></a>" +
                                      "<div cass='infinity-clear'></div>" +
                                  "</div>" +
                                  "<div class='infinity-clear'></div>" +
                              "</div>"
            };
            
        }
        else {
            
            settings = elementSettings;
            
        }
        
        // Create Initial Content.
        
        element.append(settings.headerTemplate);
        
        if (settings.fields.length === 0) {
            
            element.append(settings.rowTempalte);
            
        }
        else {
            
            $(settings.fields).each(function(index, value) {
                element.append(settings.rowTempalte);
            });
            
        }
        
        // Process Initial Content.
        
        element.find(settings.rowClass).each(function(rIndex, rValue) {
            
            $(this).find(settings.inputClass).each(function(iIndex, iValue) {
                
                $(this).attr("name", settings.fieldName + "[" + rIndex + "][" + iIndex + "]");
                
                if (typeof settings.fields[rIndex] === "undefined" || typeof settings.fields[rIndex][iIndex] === "undefined") {
                    
                    settings.fields[rIndex] = [
                        "",
                        ""
                    ];
                    
                }
                else {
                    
                    $(this).attr("value", settings.fields[rIndex][iIndex]);
                    
                }
                
            });
            
        });
        
        // Add Events.
        
        element.on("click", settings.addClass, function() {
            
            element.append(settings.rowTempalte);
            
            settings.fields.push([
                "",
                ""
            ]);
            
            element.find(settings.rowClass).each(function(rIndex, rValue) {
                
                $(this).find(settings.inputClass).each(function(iIndex, iValue) {
                    
                    $(this).attr("name", settings.fieldName + "[" + rIndex + "][" + iIndex + "]");
                    
                    if (typeof settings.fields[rIndex] !== "undefined" && typeof settings.fields[rIndex][iIndex] !== "undefined") {
                        
                        $(this).attr("value", settings.fields[rIndex][iIndex]);
                        
                    }
                    
                });
                
            });
            
            element.data("infinitySettings", settings);
            
        });
        
        element.on("click", settings.removeClass, function() {
            
            if (settings.fields.length > 1) {
                
                var container = $(this).parent().parent();
                var index     = container.index() - 1;
                
                container.remove();
                
                settings.fields.splice(index, 1);
                
            }
            
            element.find(settings.rowClass).each(function(rIndex, rValue) {
                
                $(this).find(settings.inputClass).each(function(iIndex, iValue) {
                    
                    $(this).attr("name", settings.fieldName + "[" + rIndex + "][" + iIndex + "]");
                    
                    if (typeof settings.fields[rIndex] !== "undefined" && typeof settings.fields[rIndex][iIndex] !== "undefined") {
                        
                        $(this).attr("value", settings.fields[rIndex][iIndex]);
                        
                    }
                    
                });
                
            });
            
            element.data("infinitySettings", settings);
            
        });
        
        
        // Set Initiated Flag & Save Settings.
        
        settings.infinityInit = true;
        
        element.data("infinitySettings", settings);
        
    };
    
    // JQuery Infinity Parse Function (Used For Parsing The Fields To Text, JSON).
    
    $.fn.infinityParse = function(parseType) {
        
        // Get Element & Element Settings.
        
        var element         = $(this);
        var elementSettings = $(this).data("infinitySettings");
        var results         = "";
        
        // Parse Fields.
        
        $(elementSettings.fields).each(function(rIndex, rValue) {
            
            var line = "";
            
            $(rValue).each(function(iIndex, iValue) {
                
                if (parseType === "text") {
                    
                    if (iIndex == 1) {
                        
                        iValue += "£";
                        
                    }
                    
                    line += iValue + " ";
                    
                }
                
            });
            
            if (parseType === "text") {
                
                results += line.trim() + "\n";
                
            }
            
        });
        
        if (parseType === "text") {
            
            return results;
            
        }
        else {
            
            return JSON.stringify(elementSettings.fields);
            
        }
        
    };
    
}(jQuery));
