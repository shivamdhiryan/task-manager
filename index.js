import express from 'express'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config({ silent: true });

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: "heyHelloIamshivam",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))
// console.log(process.env.OPENAI_API_KEY)
import authRoute from './routes/auth.route.js'
import taskRoute from './routes/task.route.js';
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/task', taskRoute);

app.get('/', (req, res) => {
    res.send('how can I help you');
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
})