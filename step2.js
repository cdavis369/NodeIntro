const axios = require('axios');
const cat = require('./step1');

async function webCat(args) {
    const arg = args[2];
    const type = arg.substring(arg.length - 3);
    if (type == 'txt') {
        cat(arg);
    }
    else {
        console.log("IN ELSE");
        try {
            const response = await axios.get(arg, {responseType: 'html'});
            console.log(response.data);
        } catch (error) {
            console.log(error.cause);
            process.exit(1);
        }
    }
}

module.export = webCat;