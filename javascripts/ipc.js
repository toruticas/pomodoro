const { ipcRenderer } = require('electron')

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})

// ipcRenderer.send('asynchronous-message', 'ping')

module.exports = {
  sendTime: function(time) {
    ipcRenderer.send('asynchronous-message', `time#${time}`)
  }
}
