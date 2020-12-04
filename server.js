const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./utils/connectDB");

//* load environment variables
require("dotenv").config({ path: "./config.env" });

//* connect to database
connectDB();

//* import route file
const products = require("./routes/products");
const search = require("./routes/search");

const app = express();

//* cors middleware
app.use(cors());

//* logging middleware
app.use(morgan("dev"));

//* body-parser middleware
app.use(express.json());

//* mount routes
app.use("/api/products", products);
app.use("/api/search", search);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// handle unhandled promise rejection
process.on("unhandledRejection", (error, promise) => {
  console.log(error);
  console.log(`Error: ${error.message}`);
  // close server & exit process
  server.close(() => process.exit(1));
});
