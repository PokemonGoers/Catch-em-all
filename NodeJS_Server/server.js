//Initialize nodejs modules
var express = require('express');
var http    = require('http');
//2 below for cookies
//var session = require('client-sessions');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path    = require('path');

var PokemonSite = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress;
        self.port = 8080;

        if (typeof self.ipaddress === "undefined") {
            self.ipaddress = "127.0.0.1";
        };
    };

    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           process.exit(1);
        }
        console.log('Stopping node.js server.');
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.app = express();
        self.app.use(bodyParser.json());
        /*elf.app.use(cookieParser());
        self.app.use(session({
            cookieName: 'cookie_session',
            secret: 'pleaseTakeABetterSecretThanThisIfUser',
            //60min
            duration: 60 * 60 * 1000,
            activeDuration: 1000 * 60 * 5,
            httpOnly: true,
            secure: true,
            ephemeral: true
        }));*/

        //Here sample route, Improvement: external file
        self.app.get('/', function(req,res){
            res.redirect("index.html");
        });

        //Set access to every route to /public
        self.app.use(express.static(__dirname + '/public'));
    };

    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.setupTerminationHandlers();
        // Create the express server and routes.
        self.initializeServer();
    };
	
    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('Node server started on %s:%d ...', self.ipaddress, self.port);
        });
    };

}; 

/**
 *  main():  Main code.
 */
var zapp = new PokemonSite();
zapp.initialize();
zapp.start();