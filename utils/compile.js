const fs = require('fs')
const { exec } = require('child_process');
const path = require('path');


const saveFile = (name, data) => {
    return new Promise((resolve, reject) => {
        // Saving File
        console.log("SAVING FILES")
        fs.writeFile(name, data, function (err) {
            if (err) {
                console.log(err);
                reject()
            } else {
                console.log("The file was saved!");
                resolve()
            }
        });
    })
}


// Function for executing C++ codes
const cPlusPlusExecute = (data, input) => {
    const res = {
        err: false,
        msg: ""
    }
    return new Promise((resolve, reject) => {
        const fileName = "test.cpp"
        saveFile(fileName, data)
            .then(() => {
                // Create Input file
                fs.writeFile("input.txt", input, function (err) {
                    if (err) {
                        console.log(err);
                        reject()
                    }
                });

                // FILE SAVED SUCCESSFULLY
                // Generate the output file for it
                const filePath = path.join(__dirname, "../test.cpp")
                console.log("FILE PATH >> " + filePath);

                // COMPILE THE C++ CODES
                exec('g++ ' + fileName, (err, stdout, stderr) => {
                    if (err) {
                        // IF COMPILATION ERROR
                        console.error(`exec error: ${err}`);
                        resolve({
                            err: true,
                            output: err,
                            error: stderr
                        })
                    }

                    // SUCCESSFULL COMPILATION EXECUTING
                    console.log("SUCCESSFULLY COMPILED")
                    exec('a.exe < ' + 'input.txt', (err, stdout, stderr) => {
                        if (err) {
                            console.log("ERROR " + err)
                            resolve({
                                err: true,
                                output: err,
                                error: stderr
                            })
                        }

                        console.log("OUTPUT ", stdout)
                        resolve({
                            err: false,
                            output: stdout
                        })
                    })
                })

            })
            .catch(() => {
                console.log("ERROR SAVE FILE" + saveFileRes)
                const err = {
                    err: true,
                    output: "Internal Server Error!"
                }
                resolve(err)
            })
    })
}


// Function for execuing python code
const pythonExecute = (data, input) => {
    const res = {
        err: false,
        msg: ""
    }
    return new Promise((resolve, reject) => {
        const fileName = "test.py"
        saveFile(fileName, data)
            .then(() => {
                // Create Input file
                fs.writeFile("input.txt", input, function (err) {
                    if (err) {
                        console.log(err);
                        reject()
                    }
                });

                // FILE SAVED SUCCESSFULLY
                // Generate the output file for it
                const filePath = path.join(__dirname, "../test.py")
                console.log("FILE PATH >> " + filePath);
                const inputPath = path.join(__dirname, "../input.txt")
                // COMPILE THE C++ CODES
                exec('python ' + fileName + " < " + "input.txt", (err, stdout, stderr) => {
                    if (err) {
                        // IF COMPILATION ERROR
                        console.error(`exec error: ${err}`);
                        resolve({
                            err: true,
                            output: err,
                            error: stderr
                        })
                    }
                    resolve({
                        err: false,
                        output: stdout
                    })
                })

            })
            .catch(() => {
                console.log("ERROR SAVE FILE" + saveFileRes)
                const err = {
                    err: true,
                    output: "Internal Server Error!"
                }
                resolve(err)
            })
    })
}

module.exports = {
    cPlusPlusExecute,
    pythonExecute
}