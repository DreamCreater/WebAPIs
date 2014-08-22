
var Validate = {
    valid: true,
    isEmpty: function(value) // accepts a single value or a Json Object of multiple values
            // it will return a boolean in case of single value
                    // Json Object in case Of object as parameter is there is atleast one empty value
                            // return false in case Of object as parameter is there is no empty value
                            {
                                this.valid = false;
                                var checkStringBlank = function(strValue) {
                                    strValue = strValue.trim(); // removes the extra spaces around the String
                                    var strlength = strValue.length;
                                    if (strValue === '' || strlength === 0) // check if the value is blank
                                        return true;
                                    else
                                        return false;
                                };
                                var type = typeof value;// get the type of argument passed for further validation
                                if (type) {
                                    switch (type) {
                                        case 'object':  // if the argument passed is a Json Object
                                            var returnObj = {
                                                empty: '',
                                                nonempty: ''
                                            };
                                            var emptyArray = [];
                                            var nonEmptyArray = [];
                                            for (var key in value) {
                                                var keyValue = value[key];
                                                keyValue = keyValue + '';
                                                this.valid = this.checkStringBlank(keyValue); // return true/false based on the value
                                                if (this.valid) {
                                                    // add the keys of agrument Object to emptyArray if the value is blank
                                                    emptyArray.push(key);
                                                }
                                                else {
                                                    // add the keys of agrument Object to nonEmptyArray if the value is not blank
                                                    nonEmptyArray.push(key);
                                                }
                                            }
                                            if (emptyArray.length === 0)
                                                this.valid = false;
                                            else {
                                                returnObj['empty'] = emptyArray;
                                                returnObj['nonempty'] = nonEmptyArray;
                                                this.valid = returnObj;  // adding the object to the return Flag/Object
                                            }
                                            return this.valid;

                                            break;

                                            // if the argument passed is a String 
                                        case 'string':
                                            this.valid = this.checkStringBlank(value);
                                            return this.valid;
                                            break;

                                            // if the argument passed is a non String type like number
                                        default:
                                            value = value + '';
                                            this.valid = this.checkStringBlank(value);
                                            return this.valid;
                                            break;
                                    }
                                }
                                else {
                                    return this.valid = 'The value passed is Incorrect';
                                }
                            },
                    lengthValidiator: function(value, validLength, operator) { // accepts following 3 parameters:
                        //1. Value = the value to be checked
                        //2. validlength = the length on which validation is to be set
                        //3. operator = type of validation to be done
                        this.valid = false;
                        if (!value) {
                            return 'The value passed is Incorrect';
                        }
                        var valLength = value.length;

                        // run a switch case on operator       
                        switch (operator) {
                            case "<": // for less than check
                                if (valLength < validLength) {
                                    this.valid = true;
                                }
                                return this.valid;
                                break;
                            case "<=": // for less than equal to check
                                if (valLength <= validLength) {
                                    this.valid = true;
                                }
                                return this.valid;
                                break;
                            case ">": // for greater than check
                                if (valLength > validLength) {
                                    this.valid = true;
                                }
                                return this.valid;
                                break;
                            case ">=": // for greater than equal to check
                                if (valLength >= validLength) {
                                    this.valid = true;
                                }
                                return this.valid;
                                break;
                            case "=": // for equal to check
                                if (valLength === validLength) {
                                    this.valid = true;
                                }
                                return this.valid;
                                break;
                            default: // in default case we do less than equal to check
                                if (valLength <= validLength) {
                                    this.valid = true;
                                }
                                return this.valid;
                                break;
                        }

                    },
                    isAlphaNumeric: function(value) // this function will validate the provided data for Alpha Numeric Value
                    {
                        this.valid = false;
                        if (!value) {
                            return '';
                        }
                        var TCode = value;
                        if (/[a-zA-Z_0-9\s]/.test(TCode)) { // This regex will check for only alphabetic characters, numbers, _ and Space only
                            this.valid = true;
                            return this.valid;
                        }
                        else {
                            this.valid = false;
                            return this.valid;
                        }

                    },
                    isNumeric: function(value) // this function will validate the provided data for Numeric Value
                    {
                        this.valid = false;
                        if (!value) {
                            return '';
                        }
                        var TCode = value;
                        if (/[\d\.+?\d$]/.test(TCode)) { // This regex will check for only numbers and  single dot(.) if any
                            this.valid = true;
                            return this.valid;
                        }
                        else {
                            this.valid = false;
                            return this.valid;
                        }

                    },
                    isEmail: function(emailvalue) {
                        this.valid = false;
                        var emailregex = /[0-9a-zA-Z._-]+@[0-9a-zA-Z._-]+\.[A-Za-z]{2,4}/; // regex for email
                        this.valid = emailregex.test(emailvalue); // checks if the email passed is correct or not 
                        return this.valid;
                    },
                    isSpinnerBlank: function(spinner) {   // accepts id of the spinner object or complete spinner object
                        this.valid = false;
                        var argtype = Object.prototype.toString.call(spinner);  // get the type of argument recieved
                        var spinnerValue = '';
                        var switcher = '';
                        if (argtype === '[object Object]') { // check if the spinner object is a jquery Object
                            argtype = spinner.prop('tagName');
                            if (argtype === 'SELECT')
                                switcher = 'SelectJquery';
                            else {
                                switcher = argtype;
                            }
                        }
                        else {
                            if (argtype === '[object String]') // check if the spinner is an id
                                switcher = 'String';
                            else if (argtype === '[object HTMLSelectElement]') // check if the spinner object is a JavaScript Object
                                switcher = 'SelectJS';
                            else
                                switcher = argtype;
                        }
                        switch (switcher) {
                            case "String":
                                spinnerValue = $("#" + spinner).val();
                                // matches th value with all in built blank/null values.
                                if (spinnerValue === 'null' || spinnerValue === 'Select' || spinnerValue === 'select' || spinnerValue === 'SELECT' || spinnerValue === '' || spinnerValue === undefined || spinnerValue === null)
                                    this.valid = true;
                                else
                                    this.valid = false;
                                return this.valid;
                                break;
                            case "SelectJquery":
                                spinnerValue = spinner.val();
                                // matches th value with all in built blank/null values.
                                if (spinnerValue === 'null' || spinnerValue === 'Select' || spinnerValue === 'select' || spinnerValue === 'SELECT' || spinnerValue === '' || spinnerValue === undefined || spinnerValue === null)
                                    this.valid = true;
                                else
                                    this.valid = false;
                                return this.valid;
                                break;
                            case "SelectJS":
                                spinnerValue = spinner.value;
                                // matches th value with all in built blank/null values.
                                if (spinnerValue === 'null' || spinnerValue === 'Select' || spinnerValue === 'select' || spinnerValue === 'SELECT' || spinnerValue === '' || spinnerValue === undefined || spinnerValue === null)
                                    this.valid = true;
                                else
                                    this.valid = false;
                                return this.valid;
                                break;
                            default:
                                // to do proper message in error api                               
                                break;
                        }
                    },
                    isSameDatatype: function(matchObj, MatchType) { // accepts an object and mtching Object Type
                        this.valid = false;
                        var objType = jQuery.type(matchObj);
                        MatchType = MatchType.toLowerCase();
                        if (MatchType === 'regex')
                            MatchType = 'regexp'; // because jquery returns regexp for regular expressions
                        var str = '';
                        if (objType === 'object') {
                            switch (MatchType) {
                                case 'json':
                                    str = JSON.stringify(matchObj); // convert Object into Json String
                                    if (str) // if conversion sucessfull
                                        this.valid = true;
                                    return this.valid;
                                    break;
                                case 'xml':
                                    if (device['name'] === 'Internet Explorer') { // matches if browser if IE
                                        str = matchObj.xml; // convert Object into mxl String
                                    }
                                    else { // for rest browsers
                                        str = (new XMLSerializer()).serializeToString(matchObj); // convert Object into mxl String
                                    }
                                    if (str)  // if conversion sucessfull
                                        this.valid = true;
                                    return this.valid;
                                    break;
                                default:
                                    // to do proper message in error api 
                                    break;
                            }
                        }
                        else if (objType === MatchType) { // if the desired type matches Object type
                            this.valid = true;
                            return this.valid;
                        }
                        else {
                            // to do return the actual type of the matchObj
                            return this.valid;
                        }
                    },
                    checkDateRange: function(date1, date2, days) // accepts two date Objects/Strings (yyyy-mm-dd) and an optional Days parameter
                    {
                        this.valid = false;
                        var isGreaterDate = function(d1, d2) {
                            if (d2 >= d1)
                                return true;
                            else
                                return false;
                        };
                        var createDate = function(dateStr)  // converts date String to Date object
                        {
                            var strArray = dateStr.split('-');
                            return new Date(strArray[0], strArray[1], strArray[2]);
                        };
                        var checkDayDiffrence = function(d1, d2, day) {
                            var day1 = d1.getDate(); // get the date of 1st date object
                            var day2 = d2.getDate(); // get the date of 2nd date object
                            var dayDiff = day2 - day1;
                            if (dayDiff === day) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        };
                        var date1typ = jQuery.type(date1);
                        var date2typ = jQuery.type(date2);
                        if (date1typ !== date2typ) // if the passed date types doesn't match
                        {
                            // to do exact error in error API
                            return false;
                        }
                        else {
                            switch (date1typ) {
                                case 'date':
                                    if (arguments.length === 3) // if no. of days are present
                                    {
                                        days = days * 1;
                                        this.valid = checkDayDiffrence(date1, date2, days);
                                    }
                                    else {
                                        this.valid = isGreaterDate(date1, date2);
                                    }
                                    return this.valid;

                                    break;
                                case 'string':
                                    date1 = createDate(date1);
                                    date2 = createDate(date2);
                                    if (arguments.length === 3) {
                                        days = days * 1;
                                        this.valid = checkDayDiffrence(date1, date2, days);
                                    }
                                    else {
                                        this.valid = isGreaterDate(date1, date2);
                                    }
                                    break;
                                default:
                                    // To do in Error API
                                    break;
                            }
                        }

                    }
                };
