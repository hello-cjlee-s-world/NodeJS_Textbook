console.log(this);
console.log(this == module.exports);
console.log(this == exports);
function whatIsthis (){
    console.log('function', this == exports, this == global);
}
whatIsthis();