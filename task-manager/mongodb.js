const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://127.0.0.1:27017/test';
const database = 'test';

const client = new MongoClient(connectionURL,{
    useNewUrlParser: true,
})

async function run(){
    try{
        await client.connect()
        console.log('connection successful')
    }catch(err){
        console.log(err)
    }
    const db = client.db(database);
    db.collection('User').insertOne({
      name: 'Eb pearls',
      age: 27
    }, (err, result) => {
      if (err) {
        console.log('Error inserting document:', err);
      } else {
        console.log('Document inserted successfully:', result);
      }
      client.close(); // Close the connection
    });


    }
run()