const express = require('express');
const db = require('./db');
const cors = require('cors');
const app = express();
const { signup, signin, protect } = require('./auth');
const userRoute = require('./resources/user/user.router')

app.get('/', (req, res) => {
    res.json({ hello: "from server changed" })
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());

app.post('/signup', signup);
app.post('/signin', signin)

app.use('/api', protect);
app.use('/api/user', userRoute)

app.listen('3000', async () => {
    await db.connect();
    console.log("connection made");
    console.log('server is running on port 3000');
});