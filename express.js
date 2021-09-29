const express = require('express')
var CryptoJS = require("crypto-js")
const { response } = require('express')
const app = express()
const port = 9010

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/callback', (req, res) => {
    res.append('Content-Type', 'application/json; charset=UTF-8');
    res.send(req.query);
  })
app.get('/generate_verifier', (req, res) => {
    var verifier = CryptoJS.lib.WordArray.random(60).toString()
    res.send({
        "code_verifier" : verifier,
        "code_challenge" : generateCodeChallenge(verifier)
    });
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function generateCodeChallenge(code_verifier) {
    return  base64URL(CryptoJS.SHA256(code_verifier))
  }
  function base64URL(string) {
    return string.toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  }