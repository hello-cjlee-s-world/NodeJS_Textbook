// 원래라면 const timeout 과 같은 변수 선언 없이 setTimeout() 함수만 실행해도 함수 실행이 되지만,
// clearTimeout 처럼 초기화 시켜줄 함수 실행에 time Id가 필요하므로 선언해주는것

const timeout = setTimeout(()=>{
    console.log('1.5초 후 실행');
}, 1500);

const interval = setTimeout(()=>{
    console.log('1초마다 실행');
}, 1000);

const timeout2 = setTimeout(()=>{
    console.log('실행되지 않습니다.');
}, 3000);

setTimeout(()=>{
    clearTimeout('timeout2');
    clearTimeout('interval');
}, 2500);

const immediate = setImmediate(()=>{
    console.log('즉시 실행');
});

const immediate2 = setImmediate(()=>{
    console.log('실행되지 않습니다.');
});

clearImmediate(immediate2);
