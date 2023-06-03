const express = require("express");
require("express-async-errors");
const cors = require("cors");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./Middleware/errorMiddleware");
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", require("./routes/userRoutes"));

app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("hello word !");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
