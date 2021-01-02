const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator')
const request = require('request');
const mongoose = require ('mongoose')
//const Movies = require('../models/movies');
 

//Get all movies documents from the collection
const getAllMovies  = async (req, res, next) => {
  // const userId = req.params.uid
    let allMovies;
        try { 
          
          allMovies = await  request(process.env.API, 
                                  (err,req, body) => {
                                    if(!err && res.statusCode==200){ 
                                      res.send(body);
                                    }
                                  })
                                 
        } catch (err) {
          const error = new HttpError('Something went wrong, could not find the Movie.',500);
          return next(error);
        }
      
        res.json({ response: allMovies });   
};


//Search movies with their names
const getMoviesByName =async  (req, res, next) => { 
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
             return next(
                      new HttpError('Invalid inputs passed, please check your data.', 422)
                 );
             }

        const movieTitle = req.params.s ;
        let movie;
      //  console.log({name:`/.*${movieTitle}.*/`})
        try {
          movie = await request(process.env.API+movieTitle, 
            (err,req, body) => {
              if(!err && res.statusCode==200){ 
                res.send(body);
              }
            })
    } catch (err) {
          const error = new HttpError(
            'Something went wrong, could not find the movie.',
            500
          );
          return next(error);  
        }
      
        if (!movie) {
          const error = new HttpError(
            'Could not find the user for the provided name.',
            404
          );
          return next(error);
        }
      
        res.json({ movie }); 


};



exports.getAllMovies = getAllMovies;
exports.getMoviesByName = getMoviesByName;
