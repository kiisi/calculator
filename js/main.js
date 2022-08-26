import theme from './theme.js'

let calculatorBoardCalc = document.querySelector(".calculator-display-calc input");
let calculatorBoardAns = document.querySelector(".calculator-display-ans");
let calculatorBoardBtn = document.querySelectorAll(".calculator-board-btn-display");
let btnClear = document.querySelector(".btn-clear");
let btnEqual = document.querySelector(".btn-equal");
let calcClear = document.querySelector(".calculator-display-clear");



btnClear.addEventListener('click',()=>{
    calculatorBoardCalc.value = '';
    calculatorBoardAns.innerText = ''
    
    calcClear.classList.add("clear-effect")
    calcClear.addEventListener('animationend',()=>{
        calcClear.classList.remove("clear-effect")
    })
})

calculatorBoardBtn.forEach(btn =>{
    btn.addEventListener('click',(e)=>{
        if(calculatorBoardCalc.value == 'Syntax Error'){
            calculatorBoardCalc.value = ''
        }
        calculatorBoardCalc.value += e.target.innerText
    })
})

btnEqual.addEventListener('click', ()=>{
    let input = calculatorBoardCalc.value
    calculatorBoardCalc.value = '';

    let result = handleInputError(input)
    console.log(result)

    try{
        result.includes('Error')
        calculatorBoardCalc.value = result        
        calculatorBoardAns.innerHTML = `<div></div>`;
    }catch(err){
        calculatorBoardAns.innerHTML = `<div>${result}</div>`;
        let calculatorBoardAnsText = document.querySelector(".calculator-display-ans div");
        calculatorBoardAnsText.classList.add("c-ans-effect")
        calculatorBoardAnsText.addEventListener("animationend",()=>{
            calculatorBoardAnsText.classList.remove("c-ans-effect")
        })
    }
});

/* Handling Possible Errors In The Inputs */
function handleInputError(input){
    let operations = ['x', '−', '+', '÷'];
    let mdOperations = ['x','÷'];
    
    let arr = []
    for (let i = 0; i < input.length; i++){
        if((i === 0 && mdOperations.includes(input.at(i))) || (i === input.length - 1 && operations.includes(input.at(i))) ){
            return "Syntax Error - 1"
        }
        else if((i > 0 && mdOperations.includes(input.at(i)) && mdOperations.includes(input.at(i + 1)))){
            return "Syntax Error - 2"
        }
        else if((operations.includes(input.at(i))) && mdOperations.includes(input.at(i + 1))){
            return "Syntax Error - 3"
        }
        arr.push(input[i])
    }
    let numbers_array = numbersArray(arr);   
    return numbers_array;
}

/* Grouping the numbers */
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

    /* Removing spaces in the array */
    let spaceRemoval = numArray.filter(e => e !== '')

    let condenseSign = []
    let mpOperations = ['−', '+'];
    let num = 1;

    for(let i = 0; i < spaceRemoval.length; i++){
        if(mpOperations.includes(spaceRemoval[i])){
            if(spaceRemoval[i] == '−'){
                num *= -1
            }
            if(!mpOperations.includes(spaceRemoval[i + 1])){
                if(num < 0){
                    condenseSign.push('−')
                }else{
                    condenseSign.push('+')
                }
                num = 1
            }
        }else{
            condenseSign.push(spaceRemoval[i])
        }
    }


    
    let calc = calculator(condenseSign);
    return calc 
}

function calculator(number){
    

    let sepArray = []

    let initValue = 0;
    let sign = "+"

    for(let i = 0; i < number.length; i++){
        if(convertToInt(number[i])){
            sepArray.push(convertToInt(number[i]))
        }else{
            sepArray.push(number[i])
        }
    }

    let division_rule = divisionRule(sepArray)
    return division_rule
}




function divisionRule(arr){
    
    for(let i = 0; i < arr.length; i++){
        if(arr[i] == '÷'){
            let x = arr[i - 1]
            let y = arr[i + 1]
            let ans = x / y;
            arr[i] = ans
            arr.splice(i + 1, 1)
            arr.splice(i - 1, 1, '')            
        }
    }
    
    let division = arr.filter(e => e != '')

    let multiplication_rule = multiplicationRule(division)
    return multiplication_rule    
}

function multiplicationRule(arr){
    
    for(let i = 0; i < arr.length; i++){
        if(arr[i] == 'x'){
            let x = arr[i - 1]
            let y = arr[i + 1]
            let ans = x * y;
            arr[i] = ans
            arr.splice(i + 1, 1)
            arr.splice(i - 1, 1, '')            
        }
    }
    
    let multiplication = arr.filter(e => e != '')

    let add_sub = addSub(multiplication);
    return add_sub
}

function addSub(arr){
    let mpOperations = ['−', '+'];
    let noSigns = [];
    for (let i = 0; i < arr.length; i++){
        if(typeof(arr[i]) === 'number'){
            if(mpOperations.includes(arr[i - 1])){
                if(arr[i - 1] === '−'){
                    let num = -1 * arr[i]
                    noSigns.push(num)
                }
                if(arr[i - 1] === '+'){
                    noSigns.push(arr[i])
                }   
            }else{
                noSigns.push(arr[i])
            }
        }
    }

    let initValue = 0;
    for (let i = 0; i < noSigns.length; i++){
        if(noSigns[i] < 0){
            let num = -1 * noSigns[i];
            initValue -= num;
        }
        else{
            initValue += noSigns[i]
        }
        
    }

    return initValue
}

function convertToInt(i){
    let num = parseInt(i);
    return num
}
//Theme of the web app
theme()
