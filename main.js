const { app, BrowserWindow } = require('electron');
const path = require('path');
const { Client } = require('@xhayper/discord-rpc');

// Paste your Discord Application (Client) ID here (from discord.com/developers/applications)
const DISCORD_CLIENT_ID = '1546274043110498434';

let mainWindow;
let rpc;
let rpcStartTime;

async function setupDiscordRPC() {
  rpc = new Client({ clientId: DISCORD_CLIENT_ID });

  rpc.on('ready', () => {
    rpcStartTime = new Date();
    updateActivity('Just opened the app');
    console.log('Discord Rich Presence connected.');
  });

  try {
    await rpc.login();
  } catch (err) {
    // This is expected if Discord desktop isn't running/logged in — the app
    // still works fine, it just won't show on your Discord profile.
    console.log('Discord not detected — Rich Presence skipped:', err.message);
  }
}

function updateActivity(stateText) {
  if (!rpc || !rpc.user) return;
  rpc.user.setActivity({
    details: 'Darekx14 exercising app',
    state: stateText || 'Browsing the workout plan',
    startTimestamp: rpcStartTime,
    instance: false,
  }).catch(() => {});
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 760,
    height: 920,
    title: 'Darekx14 Exercising App',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();
  setupDiscordRPC();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', async () => {
  if (rpc) {
    try { await rpc.destroy(); } catch (e) { /* ignore */ }
  }
  if (process.platform !== 'darwin') app.quit();
});
