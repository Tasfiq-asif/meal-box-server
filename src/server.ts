import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

// Add a root route
app.get("/", (req, res) => {
  res.send("Hello, welcome to the server!");
});

async function server() {
  try {
    // First connect to database
    await mongoose.connect(config.database_url as string);
    console.log("Database connected successfully");

    // Then start the server
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.log("Failed to connect database", error);
  }
}

server();
