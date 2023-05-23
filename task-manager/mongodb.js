// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

const {MongoClient, ObjectID} = require('mongodb')

const id = new ObjectID()
console.log(id.id)
const connectionURL = 'mongodb://127.0.0.1:27017/test';
const database = 'test';

// const client = new MongoClient(connectionURL,{
//     useNewUrlParser: true,
// })

// async function run(){
//     try{
//         await client.connect()
//         console.log('connection successful')
//     }catch(err){
//         console.log(err)
//     }
//     const db = client.db(database);
//     db.collection('User').insertMany([{
//       name: 'Eb pearls',
//       age: 27
//     },{
//       name: "hello",
//       age: 30
//     }], (err, result) => {
//       console.log('hello world')
//       if (err) {
//         return console.log('Error inserting document:', err);
//       } else {
//         return console.log('Document inserted successfully:', result);
//       }
//       client.close(); // Close the connection
//     });


//     }
// run()