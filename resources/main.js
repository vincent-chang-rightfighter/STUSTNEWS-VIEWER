const { app, BrowserWindow } = require('electron')

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1500,
        height: 900,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('index.html')
    win.setMenu(null);
    //win.webContents.openDevTools()
}
app.whenReady().then(createWindow)
app.disableHardwareAcceleration();
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
