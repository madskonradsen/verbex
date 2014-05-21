var blocks = [
    {
        "internalName": "startOfLine",
        "publicName": "Start of line",
        "publicDescription": "Mark the expression to start at the beginning of the line",
        "params": false,
        "showSettings": {
            "string": false,
            "checkboxes": false
        }
    },
    {
        "internalName": "endOfLine",
        "publicName": "End of line",
        "publicDescription": "Mark the expression to end at the last character of the line",
        "params": false,
        "showSettings": {
            "string": false,
            "checkboxes": false
        }
    },
    {
        "internalName": "then",
        "publicName": "Then",
        "publicDescription": "Add a string to the expression",
        "params": true,
        "showSettings": {
            "string": true,
            "checkboxes": true
        }
    },
    {
        "internalName": "maybe",
        "publicName": "Maybe",
        "publicDescription": "Add a string to the expression that might appear once (or not)",
        "params": true,
        "showSettings": {
            "string": true,
            "checkboxes": true
        }
    },
    {
        "internalName": "anything",
        "publicName": "Anything",
        "publicDescription": "Matches any character any number of times",
        "params": false,
        "showSettings": {
            "string": false,
            "checkboxes": false
        }
    },
    {
        "internalName": "anythingBut",
        "publicName": "Anything but",
        "publicDescription": "Matches anything but these characters",
        "params": true,
        "showSettings": {
            "string": true,
            "checkboxes": false
        }
    },
    {
        "internalName": "something",
        "publicName": "Something",
        "publicDescription": "Matches any character at least one time",
        "params": false,
        "showSettings": {
            "string": false,
            "checkboxes": false
        }
    },
    {
        "internalName": "somethingBut",
        "publicName": "Something but",
        "publicDescription": "Matches any character at least one time except for these characters",
        "params": true,
        "showSettings": {
            "string": true,
            "checkboxes": true
        }
    },
    {
        "internalName": "lineBreak",
        "publicName": "Linebreak",
        "publicDescription": "Add universal line break expression",
        "params": false,
        "showSettings": {
            "string": false,
            "checkboxes": false
        }
    },
    {
        "internalName": "tab",
        "publicName": "Tab",
        "publicDescription": "Add expression to match a tab character",
        "params": false,
        "showSettings": {
            "string": false,
            "checkboxes": false
        }
    },
    {
        "internalName": "word",
        "publicName": "Word",
        "publicDescription": "Adds an expression to match a word<br /of>The characters considered word characters are the regular word characters as known from regexes: all letters, numbers and underscores.",
        "params": true,
        "showSettings": {
            "string": true,
            "checkboxes": true
        }
    },
    {
        "internalName": "anyOf",
        "publicName": "Any of",
        "publicDescription": "Matches any given character",
        "params": true,
        "showSettings": {
            "string": true,
            "checkboxes": true
        }
    },
    {
        "internalName": "withAnyCase",
        "publicName": "With any case",
        "publicDescription": "Case-insensitivity modifier",
        "params": false,
        "showSettings": {
            "string": false,
            "checkboxes": false
        }
    },
    {
        "internalName": "stopAtFirst",
        "publicName": "Stop at first",
        "publicDescription": "Stop at first match, or if not added, target all matches",
        "params": false,
        "showSettings": {
            "string": false,
            "checkboxes": false
        }
    },
    {
        "internalName": "searchOneLine",
        "publicName": "Search one line",
        "publicDescription": "Only search one line",
        "params": false,
        "showSettings": {
            "string": false,
            "checkboxes": false
        }
    }
];

