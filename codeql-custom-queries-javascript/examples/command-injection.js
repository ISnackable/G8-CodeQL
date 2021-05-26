"use strict";

const express = require('express');
const { exec } = require("child_process");
const app = express();

app.post("/ping/:input", (req, res) => {
    var input = req.params.input;

    if (input) {
        exec(`ping ${input}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                res.status(200).send(error.message);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                res.status(200).send(stderr);
                return;
            }
            console.log(`stdout: ${stdout}`);
            res.status(200).send(stdout);
        });
        return;
    }
    return res.status(400).send("bad");
});

function startServer() {
    try {
        app.listen(3000, "localhost", () => {
            console.log(`Server started and accessible via http://localhost:3000/`);
        });
    }
    catch(err) {
        console.log(err);
    }
}

startServer();