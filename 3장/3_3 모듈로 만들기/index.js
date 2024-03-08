const { odd, even } = require('./var');
const checknumber = require('./func');
function checkStringOddOrEven(str){
    if(str.length % 2) { // 홀수면
        return odd;
    } 
    return even;
}
console.log(checknumber(10));
console.log(checkStringOddOrEven('hello'));