import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import JwtMiddleware from "./src/middlewares/jwt.middleware.js";
import UserRoute from './src/routes/user.route.js';
import NewsRoute from './src/routes/news.route.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", UserRoute);
app.use("/news", JwtMiddleware, NewsRoute);

app.use("*", (req, res) => {
    res.status(404).json({
        message: "Not found"
    })
})

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});


export default app