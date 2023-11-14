
const socketController = ( socket ) => {
    console.log('cliente conectado');
    
    //events

    socket.on('disconnect', ()=> {
        console.log('Cliente desconectado');
    });

    socket.on('enviar-mesaje', (payload)=> {
        
        socket.broadcast.emit('enviar-mensaje', payload);
    });
    socket.on('send-temperatura', (payload) => {
        console.log(payload);
    });
}

module.exports = {
    socketController
}