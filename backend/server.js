var express = require('express'); // remember to install these in the top directory to fill in 
var path = require('path');      // your package.json, as well as anything else you want to add
var app = express();
//app.use(express.static('../public/'));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/scripts', express.static(path.join(__dirname, '../node_modules/crypto-js/')));
//app.use('/scripts', express.static('../node_modules/crypto-js/'));
var database = require('./database.json');
var cryptoJS = require('crypto-js'); 
// Don't change anything above this line unless you know what it will do


app.get('/',function(req,res){
    // Right now this does nothing. To send the index file from the public directory follow the methods in the class example
    // You will need to add the path to the index file public/index.html since we have a slightly more complex set up now.
    res.sendFile('../public/index.html');

});

// You will need to add more routes than just '/' so that your website can talk to your webserver using the get XMLHttpRequests

app.get('/users/:username/password/:password',function(req,res){

    var user = req.params.username;
    var password = req.params.password;
    //console.log("Database.json content ");
    //console.log(database);
    console.log(__dirname); 
    var result = loginUser(user,password);
    var userMessage = '<h1> Sorry, we are unable to login. Please check your username and password and try again. Note: Username and password are case sensitive. Try Homework3 and 1234   </h1>';
    if (result ) {
        userMessage = '<h1> Hello '+user+'  You have been successfully logged in.</h1>';
    }
    res.send(userMessage);
});

var loginUser =  function (username, password) {
    
    var validUser = false;
    console.log(" Testing JSON  size : " + database.length );
    console.log(" Username from site : " + username + " ; " + password );
    var pwdPlaintext = decryptMsg(password); 
    console.log(" Decrypted pwd from site : " + pwdPlaintext);
        for(var i=0 ;  i< database.length;i++ ) { 
            if(username == database[i].username ) { 
                console.log(" Username Found : " + database[i].username );
                console.log(" Password Found : " + database[i].password );
                if(pwdPlaintext == database[i].password)  
            {                
                console.log(" Password : " + database[i].password );
                validUser = true;
                break;
            } 
        }
    }
    return validUser;
};

// Decrypt
var decryptMsg = function(pwdCipher) {
    var bytes  = cryptoJS.AES.decrypt(pwdCipher.toString(), '1.125');
    var pwdPlaintext = bytes.toString(cryptoJS.enc.Utf8);
    return pwdPlaintext;
}

app.listen(8080);
console.log("Running on port 8080");