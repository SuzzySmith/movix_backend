const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
const apiPort = process.env.PORT 


app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

//Allowing Cross Origin Resource Sharing
app.use( (req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next();
  })


//Importing Routes
const userRoutes = require('./routes/user')
const moviesRoutes = require('./routes/movies')
const HttpError = require('./models/http-error');

//Using Routes
app.use('/movies', moviesRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('I am listening');
})
//Redirect to Indalid URL 
app.use(( req, res, next)=> { 
    const error = new HttpError('Invalid URL', 404);
    throw error
});

app.use((error, req, res, next)=>{ 
    if (res.headerSent) {
        return next(error);
      }
      res.status(error.code || 500)
      res.json({message: error.message || 'An unknown error occurred!'});
    
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
