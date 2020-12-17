const express = require ('express');

const moviesControllers = require("../controllers/movies")

const router = express.Router();

router.get('/search/:name', moviesControllers.getMoviesByName )

router.get('/', moviesControllers.getAllMovies )



module.exports = router;