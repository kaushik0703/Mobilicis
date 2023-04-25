// K V Vishnu Swaroop
// 23-04-2023
// Task ORUPhones

const express = require('express')
var cors = require('cors')
const mongoose = require('mongoose')
const router = express.Router()
require('dotenv').config()

// Connection URI
const uri = `mongodb+srv://vswaroop04:${process.env.mongo_password}@cluster0.jongyzs.mongodb.net/`

// Database Name
const dbName = 'oru_phones'

// Connect to the MongoDB cluster
mongoose
  .connect(uri + dbName, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    console.log(`Connected successfully to MongoDB cluster: ${dbName}`),
  )
  .catch((err) => console.log(`Error connecting to MongoDB cluster: ${err}`))

const app = express()
const port = 5000
const db = mongoose.connection

app.use(cors())
app.use(express.json())

// Available Routes

app.use('/', router)

router.get('/userslow5', (req, res) => {
  db.collection('oruphones')
    .find({
      $and: [
        { car: { $in: ['BMW', 'Mercedes-Benz'] } },
        { income: { $lt: '$5' } },
      ],
    })
    .toArray(function (err, docs) {
      if (err) {
        console.log(`Error fetching document: ${err}`)
        res.status(500).json(err)
      } else {
        res.status(200).json(docs)
      }
    })
})

router.get('/usersphone10000', (req, res) => {
  db.collection('oruphones')
    .find({ gender: 'Male', phone_price: { $gt: '10000' } })
    .toArray(function (err, docs) {
      if (err) {
        console.log(`Error fetching document: ${err}`)
        res.status(500).json(err)
      } else {
        res.status(200).json(docs)
      }
    })
})
router.get('/userslastnameM', (req, res) => {
  const last_name = /^M/

  db.collection('oruphones')
    .find({
      $and: [
        { last_name: { $regex: /^M/ } },
        { $expr: { $gt: [{ $strLenCP: '$quote' }, 15] } },
      ],
    })
    .toArray(function (err, docs) {
      if (err) {
        console.log(`Error fetching document: ${err}`)
        res.status(500).json(err)
      } else {
        arr = []
        docs.forEach((doc) => {
          lowercase = doc.last_name.toLowerCase()
          if (doc.email.includes(lowercase)) {
            arr.push(doc)
          } else {
          }
        })
        res.status(200).json(arr)
      }
    })
})
router.get('/usersbmwandmercedes', (req, res) => {
  db.collection('oruphones')
    .find({
      $and: [
        { car: { $in: ['BMW', 'Mercedes-Benz', 'Audi'] } },
        { email: { $not: { $regex: /\d/ } } },
      ],
    })
    .toArray(function (err, docs) {
      if (err) {
        console.log(`Error fetching document: ${err}`)
        res.status(500).json(err)
      } else {
        res.status(200).json(docs)
      }
    })
})
router.get('/userstop10', (req, res) => {
  db.collection('oruphones')
    .aggregate([
      {
        $group: {
          _id: '$city',
          user_count: { $sum: 1 },
          avg_income: {
            $avg: {
              $convert: {
                input: { $substr: ['$income', 1, -1] },
                to: 'double',
                onError: 0,
                onNull: 0,
              },
            },
          },
        },
      },
      { $sort: { user_count: -1 } },
      { $limit: 10 },
    ])
    .toArray(function (err, docs) {
      if (err) {
        console.log(`Error fetching document: ${err}`)
        res.status(500).json(err)
      } else {
        res.status(200).json(docs)
      }
    })
})
app.listen(port, () => {
  console.log(`Oruphones backend is listening at port:${port}`)
})
