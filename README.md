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


## Список domains zapret
```
a-v2.sndcdn.com
api-auth.soundcloud.com
api-v2.soundcloud.com
assets.web.soundcloud.cloud
cf-hls-media.sndcdn.com
cf-hls-opus-media.sndcdn.com
d15wdfb2rw9n2y.cloudfront.net
d1hcxlifzhxzha.cloudfront.net
d1ws1c3tu8ejje.cloudfront.net
d2gff659so2qub.cloudfront.net
d36lkcxq7qra7v.cloudfront.net
dezyktpp25vy8.cloudfront.net
dwt.soundcloud.com
graph.soundcloud.com
soundcloud.cloud
soundcloud.com
www.soundcloud.com
sndcdn.com
soundcloud.app.goo.gl
pagead2.googlesyndication.com
pagead2.googlesyndication.com
api-v2.soundcloud.com
ep2.adtrafficquality.google
ep1.adtrafficquality.google
```
