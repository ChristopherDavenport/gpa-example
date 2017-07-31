"use strict";

var effectiveCreditHours;
var creditHours;

/**
 * Element Names in Form are
 * fname: String
 * fgrade: String
 * fcredits: Number
 *
 * return: Nothing
 */
function submitGPA() {
    var submitGPAName = document.getElementById("fname").value;
    var submitGPAGrade = document.getElementById("fgrade").value;
    var submitGPAHours = parseFloat(document.getElementById("fcredits").value);

    var calculatedGradePoint = translateGrade(submitGPAGrade);
    var calculatedGradePointWeight = submitGPAHours * calculatedGradePoint;

    if (typeof(effectiveCreditHours) === "undefined") {
        effectiveCreditHours = calculatedGradePointWeight
    } else {
        effectiveCreditHours = effectiveCreditHours + calculatedGradePointWeight
    }

    if (typeof(creditHours) === "undefined") {
        creditHours = submitGPAHours
    } else {
        creditHours = creditHours + submitGPAHours
    }

    console.log("Effective Credit Hours are");
    console.log(effectiveCreditHours);
    console.log("Credit Hours are");
    console.log(creditHours);

    updateTable(submitGPAName, submitGPAGrade, calculatedGradePoint, submitGPAHours, calculatedGradePointWeight);
    var gpa = (effectiveCreditHours/creditHours);
    console.log("Current GPA is");
    console.log(gpa);
    updateGPA(gpa);
    clearFormFields();
}

function submitCurrent() {

    var currentCreditHours = parseFloat(document.getElementById("chours").value);
    var currentCreditQuality = parseFloat(document.getElementById("cquality").value);

    var currentGPA = currentCreditQuality / currentCreditHours;

    if (isNaN(currentCreditHours) || isNaN(currentCreditQuality)) {
        clearCurrentGPAForm();
        alert("Invalid Current GPA");
    } else {
        if (typeof(effectiveCreditHours) === "undefined") {
            effectiveCreditHours = currentCreditQuality
        } else {
            effectiveCreditHours = effectiveCreditHours + currentCreditQuality
        }

        if (typeof(creditHours) === "undefined") {
            creditHours = currentCreditHours
        } else {
            creditHours = creditHours + currentCreditHours
        }

        console.log("Effective Credit Hours are");
        console.log(effectiveCreditHours);
        console.log("Credit Hours are");
        console.log(creditHours);

        updateTable("Current GPA", "", currentGPA.toFixedDown(2), currentCreditHours, currentCreditQuality);
        var gpa = (effectiveCreditHours/creditHours);
        console.log("Current GPA is");
        console.log(gpa);
        updateGPA(gpa);
        clearCurrentGPAForm();
        hideCurrentGPAForm();
    }

}

Number.prototype.toFixedDown = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};


function resetPage(){
    effectiveCreditHours = undefined;
    creditHours = undefined;
    clearTable();
    clearGPA();
    clearFormFields();
    clearCurrentGPAForm();
    restoreCurrentGPAForm();
}


function translateGrade(grade) {
    var gradeLetters = [ 'a', 'a-', 'b+', 'b', 'b-', 'c+', 'c', 'c-', 'd', 'f', 'af', 'wf'];
    var gradePoints  = [   4,  3.7,  3.3,  3,   2.7,  2.3,   2,  1.7,   1,   0,    0,    0];

    var pos = gradeLetters.indexOf(grade.toLowerCase());
    var gradePoint;
    if (pos >= 0) {
        gradePoint = gradePoints[pos];
    } else {
        gradePoint = 0;
    }
    return gradePoint
}

function updateTable(name, grade, credits, gpa, weight){
    var tabBody=document.getElementById("editable");
    var row=document.createElement("tr");

    var nameCell = document.createElement("td");
    nameCell.innerHTML= name;

    var gradeCell = document.createElement("td");
    gradeCell.innerHTML= grade;

    var creditsCell = document.createElement("td");
    creditsCell.innerHTML = credits;

    var gpaCell = document.createElement("td");
    gpaCell.innerHTML = gpa;

    var weightCell = document.createElement("td");
    weightCell.innerHTML = weight.toFixed(2);

    row.appendChild(nameCell);
    row.appendChild(gradeCell);
    row.appendChild(creditsCell);
    row.appendChild(gpaCell);
    row.appendChild(weightCell);
    tabBody.appendChild(row);
}

function clearTable(){
    var tabBody = document.getElementById("editable");
    tabBody.innerHTML = "";
}

function updateGPA(gpa){
    var gpaDom = document.getElementById("gpa");
    gpaDom.innerHTML = "Estimated GPA is " + gpa.toFixedDown(2).toString();
}

function clearGPA(){
    var gpaDom = document.getElementById("gpa");
    gpaDom.innerHTML = ""
}

function clearFormFields(){
    document.getElementById("gpaForm").reset();
}

function clearCurrentGPAForm(){
    document.getElementById("initGPA").reset();
}

function hideCurrentGPAForm(){
    document.getElementById("initial").style.display = "none";
    document.getElementById("initButton").style.display = "none";
}

function restoreCurrentGPAForm(){
    document.getElementById("initial").style.display = "";
    document.getElementById("initButton").style.display = "";
}
