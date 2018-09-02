
const Event = require('../models/Event')

exports.getAllEvents = (request, response) => {
    Event.find({}, (error, events) => {
        if (error) {
            response.json({
                message: "Server error, Please try after some time.",
                status: 500
            })
        }
        if (events) {
            response.json({
                data: events,
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

exports.postEvent = (request, response) => {


    console.log(request.body);
    let event = new Event({
        name: request.body.name,
        date: request.body.date,
        awards: request.body.awards,
        celebrities: request.body.celebrities,
        details: request.body.details,
        time: request.body.time
       

    })
    event.save().then((event) => {
        console.log('event Added');
        response.json(event);
    });
}

exports.getEventById = (request, response) => {

    Event.findById(request.params.id, (error, event) => {
        if (error) {
            response.json({
                message: "Server error, Please try later.",
                status: 500
            })
        }
        if (event) {
            response.json({
                data: event,
                message: request.params.id + " event id fetched",
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

exports.updateEvent = (request, response) => {
    console.log(request.body);

    let {
        name,
        date,
      
        awards,
        celebrities,
        details,
        time
        

    } = request.body;

    Event.updateOne({ _id: request.params.id }, {
        name,
        date,
      
        awards,
        celebrities,
        details,
        time
    }, {}, (error, event) => {
        if (error)
            response.json({
                message: "Server error, Please try later.",
                status: 500
            })
        response.json(event);

    })
}

exports.deleteEvent = (request, response) => {

    Event.findByIdAndDelete({_id : request.params.id},(error,id)=>{
        if(error) 
        response.json({
            
            message: "Server error, Please try later.",
            status: 500
        })
        response.json("Deleted : "+id)
    })
}