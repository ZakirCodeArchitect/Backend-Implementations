const http = require('http')
const url = require('url')
const dotenv = require('dotenv').config();
const fs = require('fs')


let serialNumber = 1;

const hostname = '127.0.0.1'
const PORT = process.env.PORT || 3001;

const fileName = "log.txt";

// log request to be stored in the log.txt whenever the url is visited
const log = (reqUrl, queryParams) => {
    const date = new Date();
    const content = `${serialNumber++}. Date: ${date.toISOString()} | URL: ${reqUrl} | Query Params: ${Object.keys(queryParams).length}\n`;
            
    fs.appendFile(fileName, content, (err) =>{
    if(err)
    {
        console.log(err)
    }
})

}

// appending file with Data from the query parameter
const StoreData = (fileName, content) => {
    fs.appendFile(fileName, content, (err) => {
        if(err)
        {
            console.log(err)
        }
    })
}


http.createServer((req, res) => {
    let reUrl = req.url;
    const parsedUrl = url.parse(req.url, true)
    const pathname = parsedUrl.pathname;
    const queryParams = parsedUrl.query;

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    
    switch (pathname) {
        case '/':
            log(reUrl,queryParams);
            res.end("Home Page")
            break;  

        case '/users':
            
            log(reUrl,queryParams);
            if(queryParams.id && queryParams.name && queryParams.age && queryParams.city && queryParams.uni )
                {
                    const user = `ID: ${queryParams.id}, Name: ${queryParams.name}, Age: ${queryParams.age}, City: ${queryParams.city},  University: ${queryParams.uni} \n`
                    StoreData('users.txt', user);
                    res.statusCode = 200
                    res.end(` ID: ${queryParams.id}\n Name: ${queryParams.name}\n Age: ${queryParams.age}\n City: ${queryParams.city}\n University: ${queryParams.uni} \n`); 
            
                }else{
                    res.statusCode = 400;
                    res.end("Something went Wrong with Product information")
                }
            break;

        case '/products':  
            log(reUrl,queryParams);
                if(queryParams.id && queryParams.title && queryParams.price)
                {
                    const productData = `ID: ${queryParams.id}, Title: ${queryParams.title}, Price: ${queryParams.price} \n`
                    StoreData('products.txt', productData);
                    res.statusCode = 200;
                    res.end(` ID: ${queryParams.id}\n Title: ${queryParams.title}\n Price: ${queryParams.price} \n`)
                }else{
                    res.statusCode = 400;
                    res.end("Something went Wrong with Product information")
                }
            break;

        case '/display':
            log(reUrl,queryParams);
            break;

        case '/books':
            log(reUrl,queryParams);
            if(queryParams.id && queryParams.title && queryParams.edition && queryParams.press)
                {
                    const user = ` ID: ${queryParams.id}\n Title: ${queryParams.title}\n Edition: ${queryParams.edition}\n PressName: ${queryParams.press} \n`
                    StoreData('books.txt', user);
                    res.statusCode = 200;
                    res.end(`ID: ${queryParams.id}, Title: ${queryParams.title}, Edition: ${queryParams.edition}, PressName: ${queryParams.press} \n`)
                }else{
                    res.statusCode = 400;
                    res.end("Something went Wrong with Product information")
                }
            break;

        default:
            break;
    }

}).listen(PORT, hostname, () => {
    console.log(`Server Started on Port : ${PORT}`)
})