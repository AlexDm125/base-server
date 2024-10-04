const express = require('express');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

const app = express();

// Статичні файли
app.use(express.static('C:/Users/User/Робочий стіл/new-base-server/public')); // Абсолютний шлях
app.use('/media', express.static('C:/Users/User/Робочий стіл/new-base-server/media')); // Абсолютний шлях

// Відправлення index.html
app.get('/', (req, res) => {
    res.sendFile('C:/Users/User/Робочий стіл/new-base-server/public/index.html'); // Абсолютний шлях
});

// Конвертація AVI у MP4
app.get('/convert-avi', (req, res) => {
    const inputPath = 'C:/Users/User/Робочий стіл/new-base-server/media/video.avi'; // Абсолютний шлях
    const outputPath = 'C:/Users/User/Робочий стіл/new-base-server/public/video-avi.mp4'; // Абсолютний шлях

    ffmpeg(inputPath)
        .output(outputPath)
        .on('end', () => {
            console.log('Конвертація AVI завершена');
            res.sendFile(outputPath);
        })
        .on('error', (err) => {
            console.error('Помилка конвертації AVI: ', err.message);
            res.status(500).send('Помилка конвертації файлу AVI');
        })
        .run();
});

// Конвертація MOV у MP4
app.get('/convert-mov', (req, res) => {
    const inputPath = 'C:/Users/User/Робочий стіл/new-base-server/media/video.mov'; // Абсолютний шлях
    const outputPath = 'C:/Users/User/Робочий стіл/new-base-server/public/video-mov.mp4'; // Абсолютний шлях

    ffmpeg(inputPath)
        .output(outputPath)
        .on('end', () => {
            console.log('Конвертація MOV завершена');
            res.sendFile(outputPath);
        })
        .on('error', (err) => {
            console.error('Помилка конвертації MOV: ', err.message);
            res.status(500).send('Помилка конвертації файлу MOV');
        })
        .run();
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Сервер працює на порту 3000');
});