const express = require('express')
const dotenv = require('dotenv')
const { MongoClient, Collection } = require('mongodb'); 
const bodyparser = require('body-parser')
const cors = require('cors')

dotenv.config();
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
client.connect();

const dbName = process.env.DB_NAME 
const app = express()
const port = 3000


app.use(cors())
app.use(bodyparser.json())


app.get('/', async(req, res) => {
    const db=client.db(dbName)
    const collection=db.collection('Password')
    const findresult=await collection.find({}).toArray();
    console.log(findresult)
    res.json(findresult) 
})

app.post('/', async(req, res) => {
    let password=req.body
    const db=client.db(dbName)
    const collection=db.collection('Password')
    const findresult=collection.insertOne(password)
    res.json({sucess:true,reuslt:findresult}) 
})


app.delete('/', async(req, res) => {
    let password=req.body
    const db=client.db(dbName)
    const collection=db.collection('Password')
    const findresult=collection.deleteOne(password)
    res.json({sucess:true,result:findresult}) 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
