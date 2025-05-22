"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const node_fetch_1 = __importDefault(require("node-fetch")); // 👈 Add this if not already installed
// CommonJS-style. This will work with `module: "CommonJS"`
const path = require('path');
let mainWindow;
const createWindow = async () => {
    mainWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    if (process.env.NODE_ENV === 'development') {
        await waitForVite(); // 👈 Wait until Vite is ready
        mainWindow.loadURL('http://localhost:5173');
    }
    else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }
};
electron_1.app.whenReady().then(createWindow);
async function waitForVite(retries = 20, delay = 300) {
    const url = 'http://localhost:5173';
    for (let i = 0; i < retries; i++) {
        try {
            const res = await (0, node_fetch_1.default)(url);
            if (res.ok)
                return;
        }
        catch (err) {
            // Silent
        }
        await new Promise(res => setTimeout(res, delay));
    }
    throw new Error('Vite dev server did not respond in time.');
}
