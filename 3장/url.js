const url = require('url');

// url 안에 URL 생성자가 있따. 이생성자에 주소를 넣어 객체로 만들면 주소가 부분별로 정리된다.{ URL }
// 이 방식이 WHATWG의 url이다.
const { URL } = url;

const myURL = new URL('http://www.gilbut.co.kr/book/booklist.aspx?sercate1=001001000#');
console.log('new URL() : ', myURL);
console.log('url.format() : ', url.format(myURL));
console.log('-----------------------------------');
const parsedUrl = url.parse('http://www.gilbut.co.kr/book/booklist.aspx?sercate1=001001000#anchor')
console.log('url.parse() : ', parsedUrl);
// host 부분('www.gilbut.co.kr') 없이 pathname('/book/booklist.aspx') 만 오는 경우 WHATWG 방식이 처리할 수 없다.
console.log('url.format() : ', url.format(parsedUrl));