let gridSideLength = 16;
let screenDivisionValue = (1 / gridSideLength) * 100
let mainContentDiv = document.getElementById("mainContent");
let slateDivList = mainContentDiv.childNodes;

function eraseSlate() {
    let i = 0;
    while (mainContentDiv.hasChildNodes()) {   
        mainContentDiv.removeChild(slateDivList[0]);
        i++;
    }
    console.log("slate erased after " + i + " iterations");
}

function drawSlate(sideLength) {
    screenDivisionValue = (1 / gridSideLength) * 100
    for (let i = 0; i < gridSideLength; i++) {
        var div = document.createElement("div");
        div.style.height = screenDivisionValue + "vw";
        div.setAttribute("id", "newRow");
        div.setAttribute("class", "row");
        div.style.bottom = (3 * i) + "px";
        mainContentDiv.appendChild(div);
        try {
            for (let j = 0; j < gridSideLength; j++) {
                let mode = document.getElementById("mode-selector").value;
                var pix = document.createElement("div");
                setDrawMode(mode, pix);
                document.getElementById("newRow").appendChild(pix);
                pix.style.width = screenDivisionValue + "vw";
            }
        } finally {
            document.getElementById("newRow").setAttribute("id", "");
        }
    }
    let rowsNumber = mainContentDiv.childElementCount;
    let columnsNumber = document.getElementsByClassName("row")[0].childElementCount;
    console.log("Slate drawn with " + rowsNumber + " rows and " + columnsNumber + " columns");
}
drawSlate(gridSideLength);

let resetResizeButton = document.getElementById("resetResizeButton");
resetResizeButton.onclick = function() {
    tempLength = prompt("Enter a side length (single number) or leave blank for default (16x16):");
    console.log("tempLength: " + tempLength);                                   
    eraseSlate();
    if (tempLength !== "") {
        gridSideLength = tempLength;
        drawSlate(gridSideLength);
        console.log("New drawn with side length of: " + gridSideLength);
    }
    else { drawSlate(gridSideLength);
    console.log("Default drawn"); }
}

let clearButton = document.getElementById("clearButton");
clearButton.onclick = function() {
    eraseSlate();
    drawSlate(gridSideLength);
    console.log("Default drawn");
}

function setDrawMode(drawMode, element) {
    if (drawMode === "cyan") {
        console.log("Mode: Cyan");
        element.addEventListener("mouseover", function() {
            event.target.style.background = "cyan";
        });
    }
    else if (drawMode === "black") {
        console.log("Mode: Black");
        element.addEventListener("mouseover", function() {
            event.target.style.background = "black";
        });
    }
    else if (drawMode === "rbg") {
        console.log("Mode: RBG");
        element.addEventListener("mouseover", function() {
            let randNumberOne = Math.floor((Math.random() * 255));
            let randNumberTwo = Math.floor((Math.random() * 255));
            let randNumberThree = Math.floor((Math.random() * 255));
            event.target.style.background = "rbg(" + randNumberOne + "," + randNumberTwo + "," + randNumberThree + ")";
        });
    }
    else if (drawMode === "opacity-increment") {
        console.log("Mode: Opacity-Increment");
        element.addEventListener("mouseover", function() {
            let currentOpacity = event.target.style.opacity;
            event.target.style.opacity = currentOpacity
        })
    }
}

// pixelArray 'pixels' begin at index 1, not index 0
let pixelArray = {};
for (let i = 0; i < slateDivList.length; i++) {
    pixelArray[i] = slateDivList;
}