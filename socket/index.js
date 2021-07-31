const socketio=require('socket.io');

function configSocketio (httpServer){
    const io=socketio(httpServer);
    io.on('connection', client => {
        console.log('conectado!')
        client.on('mensaje',(v)=>{
            console.log('se recibio::',v)
        })
         client.on('disconnect', () => { console.log('desconectado') });
       });
    
}

module.exports=configSocketio;


