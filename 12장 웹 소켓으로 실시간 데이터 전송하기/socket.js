const socketIO = require('socket.io');

module.exports = (server) => {
    const io = socketIO(server, { path: '/socket.io' });

    io.on('connection', (socket) => { // 웹 소켓 연결 시
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속', ip, socket.id, req.ip);
        socket.on('disconnect', () => { // 연결 종료 시
            console.log('클라이언트 접속 해제', ip, socket.id);
            clearInterval(socket.interval); // clearInterval 안하면 메모리 누수 발생 가능성 있음
        });
        socket.on('error', (error) => { // 에러 시
            console.log(error);
        })
        socket.on('reply', (data) => { // 클라이언트로부터 메시지 수신 시
            console.log(data);
        })
        
        socket.interval = setInterval(() => { // 3초마다 클라이트트로 메시지 전송
            socket.emit('news', 'Hello Socket.IO');
        }, 3000);
    });
}