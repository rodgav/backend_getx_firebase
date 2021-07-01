import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({limit: '5mb'}));

app.get('/', (req, res) => {
    res.send('hello');
});

mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(
    () => {
        routes(app);
        const PORT = process.env.PORT || 7001;
        app.listen(PORT, () => {
            console.log('runing in ' + PORT);
        });
    }
).catch((e) => {
    console.log(e);
});

