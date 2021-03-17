
// Assert Method
function assert(value, desc, id = "results", ul) {        
    var li = document.createElement("li");
    li.className = value ? "pass" : "fail";
    li.appendChild(document.createTextNode(desc));
    return li;
}

//String builder
const closureName = ["Global", "outerFunction()", "innerFunction1()","innerFunction2","insideInnerFunction1"];
const valueName = ["globalValue","outerValue","innerValue1","innerValue2","insideInnerFunction1Value"];
const name = Object.freeze({ "global": 0, "outer": 1, "inner1": 2, "inner2": 3, "insideInner": 4 });

//Testing Closures
var globalValue = "global Value";
var innerFunc1;
var innerFunc2;
var insideInnerFunc1;

function closureAccessStringBuilder(closureName, valueName) {
    var closureAccessString = `${closureName} can access the ${valueName} from within its closure`;    
    return closureAccessString;
}

function closureCheck(closureName, id = "results", ...values) {
    //By using the this keyword, each time ...values are passed in we only check the passed in values and don't save any older passed in values
    var ul = document.createElement("ul");
    ul.setAttribute("id", "closureList");

    //We do not need to pass globalValue because the closure of closureCheck() has access to it!
    for (let i = 0; i < values.length; i++) {
        if (values[i] === "outerFunction Value") {
            this.outerValue = values[i];
        }
        if (values[i] === "innerFunction1 Value") {
            this.innerValue1 = values[i];
        }
        if (values[i] === "innerFunction2 Value") {
            this.innerValue2 = values[i];
        }
        if (values[i] === "insideInnerFunction1 Value") {
            this.insideInnerFunction1Value = values[i];
        }
    }

    //Check each value and add it's pass or fail to an <ul>
    document.getElementById(id).appendChild(ul);
    if (typeof globalValue !== "undefined") {
        li = assert(globalValue === "global Value", closureAccessStringBuilder(closureName, valueName[name.global]), id);
        ul.appendChild(li);
    }
    else {
        li = assert(false, closureAccessStringBuilder(closureName, valueName[name.global]), id);
        ul.appendChild(li);
    }
    if (typeof this.outerValue !== "undefined") {
        li = assert(this.outerValue === "outerFunction Value", closureAccessStringBuilder(closureName, valueName[name.outer]), id, ul);
        ul.appendChild(li);
    } else {
        li = assert(false, closureAccessStringBuilder(closureName, valueName[name.outer]), id, ul);
        ul.appendChild(li);
    }
    if (typeof this.innerValue1 !== "undefined") {
        li = assert(this.innerValue1 === "innerFunction1 Value", closureAccessStringBuilder(closureName, valueName[name.inner1]), id, ul);
        ul.appendChild(li);
    } else {
        li = assert(false, closureAccessStringBuilder(closureName, valueName[name.inner1]), id, ul);
        ul.appendChild(li);
    }
    if (typeof this.innerValue2 !== "undefined") {
        li = assert(this.innerValue2 === "innerFunction2 Value", closureAccessStringBuilder(closureName, valueName[name.inner2]), id, ul);
        ul.appendChild(li);
    } else {
        li = assert(false, closureAccessStringBuilder(closureName, valueName[name.inner2]), id, ul);
        ul.appendChild(li);
    }
    if (typeof this.insideInnerFunction1Value !== "undefined") {
        li = assert(this.insideInnerFunction1Value === "insideInnerFunction1 Value", closureAccessStringBuilder(closureName, valueName[name.insideInner]), id, ul);
        ul.appendChild(li);
    } else {
        li = assert(false, closureAccessStringBuilder(closureName, valueName[name.insideInner]), id, ul);
        ul.appendChild(li);
    }

}
closureCheck(closureName[name.global]);
////Left in for posterity, these checks where nested within each function to demonstrate closures
//if (typeof globalValue !== "undefined") {
//    assert(globalValue === "global Value", closureAccessStringBuilder(closureName[name.global], valueName[name.global]));
//}
//else {
//    assert(false, closureAccessStringBuilder(closureName[name.global], valueName[name.global]));
//}
//if (typeof outerValue !== "undefined") {
//    assert(outerValue === "outerFunction Value", closureAccessStringBuilder(closureName[name.global], valueName[name.outer]));
//} else {
//    assert(false, closureAccessStringBuilder(closureName[1], valueName[1]));
//}
//if (typeof innerValue1 !== "undefined") {
//    assert(innerValue === "innerFunction1 Value", closureAccessStringBuilder(closureName[name.global], valueName[name.inner1]));
//} else {
//    assert(false, closureAccessStringBuilder(closureName[name.global], valueName[name.inner1]));
//}
//if (typeof innerValue2 !== "undefined") {
//    assert(innerValue2 === "innerFunction2 Value", closureAccessStringBuilder(closureName[name.global], valueName[name.inner2]));
//} else {
//    assert(false, closureAccessStringBuilder(closureName[name.global], valueName[name.inner2]));
//}
//if (typeof insideInnerFunction1Value !== "undefined") {
//    assert(insideInnerFunction1Value === "insideInnerFunction1Value Value", closureAccessStringBuilder(closureName[name.global], valueName[name.insideInner]));
//} else {
//    assert(false, closureAccessStringBuilder(closureName[name.global], valueName[name.insideInner]));
//}

