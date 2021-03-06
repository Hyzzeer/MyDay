const request = require('request');
const querystring = require('querystring');
const News = require("./models/News");
const fs = require('fs');

//////// WARNING : This is an asyc function working with callback ////////
// For more infos/understanding : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call

module.exports = {

    //Get headline news in France
    getNews: (callback) => {

        //Setting path of the config file to retrieve API tokens and keys
        let rawData = fs.readFileSync('./backend/config.json');
        let config = JSON.parse(rawData);

        //Setting parameters for the API call URL
        let apiParams = querystring.stringify({
            country: "fr",
            apiKey: config.news.key
        })

        //Final API call URL
        let apiUrl = "https://newsapi.org/v2/top-headlines?" + apiParams;

        //Making request with final URL
        let req = request({
                url: apiUrl,
                json: true
            }, function (error, response, resp) {
                if (!error && resp.status === "ok") {
                    result=[]
                    for(let i = 0; i < resp.articles.length; i++) {
                        result.push(new News({
                            source: resp.articles[i].source.name,
                            author: resp.articles[i].author,
                            title: resp.articles[i].title,
                            description: resp.articles[i].description,
                            content: resp.articles[i].content,
                            imageUrl:resp.articles[i].urlToImage,
                            articleUrl: resp.articles[i].url
                        }));
                    }
                    callback(result);
                }
            }
        );
    },
}