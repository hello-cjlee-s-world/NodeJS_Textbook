'use strict';
// Promise is a JavaScript for asynchronous operation
// state : pending -> fulfilled(완벽하게 수행) or rejected(문제 생김)
// Producer vs Consumer

// 1. Producer    promise를 선언하는 순간 바로 작업이 실행됨
const promise = new Promise((resolve, reject) => {
    // doing some heavy work (network, read files) 비동기로 처리하는것이 좋음
    console.log("doing something .. ");
    setTimeout(()=>{
        resolve('ellie');
        //reject(new Error('no network'));
    },2000);
});

// 2 Consumer : then, catch, finally
//      위 프로미스에서 resolve에 담아진 ellie 라는 값이 value에 들어감 
promise
    .then( value =>{
    console.log(value);
    })
    // then 이후 다시 promise를 리턴하기 때문에 .catch를 할 수 있는것
//    promise.then( value =>{console.log(value);}).catch(error => {console.log(error);});
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        console.log('finally');
    });

// 3. Promise Chaning
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

fetchNumber
    .then(num=>num*2)
    .then(num=>num*3)
    .then(num=>{
        return new Promise((resolve,reject)=>{
            setTimeout(()=>resolve(num - 1), 1000);
        });
    })
    .then(num=>console.log(num));


