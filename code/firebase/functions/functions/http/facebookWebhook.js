var functions = require('firebase-functions');
var firebase = require('firebase');

var axios = require('axios');

function getWithServiceAccount() {
    let app;
    try {
        app = firebase.app('WITH_SERVICE_ACCOUNT');
    } catch (e) {
        var serviceAccount = {
            "type": "service_account",
            "project_id": "nod-portal",
            "private_key_id": "32ffc4be962e2694d44763f3bdbe637c62af802e",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2h8BGspcQ1yhx\n5d0GqgvV5yo/gva2VK7Ipa72arFg3meKEZAHOw8RW0tw4lpl/0TCqCVWP4Dq46RI\n9Yv8NaPbPHPt3MQqhMvBWGKz+DOJRGGFL4QPNldmK1vNFw1GdzmWAORcja0zjLAQ\nvKw3ZRZNPbx7lvqRCQMBteTeCNH9fQdx//YMCeDObv/Sr3It16EdhcBGsGqzogZV\n+/rv6YWRu80RYpipZOgC6YTTU5/rOW883J5e/CpaIPM8Np2UokYszFARGh7mOoQ7\nsauIiJyi0XM/QfSo99Bz+zk+n8+NI3mURElFEg+CimlhdOCnEyNgJsRbMB1yKYbt\nd+sNDT1LAgMBAAECggEADxe8e1wLB7ZyvrA+DW4EGoTJxoSit8LazPZ+OBvsXNEn\nCJCZMy/b+BhvbX8Z8HMiEWJr6+zGUSXPkMTU9V7OFLOz9kgZ5FYkrvELAEyWnlQM\nKEIcjlF0+pq9NYEhdOEo3tFmEI0adDe+2zNungn6xRpEuodqYpG3MO4EZaOfEXGg\nNUdNENDVaa3f5afUfcjuPfAXJaYTmMbnlvlrwcKmtxRhIYxFh7bcvUX5cAo7n4wo\nL4Tlw3PheJt1SYOUlK+/VN9ghf1Dw5eSfNf+HAo7237Z2PQoaHgmPUrbypTCno1k\nfq+6MUhzSG96rHAmVLJ57r3jVcC9YG3nT2/qaNirMQKBgQDw/BjluWNczlMbpanS\nuhBH7v2vaqW4D5b3uo93XZ8AgEj7q1FAFKJ0Q4WQ09AJgeGamdmqJtGJlvZYmwH2\n4KJudb8asoPRtczXE//vdZqhyHmdXVhrxuIqNmP1lii7kKyx7+LDUOzDGYovsFK0\nJ4lox/pMZAB1VYmbHgf97WO1swKBgQDB50HkbiZK0Hnr2ePu1e0Lqkmn/xWNO5G5\nb93z5wXC62o1yice2l/itfSqocF9SiCGFwgvNQSmUFORLss0UdESsKP7z/nZsPSw\nHJHldKfIyj9lRMmtUt7E1P6HkfPJDAF6Tfdgxj5/oAA4X4JSD+qLJ2re37Qpf1h1\nH9S/Bwu+CQKBgGvVgxaY5HuM3+eJM/rVw59MtDwgjtNUNovX8YbKX/ILdZ0YRh1U\nnnVEGap6/aajdd6GZb4b7LuSz91KT5C3aDfhfIhnxVC791Nu4aG3kGBAoxrlwEFK\nF74n5IbqkION85kT7PbVaXzMGufIENoIrxYyFjDEtufKRO8iexUHewy9AoGBAIan\nGKwQDglwQuqVEmM+LfIm3CWMz6OXVXgoBkMlEGwu3T/jVU1oqqOeZfzEfcCK5JEZ\nl3Zo5AS2zYGJtFVt57mJ7yakY8ZXy2QtQufMHeQjBulFXqQ9YzPfEa6FnXzlGHWd\nhQewQ6CPNPfw42gnY2IlCmMhiFQ0+fHEHBJYS0A5AoGAEchXbN+r5ya+LaR8h+TS\nkYMxwhjDkMTj8z7jgDIayGOdZIf63J+fPnLIzaviR1uzvT2VNH1sQAy9E+ruXpZl\n/e+Lzf8gcqVfrNGENgvunVirpYCitba0cJIIbsejFfL6Fkq7GqatRWYqfeeRt1j8\nZuKZjhyG6x/25Y6DB/3j09o=\n-----END PRIVATE KEY-----\n",
            "client_email": "nod-portal@appspot.gserviceaccount.com",
            "client_id": "108701213721258374214",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://accounts.google.com/o/oauth2/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/nod-portal%40appspot.gserviceaccount.com"
        };
        app = firebase.initializeApp({
            serviceAccount: serviceAccount,
        }, 'WITH_SERVICE_ACCOUNT');
    }
    return app;
}

exports.recieveBulutfonEvent = functions.cloud.http()
    .on('request', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Max-Age', '86400');
        if (req.method === 'OPTIONS') return res.send();

        if (!req.body.event_type) return res.send();

        var db = functions.app.database();

        var ref = db.ref("bulutfon-events/" + req.body.event_type);
        ref.push(req.body);

        res.send(200);

    });

exports.yandexTokenExchange = functions.cloud.http()
    .on('request', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Max-Age', '86400');
        if (req.method === 'OPTIONS') return res.send();

        axios.get('https://login.yandex.ru/info?format=json&oauth_token=' + req.body.access_token)
            .then(function (response) {

                var data = response.data;

                if (!(data.default_email.includes('@nod.com.tr') || data.default_email.includes('@partner.nod.com.tr'))) {
                    res.status(403).json({
                        error: "INVALID_EMAIL",
                    });
                    return;
                }

                var uid = 'yandex' + data.id;
                var appWithServiceAccount = getWithServiceAccount();

                var token = appWithServiceAccount.auth().createCustomToken(uid);

                var db = functions.app.database();

                var ref = db.ref("users/" + uid + "/info");
                ref.update(data);

                var refForToken = db.ref("users/" + uid + "/tokens/yandex");
                refForToken.set(req.body.access_token);

                res.json({
                    token: token
                });

            })
            .catch(function (error) {
                console.log("YANDEX LOGIN ERROR", error);
                res.status(401).json({
                    error: 'UNKNOWN',
                });
            });

    });