import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null;

function createWindow() {
  // Убираем системное меню полностью
  Menu.setApplicationMenu(null);

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    frame: false,          // убираем системную рамку
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: path.join(__dirname, '../assets/ico.png'),
    backgroundColor: '#111111',
  });

  mainWindow.loadURL('https://soundcloud.com');

  // Инжектируем кастомный titlebar после загрузки страницы
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow?.webContents.executeJavaScript(`
      (function() {
        // Удаляем старый titlebar если есть
        const old = document.getElementById('__sc-titlebar__');
        if (old) old.remove();

        // Создаём titlebar
        const bar = document.createElement('div');
        bar.id = '__sc-titlebar__';
        bar.innerHTML = \`
          <div class="tb-drag">
            <span class="tb-title">SCMirror</span>
          </div>
          <div class="tb-controls">
            <button class="tb-btn" id="tb-min" title="Свернуть">
              <svg width="10" height="10" viewBox="0 0 10 10"><rect y="4.5" width="10" height="1" fill="currentColor"/></svg>
            </button>
            <button class="tb-btn" id="tb-max" title="Развернуть">
              <svg width="10" height="10" viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" rx="1" stroke="currentColor" fill="none"/></svg>
            </button>
            <button class="tb-btn tb-close" id="tb-close" title="Закрыть">
              <svg width="10" height="10" viewBox="0 0 10 10"><line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </button>
          </div>
        \`;

        // Стили
        const style = document.createElement('style');
        style.textContent = \`
          #__sc-titlebar__ {
            position: fixed;
            top: 0; left: 0; right: 0;
            height: 38px;
            background: #111;
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 999999;
            -webkit-app-region: drag;
            user-select: none;
            border-bottom: 1px solid #222;
            padding: 0 8px 0 12px;
            font-family: -apple-system, 'Segoe UI', sans-serif;
          }
          .tb-drag {
            display: flex;
            align-items: center;
            gap: 8px;
            flex: 1;
            -webkit-app-region: drag;
          }
          .tb-title {
            font-size: 13px;
            font-weight: 600;
            color: #fff;
            letter-spacing: 0.02em;
            opacity: 0.9;
          }
          .tb-controls {
            display: flex;
            align-items: center;
            gap: 4px;
            -webkit-app-region: no-drag;
          }
          .tb-btn {
            width: 28px;
            height: 28px;
            border-radius: 6px;
            border: none;
            background: transparent;
            color: rgba(255,255,255,0.6);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.15s, color 0.15s;
          }
          .tb-btn:hover {
            background: rgba(255,255,255,0.1);
            color: #fff;
          }
          .tb-close:hover {
            background: #e74c3c !important;
            color: #fff !important;
          }
          /* Сдвигаем контент сайта вниз */
          body {
            padding-top: 38px !important;
          }
          /* Скрываем скроллбар */
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: rgba(255,85,0,0.3); border-radius: 3px; }
          ::-webkit-scrollbar-thumb:hover { background: rgba(255,85,0,0.6); }
        \`;

        document.head.appendChild(style);
        document.body.prepend(bar);

        // Кнопки управления
        document.getElementById('tb-min').addEventListener('click', () => window.electronAPI.minimize());
        document.getElementById('tb-max').addEventListener('click', () => window.electronAPI.maximize());
        document.getElementById('tb-close').addEventListener('click', () => window.electronAPI.close());
      })();
    `);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// IPC обработчики
ipcMain.on('window-minimize', () => mainWindow?.minimize());
ipcMain.on('window-maximize', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});
ipcMain.on('window-close', () => app.quit());

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});