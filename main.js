const { app, BrowserWindow, Menu, ipcMain, Tray } = require('electron');
const path = require('path');
const url = require('url');

const iconPath = path.join(__dirname, 'icon.png');
const iconPathOriginal = path.join(__dirname, 'icon_original.png');
const iconPath100 = path.join(__dirname, 'icon_100.png');
const iconPath80 = path.join(__dirname, 'icon_80.png');
const iconPath60 = path.join(__dirname, 'icon_60.png');
const iconPath40 = path.join(__dirname, 'icon_40.png');
const iconPath20 = path.join(__dirname, 'icon_20.png');

let selectedIcon = iconPath;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win, tray, windowVisible = false;

function loadTray(updateIcon = false) {
  if (updateIcon) {
    tray.setImage(selectedIcon);
    return;
  }

  let contextMenu = Menu.buildFromTemplate([
    {
      label: win.isVisible() ? "Hide Pomodoro" : "Open Pomodoro",
      click: function() {
        console.log(win.isVisible());
        win.isVisible() ? win.hide() : win.show()
      },
    }, {
      label: 'Toggle DevTools',
      accelerator: 'Alt+Command+I',
      click: function() {
        win.show();
        win.toggleDevTools();
      },
    }, {
      label: 'Quit',
      accelerator: 'Command+Q',
      selector: 'terminate:',
      click: function() {
        app.quit();
      }
    }
  ]);

  if (!tray) {
    tray = new Tray(iconPath)
    tray.setToolTip('This is my application.');
  }

  tray.setContextMenu(contextMenu);
}

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 500,
    height: 500,
    icon: iconPathOriginal,
    // show: false,
  })

  windowVisible = false;

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Emitted when the window is closed.
  win.on('closed', (e) => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  win.on("minimize", (e) => {
    win.hide()
  })

  win.on("show", loadTray)
  win.on("hide", loadTray)
}

app.on('ready', function() {
  createWindow()
  loadTray()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('asynchronous-message', (event, arg) => {
  try {
    const seconds = parseInt(Number(arg.split("#")[1]) / 1000)

    if (seconds > 1200 && selectedIcon !== iconPath100) {
      selectedIcon = iconPath100
      loadTray(true)
    } else if (seconds <= 1200 && seconds > 900 && selectedIcon !== iconPath80) {
      selectedIcon = iconPath80
      loadTray(true)
    } else if (seconds <= 900 && seconds > 600 && selectedIcon !== iconPath60) {
      selectedIcon = iconPath60
      loadTray(true)
    } else if (seconds <= 600 && seconds > 300 && selectedIcon !== iconPath40) {
      selectedIcon = iconPath40
      loadTray(true)
    } else if (seconds <= 300 && seconds > 0 && selectedIcon !== iconPath20) {
      selectedIcon = iconPath20
      loadTray(true)
    } else if (seconds <= 0 && selectedIcon !== iconPath) {
      selectedIcon = iconPath
      loadTray(true)
    }
  } catch (e) {}

  // if (arg === "ping") {
  //   console.log(arg)  // prints "ping"
  //   event.sender.send('asynchronous-reply', 'pong')
  // }
})
