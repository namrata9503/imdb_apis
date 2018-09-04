const Movie = require('../models/Movie')

exports.getAllMovies = (request, response) => {

    var limit = parseInt(request.query.limit) || 10
    var query = Movie.find().limit(limit);
    console.log(request.query);


    if (request.query.duration) {
        query.where({ duration: request.query.duration })
    }
    if (request.query.type) {
        query.where({ type: request.query.type })
    }
    query.exec((error, movie) => {
        if (error)
            response.json({
                message: "Server error, Please try after some time.",
                status: 500
            })
        response.json(movie)
    })
    // Movie.find({}, (error, movies) => {
    //     if (error) {
    //         response.json({
    //             message: "Server error, Please try after some time.",
    //             status: 500
    //         })
    //     }
    //     if (movies) {
    //         response.json({
    //             data: movies,
    //             message: "movie data fetched",
    //             status: 200
    //         })
    //     }
    //     else {
    //         response.json({
    //             message: "No data found",
    //             status: 200
    //         })
    //     }
    // })
}

exports.postMovie = (request, response) => {


    console.log(request.body);
    let movie = new Movie({
        title: request.body.title,
        type: request.body.type,
        director: request.body.director,
        year: request.body.year,
        celebrities: request.body.celebrities,
        showTime: request.body.showTime,
        duration: request.body.duration

    })
    movie.save().then((movie) => {
        console.log('movie Added');
        response.json(movie);
    });
}

exports.getMovieById = (request, response) => {

    Movie.findById(request.params.id, (error, movies) => {
        if (error) {
            response.json({
                message: "Server error, Please try later.",
                status: 500
            })
        }
        if (movies) {
            response.json({
                data: movies,
                message: request.params.id + " movie id fetched",
                status: 200
            })
        }
        else {
            response.json({
                message: "Not found",
                status: 200
            })
        }
    })
}

exports.updateMovie = (request, response) => {
    console.log(request.body);

    let {
        title,
        type,
        director,
        year,
        celebrities,
        showTime,
        duration

    } = request.body;

    Movie.updateOne({ _id: request.params.id }, {
        title,
        type,
        director,
        year,
        celebrities,
        showTime,
        duration
    }, {}, (error, movie) => {
        if (error)
            response.json({
                message: "Server error, Please try later.",
                status: 500
            })
        response.json(movie);

    })
}

exports.deleteMovie = (request, response) => {

    Movie.findByIdAndDelete({ _id: request.params.id }, (error, id) => {
        if (error)
            response.json({

                message: "Server error, Please try later.",
                status: 500
            })
        response.json("Deleted : " + id)
    })
}