const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const request = require("request");



const deleteFile = (filename) => {
    fs.unlink(filename, function (err) {
        if (err) {
            console.log("SORRY NOT DELETED")
        };
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    });
}

const execute = require('../utils/compile');
router.post('/', (req, res) => {
    // const url = "https://api.jdoodle.com/v1/execute";

    console.log(req.body)
    const code = req.body.code
    const input = req.body.input
    const lang = req.body.lang

    // const program = {
    //     script: req.body.code,
    //     stdin: req.body.input,
    //     language: req.body.lang,
    //     versionIndex: "0",
    //     clientId: "5ce99d471629ae027355c445ccd8bb8f",
    //     clientSecret: "fef64ae65a4b1a6b9234e10b18f7ef88119b5874bcf00f409bbdc973d7d0a073",
    // };
    // request(
    //     {
    //         url: url,
    //         method: "POST",
    //         json: program,
    //     },
    //     function (error, response, body) {
    //         res.json(body);
    //         console.log("error:", error);
    //         console.log("statusCode:", response && response.statusCode);
    //         console.log("body:", body);
    //     }
    // );

    // return;


    switch (lang) {
        case "cpp":
            return execute.cPlusPlusExecute(code, input)
                .then(data => {
                    console.log("SUCCESSFULL PROMISE " + data)
                    console.log("SENDING " + data)
                    res.json(data)
                    deleteFile('./input.txt')
                    deleteFile('./test.cpp')
                    deleteFile('./a.exe')
                })
                .catch(err => {
                    console.log("ERROR PROMISE " + err)
                    deleteFile('./input.txt')
                    deleteFile('./test.cpp')
                    deleteFile('./a.exe')
                })
        case "python": return execute.pythonExecute(code, input)
            .then(data => {
                console.log("SUCCESSFULL PROMISE " + data)
                console.log("SENDING " + data)
                res.json(data)
                deleteFile('./input.txt')
                deleteFile('./test.py')
            })
            .catch(err => {
                console.log("ERROR PROMISE " + err)
                deleteFile('./input.txt')
                deleteFile('./test.py')
            })
    }

})


module.exports = router