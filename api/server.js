const express = require('express');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const app = express();

// Статичні файли
app.use(express.static(path.join(__dirname, 'public')));

// Конвертація AVI у MP4
app.get('/convert-avi', (req, res) => {
    const inputPath = path.join(__dirname, 'media', 'video.avi');
    const outputPath = path.join(__dirname, 'public', 'video.mp4');

    ffmpeg(inputPath)
        .output(outputPath)
        .on('end', () => {
            console.log('Конвертація завершена');
            res.sendFile(outputPath);
        })
        .on('error', (err) => {
            console.error('Помилка конвертації: ', err.message);
            res.status(500).send('Помилка конвертації файлу');
        })
        .run();
});

// QuickTime конвертація
app.get('/convert-mov', (req, res) => {
    const inputPath = path.join(__dirname, 'media', 'video.mov');
    const outputPath = path.join(__dirname, 'public', 'video.mp4');

    ffmpeg(inputPath)
        .output(outputPath)
        .on('end', () => {
            console.log('Конвертація завершена');
            res.sendFile(outputPath);
        })
        .on('error', (err) => {
            console.error('Помилка конвертації: ', err.message);
            res.status(500).send('Помилка конвертації файлу');
        })
        .run();
});

// Інші маршрути для конвертації (якщо потрібно)

// Запуск сервера
app.listen(3000, () => {
    console.log('Сервер працює на порту 3000');
});
