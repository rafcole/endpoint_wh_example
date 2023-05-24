const express = require('express')
const app = express()
const port = 8000
app.use(express.json())

// const db = require('./mongo.js')

// const mongo = require('mongodb');
// const client = new mongo.MongoClient('mongodb://localhost:27017', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// var db;
// // var animals;
// client.connect(() => {
//   db = client.db('test');
//   animals = db.collection('test2');
//   console.log('mongoDB connected')
// });


// addAnimal = () => {
//   const animalName = prompt('Name: ');
//   const ageAnimal = prompt('Age: ');
//   animals.insertOne(
//     {
//       nameAnimal: animalName,
//       age: ageAnimal,
//     },
//     (err) => {
//       if (err) {
//         console.log('Error');
//       } else {
//         console.log('Added!');
//       }
//     }
//   );
// };
// addAnimal()

const {MongoClient} = require('mongodb');
let db;

async function main() {
  const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.0"

  const client = new MongoClient(uri);
let conn;
  try {
   conn = await client.connect();

    await listDatabases(client);
  } catch (e) {
      console.error(e);
  } 
  // finally {
  //   await client.close();
  // }
  db = conn.db("test")
}

main().catch(console.error);


async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

// async function display


// grab request, put it in db
  // 
app.post('/bin/my_hardcoded_endpoint', (req, res) => {
  res.send('Hello World!')
})

// stub
app.post('/bin/:id', (req, res) => {
  res.send('Hello World!')
})

app.post('/payload', async (req, res) => {
  let collection = await db.collection("test2");
  await collection.insertOne(req.body);
  res.send("ok");
})

app.get('/requests', async (req, res) => {
  // res.send('Hello World!')
  let collection = await db.collection("test2");
  
  let list = await collection.find().toArray();
  // let formatList = list.map(obj => JSON.stringify(obj, null, 2));
  // list.forEach();
  console.log(list);
  res.send(list);
})

// display all request data received at this entry point
app.get('/bin/:id/requests', (req, res) => {
  var id = req.params.id;

  res.send("request from " + id + " blah")
})

// create new endpoint
  // generate endpoint
  // add entry to mongo
  // return formatted entrypoint
app.get('/new', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
