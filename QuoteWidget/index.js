let request = require('request');

request("https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand", function(err, res, body) {
    let bodyJson = JSON.parse(body);
    let randomQuote = bodyJson[0]["content"].rendered;
    document.getElementById("quote").innerHTML = randomQuote;
});

setInterval(function(){
    request("https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand", function(err, res, body) {
        let bodyJson = JSON.parse(body);
        let randomQuote = bodyJson[Math.random(0, 50)]["content"].rendered;
        document.getElementById("quote").innerHTML = randomQuote;
    });
}, 5000);