// UI Variables
let sun = document.querySelector('#sun'),
    moon = document.querySelector('#moon');

let calcContainer = document.querySelector('#calc-container'),
    aspectCheckContainer = document.querySelector('#aspect-check-container'),
    ratioSelector = document.querySelector('#ratio-select'),
    customRatioForm = document.querySelector('#custom-ratio-selector'),
    customWidthRatio = document.querySelector('#custom-width-ratio'),
    customHeightRatio = document.querySelector('#custom-height-ratio'),
    submit = document.querySelector('#submit'),
    reset = document.querySelector('#reset'),
    resultWidthCalculated = document.querySelector('#result-width-calculated'),
    resultHeightCalculated = document.querySelector('#result-height-calculated'),
    resultModel = document.querySelector('#result-model'),
    aspectRatio = document.querySelector('#aspect-ratio'),
    resultDisplayWidth = document.querySelector('#result-display-width'),
    resultDisplayHeight = document.querySelector('#result-display-height'),
    customHeight,
    customWidth;

let checkAspectWidth = document.querySelector('#check-aspect-width'),
    checkAspectHeight = document.querySelector('#check-aspect-height'),
    checkSquare = document.querySelector('#check-square'),
    checkDefault = document.querySelector('#check-default'),
    checkWide = document.querySelector('#check-wide'),
    checkUltraWide = document.querySelector('#check-ultrawide');
    
    
// Loading All Event Listeners
(function loadEventListeners(){
    sun.addEventListener('click', lightMode);
    moon.addEventListener('click', nightMode);
    customHeightRatio.addEventListener('keyup', clearOnNegative);
    customWidthRatio.addEventListener('keyup', clearOnNegative);
    checkAspectWidth.addEventListener('keyup', clearOnNegative);
    checkAspectHeight.addEventListener('keyup', clearOnNegative);
    ratioSelector.addEventListener('change', ratioChanged);
    submit.addEventListener('click', customRatioInitiator);
    reset.addEventListener('click', resetAll);
    submit.addEventListener('mouseenter', mouseEnter);
    reset.addEventListener('mouseenter', mouseEnter);
    submit.addEventListener('mouseleave', mouseLeave);
    reset.addEventListener('mouseleave', mouseLeave);
    resultWidthCalculated.addEventListener('keyup', calculateHeight);
    resultHeightCalculated.addEventListener('keyup', calculateWidth);
    checkAspectWidth.addEventListener('keyup', checkDimensionsAndRatio);
    checkAspectHeight.addEventListener('keyup', checkDimensionsAndRatio);
    resultModel.addEventListener('animationend', function(){
        resultModel.className = '';
    });
})();
    

// Event Listener Functions
function lightMode(){
    sun.style.display = 'none';
    moon.style.display = 'inline-block';
    light();
    let metaEle = document.head.querySelectorAll('meta');
    metaEle[3].content = '#bdd7ff';
    console.log('Switching to Light mode');
}

// Switches the UI to Night mode
function nightMode(){
    moon.style.display = 'none';
    sun.style.display = 'inline-block';
    night();
    let metaEle = document.head.querySelectorAll('meta');
    metaEle[3].content = '#01000c';
    console.log('Switching to Dark mode');
}


//////////////////////// ASPECT RATIO CALCULATOR////////////////////////
// Runs whenever an aspect ratio is changed from the 'Aspect Ratio Selector'. 
// This function Resets all the inputs, and stylizes the Aspect Ratio Preview.
function ratioChanged(){
    console.log('Aspect Ratio Changed to - ' + ratioSelector.value);
    if(ratioSelector.value === 'square'){
        resultModel.style.display = 'flex';
        customRatioForm.style.display = 'none';
        changeDisplayBox('1 : 1', '100', '100', '150px', '150px');
        resetInputs();
    }
    else if(ratioSelector.value === 'default'){
        resultModel.style.display = 'flex';
        customRatioForm.style.display = 'none';
        changeDisplayBox('4 : 3', '400', '300', '160px', '120px');
        resetInputs();
    }
    else if(ratioSelector.value === 'wide'){
        resultModel.style.display = 'flex';
        customRatioForm.style.display = 'none';
        changeDisplayBox('16 : 9', '1600', '900', '240px', '135px');
        resetInputs();
    }
    else if(ratioSelector.value === 'ultrawide'){
        resultModel.style.display = 'flex';
        customRatioForm.style.display = 'none';
        changeDisplayBox('21 : 9', '2100', '900', '315px', '135px');
        resetInputs();
    }
    else if(ratioSelector.value === 'custom'){
        resultModel.style.display = 'none';
        customRatioForm.style.display = 'block';
        customRatioForm.className = 'animated fadeIn';
        resetInputs();
    }
}

