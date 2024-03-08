const fs = require('fs').promises;

setInterval(() => {
    fs.unlink('asdf.txt')
        .catch((err) => {
            console.error(err);
        })
}, 1000);
