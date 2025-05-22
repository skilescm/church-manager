import { app, BrowserWindow } from 'electron';

import fetch from 'node-fetch'; // 👈 Add this if not already installed


// CommonJS-style. This will work with `module: "CommonJS"`
const path = require('path');


let mainWindow: BrowserWindow;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    await waitForVite(); // 👈 Wait until Vite is ready
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
};

app.whenReady().then(createWindow);

async function waitForVite(retries = 20, delay = 300) {
  const url = 'http://localhost:5173';
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch (err) {
      // Silent
    }
    await new Promise(res => setTimeout(res, delay));
  }
  throw new Error('Vite dev server did not respond in time.');
}
