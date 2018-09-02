const TvShow = require('../models/TvShow')

exports.getAllTvShows = (request, response) => {
    TvShow.find({}, (error, tvshows) => {
        if (error) {
            response.json({
                message: "Server error, Please try after some time.",
                status: 500
            })
        }
        if (tvshows) {
            response.json({
                data: tvshows,
                message: "movie data fetched",
                status: 200
            })
        }
        else {
            response.json({
                message: "No data found",
                status: 200
            })
        }
    })
}

exports.postTvShow = (request, response) => {


    console.log(request.body);
    let tvshow = new TvShow({
        title: request.body.title,
        slug: request.body.slug,
        episodes: request.body.episodes,
        director: request.body.director,
        startingDate: request.body.startingDate,
        showTime: request.body.showTime,
        celebrities: request.body.celebrities,
        duration: request.body.duration

    })
    tvshow.save().then((tvshow) => {
        console.log('tvshow Added');
        response.json(tvshow);
    });
}

exports.getTvShowById = (request, response) => {

    TvShow.findById(request.params.id, (error, tvshow) => {
        if (error) {
            response.json({
                message: "Server error, Please try later.",
                status: 500
            })
        }
        if (tvshow) {
            response.json({
                data: tvshow,
                message: request.params.id + " tvshow id fetched",
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

exports.updateTvShow = (request, response) => {
    console.log(request.body);

    let {
        title,
        slug,
        director,
        episodes,
        startingDate,
        celebrities,
        showTime,
        duration

    } = request.body;

    TvShow.updateOne({ _id: request.params.id }, {
        title,
        slug,
        director,
        episodes,
        startingDate,
        celebrities,
        showTime,
        duration
    }, {}, (error, tvshow) => {
        if (error)
            response.json({
                message: "Server error, Please try later.",
                status: 500
            })
        response.json(tvshow);

    })
}

exports.deleteTvShow = (request, response) => {

    TvShow.findByIdAndDelete({_id : request.params.id},(error,id)=>{
        if(error) 
        response.json({
            
            message: "Server error, Please try later.",
            status: 500
        })
        response.json("Deleted : "+id)
    })
}