function outerFunction() {
    var outerValue = "outerFunction Value";
    const outerFunctionResults = "outerFunctionResults";   
    //We instatiate a new closureCheck so the this keyword within the function referes to a newly instantiated object
    new closureCheck(closureName[name.outer], outerFunctionResults, outerValue);

    function innerFunction1() {
        var innerValue1 = "innerFunction1 Value";
        const innerFunction1Results = "innerFunction1Results";
        //We can pass all variables available to innerFunction1(), outerFunction() and Global due to closures!
        new closureCheck(closureName[name.inner1], innerFunction1Results, outerValue, innerValue1);
        
        function insideInnerFunction1() {
            var insideInnerFunction1Value = "insideInnerFunction1 Value";
            const insideInnerFunction1Results = "insideInnerFunction1Results";
            //We can not pass innerValue2 because the closure of this function encapsulates Global,innerFunction1() and insideInnerFunction1()
            new closureCheck(closureName[name.insideInner], insideInnerFunction1Results, outerValue, innerValue1, insideInnerFunction1Value);
        }
        insideInnerFunc1 = insideInnerFunction1;
    }

    function innerFunction2() {
        var innerValue2 = "innerFunction2 Value";
        var innerFunction2Results = "innerFunction2Results";
        //We can not pass innerValue1 or insideInnerFunction1Value due to innerFunction2()'s closure which encapsulates all variables in innerFunction2(), outerFunction() and Global.
        new closureCheck(closureName[name.inner2], innerFunction2Results, outerValue, innerValue2);
    }
    innerFunc1 = innerFunction1;
    innerFunc2 = innerFunction2;
}

//Toggle visual borders for closures
function toggleClosureBorders() {
    var globalClosureBorder = document.getElementById("globalClosure");
    var outerClosureBorder = document.getElementById("outerClosure");
    var inner1ClosureBorder = document.getElementById("inner1Closure");
    var insideInner1ClosureBorder = document.getElementById("insideInner1Closure");

    if (globalClosureBorder.style.border !== "hidden") {
        globalClosureBorder.style.border = "hidden";
    } else {
        globalClosureBorder.style.border = ""
    }
    if (outerClosureBorder.style.border !== "hidden") {
        outerClosureBorder.style.border = "hidden";
    } else {
        outerClosureBorder.style.border = "";
    }
    if (inner1ClosureBorder.style.border !== "hidden") {
        inner1ClosureBorder.style.border = "hidden";
    } else {
        inner1ClosureBorder.style.border = "";
    }   
    if (insideInner1ClosureBorder.style.border !== "hidden") {
        insideInner1ClosureBorder.style.border = "hidden";
    } else {
        insideInner1ClosureBorder.style.border = "";
    }

}

document.getElementById("outerFunctionButton").onclick = function () {    
    outerFunction();
}

document.getElementById("innerFunction1Button").onclick = function () {
    innerFunc1();
}

document.getElementById("innerFunction2Button").onclick = function () {
    innerFunc2();
}

document.getElementById("insideInnerFunction1Button").onclick = function () {
    insideInnerFunc1();
}

document.getElementById("globalButton").onclick = function () {
  
}

document.getElementById("toggleClosureBordersButton").onclick = function () {
    toggleClosureBorders();
}