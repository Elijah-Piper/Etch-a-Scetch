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
        div.setAttribute("id", "newDiv");
        div.setAttribute("class", "row");
        div.style.bottom = (3 * i) + "px";
        mainContentDiv.appendChild(div);
        try {
            for (let j = 0; j < gridSideLength; j++) {
                var div = document.createElement("div");
                div.style.width = screenDivisionValue + "vw";
                div.setAttribute("class", "slatePixel");
                div.addEventListener("mouseover", function(event) {
                    event.target.style.background = "cyan";
                });
                document.getElementById("newDiv").appendChild(div);
            }
        } finally {
            document.getElementById("newDiv").setAttribute("id", "");
        }
    }
    let rowsNumber = mainContentDiv.childElementCount;
    let columnsNumber = document.getElementsByClassName("row")[0].childElementCount;
    console.log("Slate drawn with " + rowsNumber + " rows and " + columnsNumber + " columns");
}
drawSlate(gridSideLength);

let resetButton = document.getElementById("resetButton");
resetButton.onclick = function() {
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

// pixelArray 'pixels' begin at index 1, not index 0
let pixelArray = {};
for (let i = 0; i < slateDivList.length; i++) {
    pixelArray[i] = slateDivList;
}