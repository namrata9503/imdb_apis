const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/imdb-apis')
mongoose.connection.on('error', (error) => console.error(error))
mongoose.connection.on('open', () => console.log('successfully connected with mongodb..'))


const movieController = require('./controllers/movie')
const tvshowsController = require('./controllers/tvshow')
const celebrityController = require('./controllers/celebrity')
const eventController = require('./controllers/event')
const userController = require('./controllers/users');
const episodeController = require('./controllers/episodes');

app.get('/api/v1/movies',movieController.getAllMovies);
app.post('/api/v1/movies',movieController.postNewMovie);
app.get('/api/v1/movies/:id', movieController.getMovieById);
app.put('/api/v1/movies/:id',movieController.updateMovie);
app.delete('/api/v1/movies/:id',movieController.deleteMovie);

app.get('/api/v1/tvshows',tvshowsController.getAllTvShows);
app.post('/api/v1/tvshows/new',tvshowsController.postTvShow);
app.get('/api/v1/tvshows/:id', tvshowsController.getTvShowById);
app.put('/api/v1/tvshows/:id',tvshowsController.updateTvShow);
app.delete('/api/v1/tvshows/:id',tvshowsController.deleteTvShow);

app.get('/api/v1/celebrities',celebrityController.getAllCelebrities);
app.post('/api/v1/celebrities/new',celebrityController.postCelebrity);
app.get('/api/v1/celebrities/:id', celebrityController.getCelebrityById);
app.put('/api/v1/celebrities/:id',celebrityController.updateCelebrity);
app.delete('/api/v1/celebrities/:id',celebrityController.deleteCelebrity);

app.get('/api/v1/events',eventController.getAllEvents);
app.post('/api/v1/events/new',eventController.postEvent);
app.get('/api/v1/events/:id', eventController.getEventById);
app.put('/api/v1/events/:id',eventController.updateEvent);
app.delete('/api/v1/events/:id',eventController.deleteEvent);

app.post('/api/v1/users', userController.postNewUser);
app.get('/api/v1/users', userController.getAllUsers);
app.get('/api/v1/users/:id', userController.getUserById);
app.put('/api/v1/users/:id', userController.updateUserById);
app.delete('/api/v1/users/:id', userController.deleteUserById);

app.post('/api/v1/episodes', episodeController.postNewEpisode);
app.get('/api/v1/episodes', episodeController.getAllEpisodes);
app.get('/api/v1/episodes/:id', episodeController.getEpisodeById);
app.put('/api/v1/episodes/:id', episodeController.updateEpisodeById);
app.delete('/api/v1/episodes/:id', episodeController.deleteEpisodeById);

app.get('/', (request, response) => {
    response.send("Hello World........");
})

app.listen(5555, () => console.log('Express server at 5555'))