const express = require('express')
const app = express()
const port = 8000


const {MongoClient} = require('mongodb');


async function main() {
  const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.0"

  const client = new MongoClient(uri);

  try {
    await client.connect();

    await listDatabases(client);
  } catch (e) {
      console.error(e);
  } finally {
    await client.close();
  }
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

// display all request data received at this entry point
app.get('/bin/:id/requests', (req, res) => {
  res.send('Hello World!')
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