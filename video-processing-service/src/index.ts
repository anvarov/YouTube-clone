import express  from 'express';
import ffmpeg from 'fluent-ffmpeg';

const app = express();

app.use(express.json());

app.post('/process-video', (req, res) => {
    const inputeFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    if (!inputeFilePath || !outputFilePath) {
        res.status(400).send('inputFilePath and outputFilePath are required');
    }
    ffmpeg(inputeFilePath)
        .outputOptions('-vf', 'scale=-1:360')
        .on('end', () => {
            res.status(200).send('Video processing complete');
        })
        .on('error', (err) => {
            console.log('error occurred', err);
            res.status(500).send(`Video processing failed: ${err}`);
        })
        .save(outputFilePath);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});