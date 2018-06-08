(function () {
    'use strict';
})();


// Connect to DOM

const hexTextInput = document.getElementById('hex-text');
const rgbTextInput = document.getElementById('rgb-text');
const body = document.getElementById('app');


// Add event listeners

hexTextInput.addEventListener('input', handleHex);
rgbTextInput.addEventListener('input', handleRGB);

let hexString = '';
let rgbString = '';

// Handle hex input change

function handleHex(e) {
    hexString = e.target.value;
    hexString = hexString.replace('#', '');

    if (hexString.length === 3 && hexString.charAt(0) === hexString.charAt(1) && hexString.charAt(0) === hexString.charAt(2)) {
        hexString += hexString;
    } else {
        resetRGBInput();
    }

    if(hexString.length === 6) {
        body.style.backgroundColor = `${'#' + hexString}`;
        convertHex(hexString);
    } else {
        resetRGBInput();
    }
}

function convertHex(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const rgbString = 'rgb(' + r + ',' + g + ',' + b + ')';
    showRGBValue(rgbString);
    if (sumRGBComponents(rgbStringToArray(rgbString)) < 382) {
        setLightText();
    } else {
        setDarkText();
    }
    

    return rgbString;
}


// Handle rgb input change

function handleRGB(e) {
    rgbString = e.target.value;
    rgbString = rgbString.replace('r', '');
    rgbString = rgbString.replace('g', '');
    rgbString = rgbString.replace('b', '');
    rgbString = rgbString.replace('(', '');
    rgbString = rgbString.replace(')', '');

    let rgbComponents = rgbString.split(',');
 
    rgbComponents = rgbComponents.map((val) => Number(val));

    let isRGBValid = false;
    
    if (rgbComponents.length === 3 && rgbComponents[0] > -1 && rgbComponents[0] < 256 && rgbComponents[1] > -1 && rgbComponents[1] < 256 && rgbComponents[2] > -1 && rgbComponents[2] < 256 && rgbString[rgbString.length - 1] !== ',') {
        isRGBValid = true;
    } else {
        isRGBValid = false;
        resetHexInput();
    }
    
    if (isRGBValid) {
        const hexString = convertRGB(rgbComponents[0], rgbComponents[1], rgbComponents[2]);
        body.style.backgroundColor = `${hexString}`;
        showHexValue(hexString);
        
        const sumRGB = rgbComponents.reduce((total, amount) => total + amount);
        if (sumRGB < 382) {
            setLightText();
        } else {
            setDarkText();
        }
    }
}


// RGB string into array 

function rgbStringToArray(rgbStr) {
    rgbStr = rgbStr.replace('r', '');
    rgbStr = rgbStr.replace('g', '');
    rgbStr = rgbStr.replace('b', '');
    rgbStr = rgbStr.replace('(', '');
    rgbStr = rgbStr.replace(')', '');

    let rgbComponents = rgbStr.split(',');
    rgbComponents = rgbComponents.map((val) => Number(val));    

    return rgbComponents;
}


// RGB sum utility 

function sumRGBComponents(rgbComponents) {
    return rgbComponents.reduce((total, amount) => total + amount);
}




function componentToHex(component) {
    let hex = component.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function convertRGB(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// Display hex and rgb values 

function showRGBValue(rgb) {
    rgbTextInput.value = rgb;
}

function resetRGBInput() {
    rgbTextInput.value = '';
    resetApp();
}

function showHexValue(hex) {
    hexTextInput.value = hex;
}

function resetHexInput() {
    hexTextInput.value = '';
    resetApp();
}


// Set font color based on background color

function setDarkText() {
    body.style.color = '#2b2b2b';
    hexTextInput.style.borderBottom = '1px dotted #2b2b2b';
    rgbTextInput.style.borderBottom = '1px dotted #2b2b2b';

}

function setLightText() {
    body.style.color = '#eee';
    hexTextInput.style.borderBottom = '1px dotted #eee';
    rgbTextInput.style.borderBottom = '1px dotted #eee';

}

// Reset app to deault state 

function resetApp() {
    body.style.backgroundColor = '#1badf8';
    body.style.color = '#2b2b2b';
    hexTextInput.style.borderBottom = '1px dotted #2b2b2b';
    rgbTextInput.style.borderBottom = '1px dotted #2b2b2b';
}