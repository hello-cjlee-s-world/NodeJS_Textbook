// 순환참조 된 객체는 빈 객체로 표시됨 순환참조되지 않도록 구조를 잘 잡는것이 중요
const dep1 = require('./dep1');
const dep2 = require('./dep2');
dep1();
dep2();