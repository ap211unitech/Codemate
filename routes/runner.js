const router = require('express').Router()
const request = require("request");

router.post('/', (req, res) => {
    const url = "https://api.jdoodle.com/v1/execute";

    const vIndex = {
        'cpp': '5',
        'python3': '4',
        'c': '5'
    }

    const program = {
        script: req.body.code,
        stdin: req.body.input,
        language: req.body.lang,
        versionIndex: vIndex[req.body.lang],
        clientId: "5ce99d471629ae027355c445ccd8bb8f",
        clientSecret: "fef64ae65a4b1a6b9234e10b18f7ef88119b5874bcf00f409bbdc973d7d0a073",
    };

    request(
        {
            url: url,
            method: "POST",
            json: program,
        },
        function (error, response, body) {
            res.json(body);
            console.log("error:", error);
            console.log("statusCode:", response && response.statusCode);
            console.log("body:", body);
        }
    );

})


module.exports = router