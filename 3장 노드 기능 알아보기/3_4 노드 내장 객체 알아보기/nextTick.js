setImmediate(()=>{
    console.log('immediate');
});
// process.nextTick은 다른 setImmediate나 setTimeout보다 먼저 실행된다.
process.nextTick(()=>{
    console.log('nextTick');
});
setTimeout(()=>{
    console.log('timeout');
}, 0);
// Promise도 다른 콜백들보다 우선시된다.
Promise.resolve().then(()=>console.log('promise'));