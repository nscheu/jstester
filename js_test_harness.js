/**
*	Simple JavaScript Test Harness
*	@author Nicholas Scheuring 
*/



var testResults = [];
var verbosity = 0;
var inputsForTests = [0, 1, -1, -99, 99, "asd1234", "c", "!@#$%^&*()_+:?><", undefined, null];
var testNum = 0;

/**
*	Trims a function name of 'function' and post-name errata: (), etc
*/
function trimFunctionName(ownName) {
	ownName = ownName.substr('function '.length);
	ownName = ownName.substr(0, ownName.indexOf('('));
	return ownName;
}

function printFail(result, expected){
	return "%c Fail " + ((verbosity > 2) ? "  Result=" + result + " Ex=" + expected : "");
}

function printPass(result, expected){
	return "%c Pass " + ((verbosity > 2) ? "  Result=" + result + " Ex=" + expected : "");
}

function printVerboseMessages(callee, called, truth, expected){
	ownName = trimFunctionName(callee);
	var message = "";
	var startMessage = "#" + testNum + " " + ownName + " " + called + " :"; 
	var midMessage = (truth ? printPass(truth, expected) : printFail(truth, expected));
	var styles =  (truth ? "color: green;": "color: red;");
	console.log(startMessage + midMessage, styles);
}

function assertTrue(){
	var fn = arguments[0];
    var vars = Array.prototype.slice.call(arguments, 1);
    var truth = fn.apply(this, vars) && true;
	//var truth = fn && true;
	if(verbosity > 0){
		var ownName = arguments.callee.toString();
		printVerboseMessages(ownName, fn.name, truth, true);
		/*var startMessage = "#" + testNum + " " + ownName + " " + fn.name + " :"; 
		var midMessage = (truth ? printPass(truth, true) : printFail(truth, true));
		var styles =  (!truth ? "color: red;": "color: green;");
		console.log(startMessage + midMessage, styles);*/
		
	}
	testResult(truth);
	testNum += 1;
	return truth;
}

function assertFalse(fn){
	var fn = arguments[0];
    var vars = Array.prototype.slice.call(arguments, 1);
    var truth = fn.apply(this, vars) || false;
	//var truth = fn || false;
	if(verbosity > 0){
		var ownName = arguments.callee.toString();
		printVerboseMessages(ownName, fn.name, !truth, false);
		/*var startMessage = "#" + testNum + " " + "Assert False .: " + fn.name + " :"; 
		var midMessage = (truth ? printFail(truth, false) : printPass(truth, false));
		var styles =  (truth ? "color: red;": "color: green;");
		console.log(startMessage + midMessage, styles);*/
	}
	testResult(!truth);
	testNum += 1;
	return truth;
}

function checkExpect(){
	var expected = arguments[1];
	var fn = arguments[0];
	// remove the first 2 args
    var vars = Array.prototype.slice.call(arguments, 2);
    var result = fn.apply(this, vars); 
    var truth = result === expected;
	if(verbosity > 0){
		var ownName = arguments.callee.toString();
		printVerboseMessages(ownName, fn.name, truth, expected);
		/*var startMessage = "#" + testNum + " " + "Check Expect .: " + fn.name + " :"; 
		var midMessage = (truth ? printPass(truth, expected) : printFail(truth, expected));
		var styles =  (!truth ? "color: red;": "color: green;");
		console.log(startMessage + midMessage, styles);	*/
		//console.log("#" +  testNum + " " + (truth ? "Pass" : "Fail ***" + "Result=" + result + " Ex=" + expected) + " " + fn.name  + " :Check Expect : " );
	}
	testResult(truth);
	testNum += 1;
	return truth;
}

function testResult(pass){
	testResults.push(pass);
	if(verbosity == 2){
		console.log("Tests: " + testResults.length);
	}
}

function returnTestResults(){
	var output = "";
	output += "Test Results :::\n";
	var failedTests = 0;
	for(var i = 0; i < testResults.length; i++){
		if(testResults[i] == false){
			failedTests += 1;
		}
	}
	if(failedTests == 0){
		output += "All " + testResults.length + " Tests Passed!!!";
	}
	else{
		output += failedTests + " Tests Failed!!!";
	}
	if(verbosity > 2){
		output += testResults;
	}
	return output;
}

function printTestResults(){
	console.log("***********************************");
	console.log("Test Results :::");
	var failedTests = 0;
	for(var i = 0; i < testResults.length; i++){
		if(testResults[i] == false){
			failedTests += 1;
		}
	}
	if(failedTests == 0){
		console.log("%cAll " + testResults.length + " Tests Passed!!!", "color:green;");
	}
	else{
		console.log("%c" + failedTests + " Tests Failed!!!", "color: red;");
	}
	if(verbosity > 2){
		console.log(testResults);
	}
	console.log("***********************************");
}

function loadTests(verbosity){
	verbosity = verbosity;
	testResults = [];
}

function runTests(){
	printTestResults();
	var output = returnTestResults();
	testResults = [];
	return output;
};




function setVerbosity(verb){
	verbosity = verb;
}
