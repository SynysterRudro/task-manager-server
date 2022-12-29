const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 5000;

// dotenv 
require('dotenv').config();

const app = express();

// middlewares 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server running successfully');
})



// mongoDb part starts 


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.akihfew.mongodb.net/?retryWrites=true&w=majority`;

// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// find all task 
async function run() {
    try {
        const taskCollection = client.db("taskManager").collection('tasks');

        app.get('/alltasks', async (req, res) => {
            /*    const query = {}
               const cursor = taskCollection.find(query);
               const tasks = await cursor.toArray();
               res.send(tasks); */

            let query = {};
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = taskCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);
        })


        // adding tasks 

        app.post('/alltasks', async (req, res) => {
            const tasks = req.body;
            const result = await taskCollection.insertOne(tasks);
            // console.log(result);
            res.send(result);
        })
    }
    catch {

    }
}
run().catch(console.log())



app.listen(port, () => {
    console.log('running from port- ', port);
})