// This clears the inputs if a negative value is entered
function clearOnNegative(e){
    if(e.target.value <=0){
        e.target.value = '';
    }
}

// This runs whenever a user enters a Custom Aspect Ratio and submits.
// This function stylizes the Aspect Ratio Preview box according to the given Custom Aspect Ratio
function customRatioInitiator(){
    if(customWidthRatio.value === '' || customHeightRatio.value === ''){
        alert('Please enter both Custom Width and Custom Ratio.');
    }
    else if(customWidthRatio.value > 0 && customHeightRatio.value > 0) {
        let calcWidth, calcHeight;
        calcWidth = customWidthRatio.value*75;
        calcHeight = customHeightRatio.value*75;
        if(calcHeight >= 2250 || calcWidth >= 2250){
            calcHeight /= 23;
            calcWidth /= 23;
        }
        else if(calcHeight >= 2000 || calcWidth >= 2000){
            calcHeight /= 17;
            calcWidth /= 17;
        }
        else if(calcHeight >= 1750 || calcWidth >= 1750){
            calcHeight /= 15;
            calcWidth /= 15;
        }
        else if(calcHeight >= 1500 || calcWidth >= 1500){
            calcHeight /= 13;
            calcWidth /= 13;
        }
        else if(calcHeight >= 1250 || calcWidth >= 1250){
            calcHeight /= 10.25;
            calcWidth /= 10.25;
        }
        else if(calcHeight >= 1000 || calcWidth >= 1000){
            calcHeight /=8.5;
            calcWidth /= 8.5;
        }
        else if(calcHeight >= 750 || calcWidth >= 750){
            calcHeight /= 6.5;
            calcWidth /= 6.5; 
        }

        else if(calcHeight >= 500 || calcWidth >= 500){
            calcHeight /= 4;
            calcWidth /= 4;
        }
        else if(calcHeight >= 250 || calcWidth >= 250){
            calcHeight /= 3;
            calcWidth /= 3;
        }

        console.log(customWidthRatio.value + ' : ' + customHeightRatio.value);
        resultModel.style.display = 'flex';
        changeDisplayBox(customWidthRatio.value + ' : ' + customHeightRatio.value, customWidthRatio.value*100, customHeightRatio.value*100, calcWidth + 'px', calcHeight + 'px');
    }
}

// This function Resets all the inputs.
function resetAll(){
    if(resultModel.style.display === 'flex'){
        resultModel.style.display = 'none';
        resetInputs();
    }
    else{
        resetInputs();
    }
}

// This is the logic for resetting the inputs.
function resetInputs(){
    customWidthRatio.value = '';
    customHeightRatio.value = '';
    resultWidthCalculated.value = '';
    resultHeightCalculated.value = '';
}

// This is to change the opacity of the buttons upon hover.
function mouseEnter(e){
    e.target.style.opacity = '0.7';
};

// This is to change the opacity of the buttons upon moving the mouse pointer away after hovering.
function mouseLeave(e){
    e.target.style.opacity = '1';
};

