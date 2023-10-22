// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require('cors');
// const authRoutes = require("./routes/authRoutes");

// app.use(cors());

// const app = express();
// const port = 5000;

// mongoose
//   .connect(
//     "",
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Error connecting to MongoDB", err));
// app.use(bodyParser.json());

// // Routes
// app.use("/auth", authRoutes);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = 5000;

app.use(cors());

mongoose
  .connect(
    "mongodb+srv://shifananazrin15:3Gzj88Ssaxy4B5AI@cluster0.v3pmhj5.mongodb.net/",

    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
