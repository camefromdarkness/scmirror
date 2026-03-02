# SoundCloud Mirror

Десктопное приложение SoundCloud для macOS и Windows на базе Electron.

## Структура проекта

```
src/
├── electron/        # Electron главный процесс
│   ├── main.ts      # Главный процесс приложения
│   └── preload.ts   # Preload скрипт
├── react/           # React компоненты
│   ├── App.tsx      # Главный компонент
│   ├── App.css      # Стили
│   ├── main.tsx     # Точка входа React
│   └── index.css    # Глобальные стили
└── public/          # Статические файлы
    └── index.html   # HTML шаблон
```

## Установка

```bash
npm install
```

## Разработка

```bash
npm run dev
```

## Сборка

Собрать для текущей платформы:
```bash
npm run dist
```

Собрать только для macOS:
```bash
npm run dist:mac
```

Собрать только для Windows:
```bash
npm run dist:win
```

## Функциональность

- Встроенный SoundCloud веб-интерфейс в виде iframe
- Кроссплатформенность (macOS, Windows)
- Стандартная интеграция меню
