// Use this file to add all of the functionality to the website including the XMLHttpRequests. 
// You may use the class examples for references as the XMLHttpRequests always follow the same pattern for the kind of
// work we will be using them for. Remeber google is your friend!

var httpGet = function(theUrl)
{
    console.log(theUrl);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        console.log(xmlHttp.responseText);
        document.getElementById('user').innerHTML=xmlHttp.responseText;
    }
    xmlHttp.open("GET", theUrl, false); 
    xmlHttp.send();
}

var getUser = function(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if(username=="") {return};
    if(password =="") {return};
    var cipherText = encryptPassword(password);
    var theURL = '/users/' +username+ '/password/' + encodeURIComponent(cipherText) ; 
    console.log(theURL);

    httpGet(theURL);
};


// Encrypt
var encryptPassword = function(password) {
var ciphertext = CryptoJS.AES.encrypt(password, '1.125');
console.log("Ciphertext " + ciphertext);
return ciphertext;
}
