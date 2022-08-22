import calculator from './calc.js';


let calculatorBoardCalc = document.querySelector(".calculator-display-calc input");
let calculatorBoardAns = document.querySelector(".calculator-display-ans");
let calculatorBoardBtn = document.querySelectorAll(".calculator-board-btn-display");
let btnClear = document.querySelector(".btn-clear");
let btnEqual = document.querySelector(".btn-equal");

btnClear.addEventListener('click',()=>{
    calculatorBoardCalc.value = '';
    calculatorBoardAns.innerText = ''
})

calculatorBoardBtn.forEach(btn =>{
    btn.addEventListener('click',(e)=>{
        calculatorBoardCalc.value += e.target.innerText
    })
})

btnEqual.addEventListener('click', ()=>{
    let input = calculatorBoardCalc.value
    let result = calc(input)
    try{
        let check = result.includes('Error')
        calculatorBoardCalc.value = result
         
    }
    catch(err){
        calculatorBoardAns.textContent = result
    }
});
function calc(input){
    let array = [];
    let operations = ['x', '−', '+', '÷']
    let subOperations = ['x','÷']

    for (let i = 0; i < input.length; i++){
        
        if((i === 0 && subOperations.includes(input.at(i)))){
            return "Syntax Error"
        }
        else if((i > 0 && subOperations.includes(input.at(i)) && subOperations.includes(input.at(i + 1)) && i < input.length)){
            return "Syntax Error"
        }
        else if((i === input.length - 1) && operations.includes(input.at(i)) 
        ){
            return "Syntax Error"
        }
        else if((operations.includes(input.at(i))) && subOperations.includes(input.at(i + 1))){
            return "Syntax Error"
        }
        array.push(input[i])
    }
    let mainArray = numbersArray(array)
    return mainArray;
}

function numbersArray(arr){
    let joinNum = arr.join('')
    let numArray = []
    let prev = 0;
    for(let i = 0; i < joinNum.length; i++){
        if(joinNum[i] == 'x' || joinNum[i] == '+' || joinNum[i] == '−' || joinNum[i] == '÷'){
            numArray.push(joinNum.slice(prev, i))
            numArray.push(joinNum[i])
            prev = i + 1
        }
        if(i === joinNum.length - 1){
            numArray.push(joinNum.slice(prev,joinNum.length))
        }
    }

    let refNumArray = refineNumArray(numArray)
    return refNumArray
}

function refineNumArray(arr){
    let refinedArray = arr.filter(e=> e !== '')
    return calculator(refinedArray)
}
