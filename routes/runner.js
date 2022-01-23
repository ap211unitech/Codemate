const router = require('express').Router()
const fs = require('fs')
const path = require('path')


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
    console.log(req.body)
    const code = req.body.code
    const input = req.body.input
    const lang = req.body.lang
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