const fs = require('fs');
const args = process.argv;

function cat(file) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log(data);
    });
}



module.exports = cat;
