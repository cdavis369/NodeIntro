const fs = require('fs');
const axios = require('axios');
const cat = require('./step1');
const webCat = require('./step2.js');
const args = process.argv;
let fileOrURL = "";



if (args[2] === '--out') {
    const path = args[3];
    fileOrURL = args[4];
    const type = fileOrURL.substring(fileOrURL.length - 3);
    if (type == 'txt') 
        catWrite(path, fileOrURL);
    else {
        webCatWrite(path, fileOrURL);
    }
}
else {
    fileOrURL = args[2];
    const type = fileOrURL.substring(fileOrURL.length - 3);
    if (type == 'txt')
        cat(fileOrURL);
    else
        webCat(fileOrURL);
}

function catWrite(path, filename) {
    fs.readFile(filename, 'utf8', function(error, data){
        if (error) {
            console.log(error.message);
            process.exit(1);
        }
        fs.appendFile(path, data, 'utf8', function(error, data) {
            if (error) {
                console.log(error.message);
                process.exit(1);
            }
            console.log(`no output, but ${path} contains contents of ${filename}`);
        });
    });

}

async function webCatWrite(path, URL) {
    try {
        const response = await axios.get(URL, {responseType: 'html'});
        fs.appendFile(path, response.data, 'utf8', function(error, data) {
            if (error) {
                console.log(error.message);
                process.exit(1);
            }
            console.log(`no output, but ${path} contains contents of ${URL}`);
        });
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }

}