// This function calculates the Height, when the Width is being provided by the user.
function calculateHeight(){
    if(resultWidthCalculated.value !== '' && resultWidthCalculated.value > 0 ){ //Ensures that the Width value is not supplied as empty
        if(ratioSelector.value === 'square'){
            resultHeightCalculated.value = parseFloat(resultWidthCalculated.value);
            resultDisplayWidth.textContent = parseFloat(resultWidthCalculated.value).toFixed(2);
            resultDisplayHeight.textContent = parseFloat(resultHeightCalculated.value).toFixed(2);
        }
        else if(ratioSelector.value === 'default'){
            resultHeightCalculated.value = parseFloat((3/4)*resultWidthCalculated.value);
            resultDisplayWidth.textContent = parseFloat(resultWidthCalculated.value).toFixed(2);
            resultDisplayHeight.textContent = parseFloat(resultHeightCalculated.value).toFixed(2);
        }
        else if(ratioSelector.value === 'wide'){
            resultHeightCalculated.value = parseFloat((9/16)*resultWidthCalculated.value);
            resultDisplayWidth.textContent = parseFloat(resultWidthCalculated.value).toFixed(2);
            resultDisplayHeight.textContent = parseFloat(resultHeightCalculated.value).toFixed(2);
        }
        else if(ratioSelector.value === 'ultrawide'){
            resultHeightCalculated.value = parseFloat((9/21)*resultWidthCalculated.value);
            resultDisplayWidth.textContent = parseFloat(resultWidthCalculated.value).toFixed(2);
            resultDisplayHeight.textContent = parseFloat(resultHeightCalculated.value).toFixed(2);
        }
        else if(ratioSelector.value === 'custom'){
            resultHeightCalculated.value = parseFloat((customHeightRatio.value/customWidthRatio.value)*resultWidthCalculated.value);
            resultDisplayWidth.textContent = parseFloat(resultWidthCalculated.value).toFixed(2);
            resultDisplayHeight.textContent = parseFloat(resultHeightCalculated.value).toFixed(2);
        }
    }
    else{ //This runs whenever we type-in the input and then clear it all, leaving the input empty.
        if(ratioSelector.value === 'square'){
            changeDisplayBox('1 : 1', '100', '100', '150px', '150px');
            resetInputs();
        }
        else if(ratioSelector.value === 'default'){
            changeDisplayBox('4 : 3', '400', '300', '160px', '120px');
            resetInputs();
        }
        else if(ratioSelector.value === 'wide'){
            changeDisplayBox('16 : 9', '1600', '900', '240px', '135px');
            resetInputs();
        }
        else if(ratioSelector.value === 'ultrawide'){
            changeDisplayBox('21 : 9', '2100', '900', '315px', '135px');
            resetInputs();
        }
        else if(ratioSelector.value === 'custom'){
            resultWidthCalculated.value = '';
            resultHeightCalculated.value = '';
            resultDisplayWidth.textContent = customWidthRatio.value*100;
            resultDisplayHeight.textContent = customHeightRatio.value*100;
        }  
    }
}


