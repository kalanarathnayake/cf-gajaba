const Event = require('../model/Event.model');

//Create new ticket 
const createEvent = async (req, res) => {
    //catching data from front end to these attributes
    const { eventId, eventName, scoreFor1, scoreFor2, scoreFor3} = req.body;

    //create a object to store saved data to save in the mongo db database
    const event = new Event({
        eventId,
        eventName,
        scoreFor1,
        scoreFor2,
        scoreFor3
    });

    //sending created ticket object to the database 
    await event.save()
        .then(() => res.json('Event Registered'))
        .catch(err => res.status(400).json('Error : ' + err));
};

//get player info by id
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event)
            res.json(event)
        else {
            res.json("No Event record in the database!");
        }
    } catch (error) {
        res.status(500).send("Server Error" + error);
    }
};


//get all ticket records
const getEvent = async (req, res) => {
    try {
        const event = await Event.find();
        res.json(event)
    } catch (error) {
        res.status(500).send("Server Error : " + error);
    }
}

// firstName: { type: String, required: true },
// lastName: { type: String, required: true },
// EPF: { type: String, required: true },
// house: { type: String, required: true },
// branch: { type: String, required: false },
// phoneNumber: { type: String, required: false },
// event: { type: String, required: true }


//export created functions 
module.exports = {
    createEvent,
    // deleteTicket,
    getEventById,
    getEvent,
    // updateTicket
};