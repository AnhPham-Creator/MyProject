const { app, BrowserWindow } = require('electron')

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/notesapp', {useNewUrlParser: true, useUnifiedTopology: true});

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log('connect success!');
// });

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
   // On macOS it is common for applications and their menu bar
   // to stay active until the user quits explicitly with Cmd + Q
   if (process.platform !== 'darwin') {
     app.quit()
   }
 })
 
//  app.on('activate', () => {
//    // On macOS it's common to re-create a window in the app when the
//    // dock icon is clicked and there are no other windows open.
//    if (BrowserWindow.getAllWindows().length === 0) {
//      createWindow()
//    }
//  })