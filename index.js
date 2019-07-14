const express = require('express'),
http = require('http'),
app = express(),
server = http.createServer(app),
io = require('socket.io').listen(server);

const port = process.env.PORT || 8080;
app.get('/', (req, res) => {

res.send('Chat Server is running on port 8080')
});
io.on('connection', (socket) => {



console.log('user connected')

socket.on('join', function(userNickname) {

        console.log(userNickname +" : has joined the chat "  );

        socket.broadcast.emit('userjoinedthechat',userNickname +" : has joined the chat ");
    })


socket.on('messagedetection', (senderNickname,messageContent) => {

       //log the message in console 

       console.log(senderNickname+" : " +messageContent)

      //create a message object 

      let  message = {"message":messageContent, "senderNickname":senderNickname}

       // send the message to all users including the sender  using io.emit() 

      io.emit('message', message )

      })

socket.on('disconnect', function(userNickname) {

        console.log(userNickname +' has left ')

        socket.broadcast.emit( "userdisconnect" ,' user has left')




    })




})






server.listen(port,()=>{

console.log('Node app is running on port ' + port)

})
