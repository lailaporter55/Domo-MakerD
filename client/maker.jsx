//will contain all of our code for the application that shows up once the user
//has logged in

const { makeDomo } = require("../server/controllers/Domo");

const makerPage = (req, res) => {
    return res.reder('app');
};

//getDomos function to retrieve all of the domos belonging to the user
//allow us to get JSON responses, allow client app to update dynamically using react
const getDomos = async (req, res) => {
    try{
        const query = {owner: req.session.account._id};
        const docs = await Domo.find(query).select('name age').lean().exec();

        return res.json({domos: docs}); 
    } catch(err){
        console.log(err);
        return res.status(500).json({error: 'Error retrieving domos!'});
    }
}; 

module.exports = {
    makerPage, 
    makeDomo, 
    getDomos
}