const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://helpinghand:so9WJmcJGnIxFsle@helping-hand-cluster.a0lir.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const eventCollection = client.db("halpinghand").collection("events");
        const volunteerCollection = client.db("halpinghand").collection("volunteers");
        app.get('/event', async (req, res) => {
            const query = {}
            const cursor = await eventCollection.find(query);
            const events = await cursor.toArray();
            res.send(events);
        })
        app.post('/event', async (req, res) => {
            const event = req.body;
            const result = await eventCollection.insertOne(event);
            res.send(result);
        })


        app.get('/volunteer', async (req, res) => {
            const query = {};
            const cursor = await volunteerCollection.find(query);
            const volunteers = await cursor.toArray();
            res.send(volunteers);
        })


        app.delete("/volunteer/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await volunteerCollection.deleteOne(query);
            res.send(result);
        })
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Helping Hand app listening on port ${port}`);
})
// so9WJmcJGnIxFsle database pass
// helpinghand database username
