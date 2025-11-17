const { get } = require('underscore');
const models = require('../models'); 
const Party = models.Party; 

const getParty = (req, res) => {
    return res.render('party');
};

const createParty = async (req, res) => {
    const {name, time, attendees} = req.body;
    
    if(!name || !time || !price || !attendees){
        return res.status(400).json({error: 'All fields are required!'}); 
    }

    const price = attendees * 20; //price changes based on how many domos are attending
    const booking = new Party({
        name, 
        time, 
        attendees, 
        price, 
        owner: req.session.account._id,
    }); 
    try{
        await booking.save(); 
        return res.status(201).json({message: 'Booking created successfully!'}); 
    }catch(err){
        console.log(err); 
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Party already exists.' });
        }
        return res.status(500).json({error: 'An error occurred while creating booking!'}); 
    }
}; 

const getParties = async (req, res) => {
    const parties = await Party.find(query).select('name time attendees price ').lean().exec(); 
    return res.json({parties: parties});
}; 

module.exports = {
    getParty, 
    createParty,
    getParties,
};