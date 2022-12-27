const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

/// middle were ///
require("dotenv").config();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USERS}:${process.env.PASSWORD}@cluster0.h7epoo8.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const tasksCollection = client.db("toDoList").collection("taskData");

    app.post("/task", async (req, res) => {
      const data = req.body;
      console.log(data);
      const taskResult = await tasksCollection.insertOne(data);
      res.send(taskResult);
    });
  } finally {


  }
};

run().then((error) => {
  
});

app.get("/", (req, res) => {
  res.send("to-do-server is running");
});

app.listen(port, () => {
  console.log("server is running on port", port);
});
