const express = require("express");
const app = express();
const cors = require("cors");
const db = require('./Config/DataBase');
const cookieParser = require('cookie-parser');
const Troutes = require('./Routes/Tasks');
const auth = require('./Routes/Auth');
const verifyToken = require("./Middleware/auth");

app.use(express.json());
app.use(cookieParser());

// ✅ Proper CORS setup for Render deployment
app.use(cors({
    origin: "https://todo-list-client-side.onrender.com", // your frontend URL
    credentials: true
}));

// Routes
app.use('/Auth', auth);
app.use('/TodoNames', verifyToken, Troutes);

// DB connect
db();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server established at port ${PORT}.`);
});

  