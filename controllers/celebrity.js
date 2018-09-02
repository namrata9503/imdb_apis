const Celebrity = require('../models/Celebrity')

exports.getAllCelebrities = (request, response) => {
    Celebrity.find({}, (error, celebrities) => {
        if (error) {
            response.json({
                message: "Server error, Please try after some time.",
                status: 500
            })
        }
        if (celebrities) {
            response.json({
                data: celebrities,
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

exports.postCelebrity = (request, response) => {


    console.log(request.body);
    let celebrity = new Celebrity({
        name: request.body.name,
        details: request.body.details,
        bornInfo: request.body.bornInfo,
        resume: request.body.resume,
        contact: request.body.contact
       

    })
    celebrity.save().then((celebrity) => {
        console.log('celebrity Added');
        response.json(celebrity);
    });
}

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

    Celebrity.findByIdAndDelete({_id : request.params.id},(error,id)=>{
        if(error) 
        response.json({
            
            message: "Server error, Please try later.",
            status: 500
        })
        response.json("Deleted : "+id)
    })
}