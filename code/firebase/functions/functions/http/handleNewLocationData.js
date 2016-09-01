var functions = require('firebase-functions');

module.exports = functions.cloud.http()
    .on('request', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Max-Age', '86400');
        if (req.method === 'OPTIONS') return res.send();
        if (req.method === 'POST') {

            console.log("GOT LOCATION", req);
            return res.send();

        }
    });