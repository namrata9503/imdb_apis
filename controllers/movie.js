const Movie = require('../models/Movie')

exports.getAllMovies = (request, response) => {

    var limit = parseInt(request.query.limit) || 10
    var query = Movie.find().limit(limit);
    console.log(request.query);

    if (request.query.title) {
        query.where({ title: request.query.title })
    }

    if (request.query.duration) {
        query.where({ duration: request.query.duration })
    }
    if (request.query.type) {
        query.where({ type: request.query.type })
    }

    query.select('title status -_id')
    query.limit(request.query.limit || 10)
    /**
     * 
        The cursor.skip() method is often expensive because it requires 
        the server to walk from the beginning of the collection or index 
        to get the offset or skip position before beginning to return 
        result. As offset (e.g. pageNumber above) increases, cursor.skip() 
        will become slower and more CPU intensive. 
        With larger collections, cursor.skip() may become IO bound.
        To achieve pagination in a scaleable way combine a limit( ) 
        along with at least one filter criterion, a createdOn date 
        suits many purposes.
        `MyModel.find( { createdOn: { $lte: request.createdOnBefore } } )
        .limit( 10 )
        .sort( '-createdOn' )`
     
        */
    query.exec((error, movies) => {
        if (error) {
            response.json({
                message: "Server error, Please try after some time.",
                status: 500
            });
        }
        if (movies) {
            response.json({
                data: movies,
                message: "All movies fetched",
                status: 200,
                pagination: {
                    limit: request.query.limit || 10,
                    page: 1
                }
            });
        } else {
            response.json({
                message: "No data found",
                status: 200
            });
        }
    });
};



exports.postNewMovie = (req, res) => {
    let{
        title,
        type,
        director,
        year,
        writer,
        celebrities,
        showTime,
        duration,
        createdAt,
        modifiedAt
    } = req.body;
  
    var movie = new Movie({
        title,
        type,
        director,
        year,
        writer,
        celebrities,
        showTime,
        duration,
        createdAt,
        modifiedAt
    });
    movie.save().then((newMovie) => {
      console.log('Added successfully');
      res.json({
        message: `Added ${newMovie.title} successfully`,
        status: 200
      });
    }).catch(function (err) {
      if (err) {
        console.log(err);
        res.json({
          message: 'Server error',
          status: 500
        });
      }
    });
  };
  /**
   * 
   * // With a JSON doc
  Person.
    find({
      occupation: /host/,
      'name.last': 'Ghost',
      age: { $gt: 17, $lt: 66 },
      likes: { $in: ['vaporizing', 'talking'] }
    }).
    limit(10).
    sort({ occupation: -1 }).
    select({ name: 1, occupation: 1 }).
    exec(callback);
  // Using query builder
  Person.
    find({ occupation: /host/ }).
    where('name.last').equals('Ghost').
    where('age').gt(17).lt(66).
    where('likes').in(['vaporizing', 'talking']).
    limit(10).
    sort('-occupation').
    select('name occupation').
    exec(callback);
   * 
   */
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
        
        writer,
        celebrities,
        showTime,
        duration,

        createdAt,
        modifiedAt
    } = request.body;

    Movie.updateOne({ _id: request.params.id }, {
        title,
        type,
        director,
        year,
        director,
        writer,
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