var verbalExpressionsApp = (function(){
    "use strict";
    var method = {};

    method.init = function() {
        //Adding the current blocks to the website
        $.each(blocks, function(key, value) {
            $(".blocks").append("<button type=\"button\" class=\"block btn btn-primary btn-sm\" data-name=\"" + this.internalName + "\">" + this.publicName + "</button>");
        });

        //Calculating the current regex on init
        method.blockCalc();
    };

    method.updateSorter = function() {
        $(".selectedBlocks").sortable("destroy");
        $(".selectedBlocks").sortable();
    };

    method.getCurrentBlock = function(blockName) {
        var currentBlock;
        $.each(blocks, function(key, value) {
            if(this.internalName ==  blockName) {
                currentBlock = this;
                return false;
            }
        });
        return currentBlock;
    };

    method.showBlockSettings = function(blockName) {
        var currentBlock = method.getCurrentBlock(blockName);
        var settingsString = "<h4>" + currentBlock.publicName + "</h4>";
        settingsString += "<p>" + currentBlock.publicDescription + "</p>";
        settingsString += "<div class=\"form-horizontal\">";
        if(currentBlock.showSettings.string === true) {
            settingsString +=   "<div class=\"form-group\">";
            settingsString +=       "<label for=\"inputParams\" class=\"col-sm-1 control-label\">What</label>";
            settingsString +=       "<div class=\"col-sm-3\">";
            settingsString +=           "<input class=\"inputParams form-control\" type=\"text\">";
            settingsString +=       "</div>";
            settingsString +=   "</div>";
        }

        settingsString +=   "<div class=\"form-group\">";
        settingsString +=       "<div class=\"col-sm-offset-1 col-sm-10\">";
        settingsString +=           "<div class=\"add btn btn-primary btn-success btn-sm\">Add</div>";
        settingsString +=       "</div>";
        settingsString +=   "</div>";
        settingsString += "</div>";
        $(".blockSettings").html(settingsString);
    };

    method.addBlock = function(blockName) {
        var currentBlock = method.getCurrentBlock(blockName);
        var blockString = "<div class=\"btn-group\">";
        blockString += "";
        blockString += "<div class=\"block btn btn-primary btn-sm\" data-name=\"" + currentBlock.internalName + "\" data-params='";
        if(currentBlock.params === true){
            if(currentBlock.showSettings.string === true) {
                blockString += "{\"string\":\"" + btoa($(".inputParams").val()) + "\"}";
            }
        }
        blockString += "'>" + currentBlock.publicName;
        if(currentBlock.params === true){
            if(currentBlock.showSettings.string === true) {
                blockString += " '" + $(".inputParams").val() + "'";
            }
        }
        blockString += "</div>";
        blockString += "<div class=\"removeMe btn btn-primary btn-sm\"><span class=\"glyphicon glyphicon-remove\"></div>";
        blockString += "</div>";

        $(".selectedBlocks").append(blockString);
        method.blockCalc();
    };

    method.blockCalc = function() {
        method.updateSorter();

        //Calculating the string for verbelExpression
        var verbalString = "VerEx()";
        $(".selectedBlocks .block").each(function() {
            var blockParams = $(this).data("params");
            var blockName = $(this).data("name");
            var currentBlock = method.getCurrentBlock(blockName);
            verbalString += "." + blockName;
            if(currentBlock.params === true) {
                if(currentBlock.showSettings.string === true) {
                    verbalString += "(\""+atob(blockParams.string).replace("\"","\\\"")+"\")";
                }
            } else {
                verbalString += "()";
            }
        });

        //console.log("%cVerbalstring: " + verbalString+"" , "color: blue; font-size: large");
        
        //Evaluating the verbalExpression-string
        var generatedRegex;
        try { 
            generatedRegex = eval(verbalString);
        } catch (e) { 
            console.log(e);
            $(".outputRegex").addClass("error");
        }

        //Outputting the regex, and highlighting the targeted part
        $(".outputRegex").val(generatedRegex);
        $(".matchMe").highlightRegex();
        if (typeof generatedRegex !== "undefined") {
            $(".outputRegex").removeClass("error");
            if ($(".outputRegex").val() !== "") {
                $(".matchMe").highlightRegex(generatedRegex);
            }
        }
    };

    return method;
}());

verbalExpressionsApp.init();

//Events
$("body").on('click', '.removeMe', function() {
    $(this).parent().remove();
    verbalExpressionsApp.blockCalc();
    if($(".selectedBlocks").is(":empty")) {
        $(".selectedBlocks").html("<i class=\"noBlocks\">No blocks added</i>");
    } else {
        $(".noBlocks").remove();
    }
});

$(".blocks").on('click', '.block', function() {
    verbalExpressionsApp.showBlockSettings($(this).data("name"));
    if($(this).hasClass("active")) {
        $(this).removeClass("active");  
        $(".blockSettings").slideUp("fast");  
    } else {
        $(".blocks .block").removeClass("active");
        $(this).addClass("active");
        $(".blockSettings").slideDown("fast");
    }
});

$("body").on('click', '.add', function() {
    verbalExpressionsApp.addBlock($(".active").data("name"));
    $(".blocks .block").removeClass("active");
    $(".blockSettings").slideUp("fast");
    $(".noBlocks").remove();
});

$(".outputRegex").on("click", function () {
   $(this).select();
});

$(".selectedBlocks").on("sortupdate", function() {
    verbalExpressionsApp.blockCalc();
});

$(".matchMe").on('keyup blur', function() {
    verbalExpressionsApp.blockCalc();
});