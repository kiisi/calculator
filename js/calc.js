function convertToInt(i){
    let num = parseInt(i);
    return num
}



function calculator(number){
    let opera = ['+','−']
    let operations = ['x', '−', '+', '÷']
    let subOperations = ['x','÷']   


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
    let filterSignArray = []

    for(let i = 0; i < sepArray.length; i++){
        if(typeof(sepArray[i]) === 'number'){
            if(opera.includes(sepArray[i - 1])){
                if(sepArray[i - 1] === '−'){
                    let num = -1 * sepArray[i]
                    filterSignArray.push(num)
                }
                if(sepArray[i - 1] === '+'){
                    filterSignArray.push(sepArray[i])
                }   
            }else{
                filterSignArray.push(sepArray[i])
            }
        }
        if(subOperations.includes(sepArray[i])){
            filterSignArray.push(sepArray[i])
        }
    }

    let output_calc = outputCalc(filterSignArray)
    return output_calc
}

function outputCalc(arr){
    let initValue = 0, prev, cur;

    for (let i = 0; i < arr.length; i++){
        if(typeof(arr[i]) === 'number'){
            if(arr[i] < 0){
                let num = -1 * arr[i];
                initValue -= num;
            }
            else{
                initValue += arr[i]
            }
        }
        else{
            if(arr[i] === 'x'){
                initValue *= arr[i + 1];
                i +=1;
            }
            else{
                initValue /= arr[i + 1];
                i +=1;
            }

        }
    }

    return initValue;
}


export default calculator