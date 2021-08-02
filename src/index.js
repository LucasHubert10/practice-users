const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

var newUserID = 1000;
var usersDB = {};

app.post('/users', (req, res) =>{
    // Create new user
    var newUser = {
        id: newUserID,
        nickname: req.body.nickname
    }

    // Persist user
    usersDB[newUserID] = newUser

    // Change unique ID
    newUserID++
    console.log(req.body);
    res.send(newUser)
})

app.get('/users/:id', (req, res) => {
    var user = usersDB[req.params.id]

    res.send(user)
})

app.put('/users/:id', (req, res) =>{
    var updatedUser = usersDB[req.params.id];
    updatedUser.nickname = req.body.nickname;
    usersDB[req.params.id] = updatedUser
    res.send(updatedUser)
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})