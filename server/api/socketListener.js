export default function (io) {
  console.log('creating socket connections')
  io.on('connection', function (socket) {
    console.log('a user connected')

    socket.on('disconnect', function (){
      console.log('user disconnected')
    })
  })
}
