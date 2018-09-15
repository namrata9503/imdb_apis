const Celebrity = require('../models/Celebrity')

exports.getAllCelebrities = (req, res) => {
    var query = Celebrity.find()
  if (req.query.name) {
    query.where({ title: req.query.name });
  }
  query.select('name -_id');
  query.limit(req.query.limit || 10);
  query.exec((error, celebs) => {
    if (error) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (celebs) {
      res.json({
        data: celebs,
        message: "All celebs fetched",
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

exports.postCelebrity = (req, res) => {
    let {
        name,
        pictureUrl,
        details,
        height,
        bornInfo,
        resume,
        contact,
        createdAt,
        modifiedAt
    } = req.body;

    var celeb = new Celebrity({
        name,
        pictureUrl,
        details,
        height,
        bornInfo,
        resume,
        contact,
        createdAt,
        modifiedAt
    });
    celeb.save().then((newCeleb) => {
        console.log('Added successfully');
        res.json({
            message: `Added ${newCeleb.name} successfully`,
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

exports.getCelebrityById = (request, response) => {

    Celebrity.findById(request.params.id, (error, celebrity) => {
        if (error) {
            response.json({
                message: "Server error, Please try later.",
                status: 500
            })
        }
        if (celebrity) {
            response.json({
                data: celebrity,
                message: request.params.id + " celebrity id fetched",
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

exports.updateCelebrity = (request, response) => {
    console.log(request.body);

    let {
        name,
        details,
        bornInfo,

        resume,
        contact


    } = request.body;

    Celebrity.updateOne({ _id: request.params.id }, {
        name,
        details,
        bornInfo,

        resume,
        contact
    }, {}, (error, celebrity) => {
        if (error)
            response.json({
                message: "Server error, Please try later.",
                status: 500
            })
        response.json(celebrity);

    })
}

exports.deleteCelebrity = (request, response) => {

    Celebrity.findByIdAndDelete({ _id: request.params.id }, (error, id) => {
        if (error)
            response.json({

                message: "Server error, Please try later.",
                status: 500
            })
        response.json("Deleted : " + id)
    })
}