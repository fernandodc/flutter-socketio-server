const socketio=require('socket.io');
const Band = require('../models/band');
const Bands=require('../models/bands')

const bands=new Bands();
bands.addBand(new Band('Metallica'))
bands.addBand(new Band('Black Sabbath'))
bands.addBand(new Band('Kiss'))
bands.addBand(new Band('Iron Maiden'))
console.log(bands)

function configSocketio (httpServer){
    const io=socketio(httpServer);
    io.on('connection', client => {

        console.log('conectado!');
        client.emit('active-bands',bands.getBands());
        client.on('mensaje',(v)=>{
            console.log('se recibio::',v)
        })
         client.on('disconnect', () => { console.log('desconectado') });
        client.on('vote-band',(payload)=>{
            bands.voteBand(payload.id);
            io.emit('active-bands',bands.getBands());
        })

        client.on('add-band',(payload)=>{
            
            bands.addBand(new Band(payload.name));
             io.emit('active-bands',bands.getBands());
        })
        
        client.on('delete-band',(payload)=>{
            bands.deleteBand(payload.id);
            io.emit('active-bands',bands.getBands());
        })


       });
    
}

module.exports=configSocketio;


