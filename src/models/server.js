const express = require('express');
const cors = require('cors');
const { sequelize } = require('../database/connection');
const { socketController } = require('../sockets/controller');


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8081;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server, {
            cors: {
                origin: '*'
            }
        });
        //middlewares
        this.middlewares();
        //routes
        this.routes();
        //Sockets
        //this.sockets();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        this.app.options('*', cors());
    }

    routes(){
        this.app.use('/api', require('../routes/auth'));
        this.app.use('/api', require('../routes/agendar_cita'));
    }
    sockets(){
        this.io.on('connection', socketController)
    }

    listen(){
        this.server.listen(this.port, ()=> {
            console.log('Server is running on port', this.port);
            
            //conection database
            sequelize.sync( { force: false }).then( ()=> {
                console.log('database connected');
                console.log('All models were synchronized succesfully');
            }).catch( ()=> {
                console.log('error connected database');
            })
        })
    }
}

module.exports = Server;