let i = 1;
setInterval(()=>{
    if(i === 5){
        console.log('종료');
        // 인수를 주지 않거나 0을 주면 정상 종료, 1을 주면 비정상 종료
        process.exit(0);
    }
    console.log(i);
    i += 1;
},1000);