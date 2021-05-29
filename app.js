
const Logger = require('./logger.js');
const os = require('os');
const fs = require('fs');
const EventEmitter = require('events');

const logger = new Logger();

const http = require('http');


//EVENTS
//Emitter -> we take the events and combine it with the logger.js to make a class that extends the emitter class so instead of using a regular new instance of the class that would not be able to be used
// we now use the same instance of the logger method so we can get rid of the (emitter) because we dont need that new insntace.

//REgister a Listener
logger.on('messageLogged',(e) => {
    console.log('Listener Called', e);
});

// making a noise, produce -- signalling that an event has happend
logger.log("hello");
//Raise: Logging (data:message)




//HTTP --> Module
const server = http.createServer((req,res) => {
    if(req.url === '/') {
        res.write("Hello World");
        res.end();
    }

    if(req.url === '/api/courses'){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }

});



// this is an event emitter
//const server = http.createServer();
server.listen(3001);
console.log('Listening on port 3001...');













//FILES
// sync
const files = fs.readdirSync('./');
console.log(files);

// async --- this is better due to node using a single thread.
fs.readdir('./',function(err,files) {
    if (err) console.log("Error", err);
    else console.log('Result', files);

});




// OS
var totalMemory = os.totalmem();
var freeMemory = os.freemem();

//console.log("Total Mem: " + totalMemory);

console.log(`Total Mem:  ${totalMemory}` );
console.log(`Free Mem:  ${freeMemory}` );

