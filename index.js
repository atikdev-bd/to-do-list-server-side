const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

/// middle were ///
require("dotenv").config();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USERS}:${process.env.PASSWORD}@cluster0.h7epoo8.mongodb.net/?retryWrites=true&w=majority`;
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
      data;
      const taskResult = await tasksCollection.insertOne(data);
      res.send(taskResult);
    });

    app.get("/task", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const task = await tasksCollection.find(query).toArray();
      res.send(task);
    });

    app.delete("/task/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const remainingTask = await tasksCollection.deleteOne(query);
      res.send(remainingTask);
    });

    ///update task//

    app.patch("/task/:id", async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body.updateData;
      

      const updateId = { _id: ObjectId(id) };
      const option = { upsert: true };

      const filter = await tasksCollection.findOne(updateId);

      const updateDoc = {
        $set: {
          name: updatedData.name,

          dateTime: updatedData.dateTime,

          description: updatedData.description,
        },
      };
      const result = await tasksCollection.updateOne(filter, updateDoc, option);

      res.send(result);
    });
  } finally {
  }
};

run().then((error) => {});

app.get("/", (req, res) => {
  res.send("to-do-server is running");
});

app.listen(port, () => {
  console.log("server is running on port", port);
});