function calculateWidth(){
    if(resultHeightCalculated.value !== '' && resultHeightCalculated.value > 0){ //Ensures that the Height value is not supplied as empty
        if(ratioSelector.value === 'square'){
            resultWidthCalculated.value = parseFloat(resultHeightCalculated.value);
            resultDisplayWidth.textContent = parseFloat(resultWidthCalculated.value).toFixed(2);
            resultDisplayHeight.textContent = parseFloat(resultHeightCalculated.value).toFixed(2);
        }
        else if(ratioSelector.value === 'default'){
            resultWidthCalculated.value = parseFloat((4/3)*resultHeightCalculated.value);
            resultDisplayWidth.textContent = parseFloat(resultWidthCalculated.value).toFixed(2);
            resultDisplayHeight.textContent = parseFloat(resultHeightCalculated.value).toFixed(2);
        }
        else if(ratioSelector.value === 'wide'){
            resultWidthCalculated.value = parseFloat((16/9)*resultHeightCalculated.value);
            resultDisplayWidth.textContent = parseFloat(resultWidthCalculated.value).toFixed(2);
            resultDisplayHeight.textContent = parseFloat(resultHeightCalculated.value).toFixed(2);
        }
        else if(ratioSelector.value === 'ultrawide'){
            resultWidthCalculated.value = parseFloat((21/9)*resultHeightCalculated.value);
            resultDisplayWidth.textContent = parseFloat(resultWidthCalculated.value).toFixed(2);
            resultDisplayHeight.textContent = parseFloat(resultHeightCalculated.value).toFixed(2);
        }
        else if(ratioSelector.value === 'custom'){
            resultWidthCalculated.value = parseFloat((customWidthRatio.value/customHeightRatio.value)*resultHeightCalculated.value);
            resultDisplayWidth.textContent = parseFloat(resultWidthCalculated.value).toFixed(2);
            resultDisplayHeight.textContent = parseFloat(resultHeightCalculated.value).toFixed(2);
        }
    }
    else{ //This runs whenever we type-in the input and then clear it all, leaving the input empty.
        if(ratioSelector.value === 'square'){
            changeDisplayBox('1 : 1', '100', '100', '150px', '150px');
            resetInputs();
        }
        else if(ratioSelector.value === 'default'){
            changeDisplayBox('4 : 3', '400', '300', '160px', '120px');
            resetInputs();
        }
        else if(ratioSelector.value === 'wide'){
            changeDisplayBox('16 : 9', '1600', '900', '240px', '135px');
            resetInputs();
        }
        else if(ratioSelector.value === 'ultrawide'){
            changeDisplayBox('21 : 9', '2100', '900', '315px', '135px');
            resetInputs();
        }
        else if(ratioSelector.value === 'custom'){
            resultWidthCalculated.value = '';
            resultHeightCalculated.value = ''; 
            resultDisplayWidth.textContent = customWidthRatio.value*100;
            resultDisplayHeight.textContent = customHeightRatio.value*100;
        }  
    }
}

// This is the logic for stylizing the box
function changeDisplayBox(insideText, widthText, heightText, width, height){
    aspectRatio.textContent = insideText;
    resultDisplayWidth.textContent = widthText;
    resultDisplayHeight.textContent = heightText;
    resultModel.style.width = width;
    resultModel.style.height = height;
    resultModel.className = 'animated heartBeat';
}



//////////////////////// ASPECT RATIO CHECKER////////////////////////
//This is run when we enter dimensions into the CheckAspectWidth Box
function checkDimensionsAndRatio(){ 
    if(checkAspectWidth.value !== '' && checkAspectHeight.value !== ''){
        // For 1:1 Resolution
        if((parseFloat(checkAspectWidth.value)*(1)).toFixed(1) === parseFloat(checkAspectHeight.value).toFixed(1)){
            removeBordersAndClassNamesFromAspectRatios();
            makeAllCrossMarks();
            checkSquare.style.border = '2px solid green';
            checkSquare.children[0].className="fas fa-check fa-2x";
            console.log('The supplied Aspect Ratio is 1 : 1.');
        }
        // For 4:3 Resolution
        else if((parseFloat(checkAspectWidth.value)*(3/4)).toFixed(1) === parseFloat(checkAspectHeight.value).toFixed(1)){
            removeBordersAndClassNamesFromAspectRatios();
            makeAllCrossMarks();
            checkDefault.style.border = '2px solid green';
            checkDefault.children[0].className="fas fa-check fa-2x";
            console.log('The supplied Aspect Ratio is 4 : 3.');
        }
        // For 16:9 Resolution
        else if((parseFloat(checkAspectWidth.value)*(9/16)).toFixed(1) === parseFloat(checkAspectHeight.value).toFixed(1)){
            removeBordersAndClassNamesFromAspectRatios();
            makeAllCrossMarks();
            checkWide.style.border = '2px solid green';
            checkWide.children[0].className="fas fa-check fa-2x";
            console.log('The supplied Aspect Ratio is 16 : 9.');
        }
        // For 21:9 Resolution
        else if((parseFloat(checkAspectWidth.value)*(9/21)).toFixed(1) === parseFloat(checkAspectHeight.value).toFixed(1)){
            removeBordersAndClassNamesFromAspectRatios();
            makeAllCrossMarks();
            checkUltraWide.style.border = '2px solid green';
            checkUltraWide.children[0].className="fas fa-check fa-2x";
            console.log('The supplied Aspect Ratio is 21 : 9.');
        }
        else{
            removeBordersAndClassNamesFromAspectRatios();
            makeAllCrossMarks();
        }
    }
    else{
        removeBordersAndClassNamesFromAspectRatios();
        makeAllCrossMarks();
    }
}



