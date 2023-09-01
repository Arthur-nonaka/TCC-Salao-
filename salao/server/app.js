const express = require("express");
const cors = require("cors");
const app = express();

// const corsOptions = {
//     origin: 'http://177.91.120.132',
//     optionsSuccessStatus: 200,
//   };

// app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());

module.exports = { app };
