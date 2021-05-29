const EventEmitter = require('events');




var url = 'http://mylogger.io/log';


class Logger extends EventEmitter {
    
    log(message){
        //Send HTTP request
        console.log(message)
    
        //raise event
        this.emit('messageLogged', { id: 2, url: 'This message was logged'});
    }

}



module.exports = Logger;