// De-stylizes the Aspect Ratio Checked Results (i.e; Aspect Ratio is - )
function removeBordersAndClassNamesFromAspectRatios(){
    checkSquare.style.border = 'none';
    checkDefault.style.border = 'none';
    checkWide.style.border = 'none';
    checkUltraWide.style.border = 'none';
    
    checkSquare.className = '';
    checkDefault.className = '';
    checkWide.className = '';
    checkUltraWide.className = '';

}

// Replaces all the icons before the 'Aspect Ratio is-' text with 'X' icons.
function makeAllCrossMarks(){
    checkSquare.children[0].className="fas fa-times fa-2x";
    checkDefault.children[0].className="fas fa-times fa-2x";
    checkWide.children[0].className="fas fa-times fa-2x";
    checkUltraWide.children[0].className="fas fa-times fa-2x";
}

// Logic for stylizing the web-page according to Light Mode
function light(){
    console.log('Running Light mode');
    document.querySelector('html').style.color = '#333';

    //Styling Containers
    calcContainer.style.boxShadow = '0px 0px 58px -15px rgba(0,0,0,0.75)';
    aspectCheckContainer.style.boxShadow = '0px 0px 58px -15px rgba(0,0,0,0.75)';

    // Styling Buttons
    let buttons = document.querySelectorAll('.btn');
    buttons.forEach(function(item){
        item.style.backgroundColor = '#3d5a80';
    });

    // Styling Inputs
    let inputs = document.querySelectorAll('input');
    inputs.forEach(function(item){
        item.style.backgroundColor = '#fff';
        item.style.color = '#000';
        item.style.border = 'none';
    });
    document.querySelector('select').style.backgroundColor = '#fff';
    document.querySelector('select').style.color = '#000';
    document.querySelector('select').style.border = 'none';

    // Styling Background Color
    document.querySelector('#particles-js').style.backgroundColor = '#bdd7ff';

    // Styling Result Model
    document.querySelector('#result-model').style.backgroundColor = '#fff';
    document.querySelector('#result-model').style.color = '#000';
    document.querySelector('#result-model').style.border = '1px solid #000';
    document.querySelector('#result-model').style.boxShadow = '0px 0px 58px -15px rgba(0,0,0,0.75)';
};


// Logic for stylizing the web-page according to Night Mode
function night(){
    console.log('Running Night mode');
    document.querySelector('html').style.color = '#ccc';

    //Styling Containers
    calcContainer.style.boxShadow = '0px 0px 58px -15px rgba(14,140,180,0.5)';
    aspectCheckContainer.style.boxShadow = '0px 0px 58px -15px rgba(14,140,180,0.5)';

    // Styling Buttons
    let buttons = document.querySelectorAll('.btn');
    buttons.forEach(function(item){
        item.style.backgroundColor = '#293241';
    });
    
    // Styling Inputs
    let inputs = document.querySelectorAll('input');
    inputs.forEach(function(item){
        item.style.backgroundColor = '#161616';
        item.style.color = '#ccc';
        item.style.border = '1px solid #2e2e2e';
    });
    
    document.querySelector('select').style.backgroundColor = '#161616';
    document.querySelector('select').style.color = '#ccc';
    document.querySelector('select').style.border = '1px solid #2e2e2e';

    // Styling Background Color
    document.querySelector('#particles-js').style.backgroundColor = '#01000c';

    // Styling Result Model
    document.querySelector('#result-model').style.backgroundColor = '#02021b';
    document.querySelector('#result-model').style.color = '#eee';
    document.querySelector('#result-model').style.border = '1px solid #eee';
    document.querySelector('#result-model').style.boxShadow = '0px -1px 64px -2px rgba(51,51,51,1)';
};