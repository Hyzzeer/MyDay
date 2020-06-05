const request = require('request');
const queryString = require('querystring');

let date = new Date();
date.setMonth(2);
date.setUTCHours(-4);

    function getKrakenPrice(coinName, fiatName, callback){

        let apiParams = queryString.stringify({
            pair: coinName + fiatName,
            interval: 240,
            since: date.getTime()/1000
        });

        let apiUrl = "https://api.kraken.com/0/public/OHLC?" + apiParams;

        var req = request({
            url: apiUrl,
            json: true
        }, function(error, repsonse, resp) {
            if(!error && response.statusCode === 200){
                let apiResponseString = "X" + coinName.toUpperCase() + "Z" + fiatName.toUpperCase();

                callback(resp.result[apiResponseString]);
            }
        })
    }

module.exports = {
        
}