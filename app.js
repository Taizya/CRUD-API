//modules and libraries import
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

const app = express()

//middleware

app.use(express.json())

app.use((req, res, next)=>{
  console.log(req.path, req.method);
  next()
})

//routes definition
app.use('/api/workouts',workoutRoutes)

//connect to mongodb
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Listening for requests
    const port = process.env.PORT;

    app.listen(port, () => {
      console.log(`Connected to MongoDB & listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

