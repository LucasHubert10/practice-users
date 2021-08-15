const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

var newUserID = 1000
var usersDB = {}

app.post('/users', (req, res) =>{
    // Conditions data nickname
    if(!req.body || !req.body.nickname || typeof req.body.nickname != "string" || req.body.nickname.length === 0 ){
        res.sendStatus(400)
        return
    }

    // Create new user

    var existNickname = false;

    console.log("users database", usersDB)

    for (var userID in usersDB){
        let user = usersDB[userID]
       console.log(userID + "=" + user)

       if (user.nickname == req.body.nickname) {
           existNickname = true
           break
       }
    }

    if (existNickname) {
        res.status(400).json({"error": "Usuario ya existente"})
        return
    }

    var newUser = {
        id: newUserID,
        nickname: req.body.nickname
    }

    // Persist user
    usersDB[newUserID] = newUser
 
    // Change unique ID
    newUserID++
    res.status(201).json(newUser)
})

app.get('/users/:id', (req, res) => {
    // Condition data ID
    if(!req.params.id || req.params.id.length === 0){
        res.sendStatus(400)
        return
    }

    var user = usersDB[req.params.id]

    if(!user){
        res.sendStatus(404)
        return
    }

    res.send(user)
})

app.put('/users/:id', (req, res) =>{
    if(!req.params.id){
        res.sendStatus(400)
        return
    }

    var updatedUser = usersDB[req.params.id]
    if(!updatedUser){
        res.sendStatus(404)
        return
    }
    updatedUser.nickname = req.body.nickname
    usersDB[req.params.id] = updatedUser
    res.send(updatedUser)
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})