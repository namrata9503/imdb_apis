const TvShow = require('../models/TvShow')

exports.getAllTvShows = (req, res) => {
    var query = TvShow.find()
    if (req.query.title) {
        query.where({ title: req.query.title });
    }
    query.select('title status -_id');
    query.limit(req.query.limit || 10);
    query.exec((error, tv) => {
        if (error) {
            res.json({
                message: "Server error, Please try after some time.",
                status: 500
            });
        }
        if (tv) {
            res.json({
                data: tv,
                message: "All Tvs fetched",
                status: 200
            });
        } else {
            res.json({
                message: "No data found",
                status: 200
            });
        }
    });
}


exports.postTvShow = (req, res) => {

    let {
        title,
        posterUrl,
        trailerUrl,
        description,
       // director,
        stars,
        episode,
        photourl,
        storyline,
        keywords,
        genres,
        createdAt,
        modifiedAt,
        status
    } = req.body;

    var tv = new TvShow({
        title,
        posterUrl,
        trailerUrl,
        description,
       // director,
        stars,
        episode,
        photourl,
        storyline,
        keywords,
        genres,
        createdAt,
        modifiedAt,
        status
    });
    tv.save().then((newShow) =>{
        console.log('Added successfully');
        res.json({
            message: `Added ${newShow.title} successfully`,
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
}

exports.getTvShowById = (req, res) => {

    Tv.findById(req.params.id, (err, tvShow) => {
        if (err) {
            res.json({
                message: "Server error, Please try after some time.",
                status: 500
            });
        }
        if (tvShow) {
            res.json({
                data: tvShow,
                message: "User data fetched successfully",
                status: 200
            });
        } else {
            res.json({
                message: "No data found",
                status: 200
            });
        }
    });
}

exports.updateTvShow = (req, res) => {
    console.log(req.body);
    const {
        title,
        posterUrl,
        trailerUrl,
        description,
       // director,
        stars,
        episode,
        photourl,
        storyline,
        keywords,
        genres,
        status
    } = req.body;
    Tv.update({
        _id: req.params.id
    }, {
            title,
            posterUrl,
            trailerUrl,
            description,
           // director,
            stars,
            episode,
            photourl,
            storyline,
            keywords,
            genres,
            status
        }, {}, (error, tv) => {
            if (error)
                res.json({
                    error: error,
                    status: 500
                });
            console.log(error);
            res.json(tv);
        });
}

exports.deleteTvShow = (request, response) => {

    TvShow.findByIdAndDelete({ _id: request.params.id }, (error, id) => {
        if (error)
            response.json({

                message: "Server error, Please try later.",
                status: 500
            })
        response.json("Deleted : " + id)
    })
}