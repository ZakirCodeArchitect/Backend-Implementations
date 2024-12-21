const UserProfile = require('../models/profileModel')
const {City} = require('../models/citySchema')
const {User} = require('../models/zakirModel');


const create_profile = async(req, res) => {
    try {
        const {email, password, name, gender, city, data_of_birth, occupation, bio} = req.body;

    // CREATING NEW USER    
    const newUser = new User({
        email,
        password
    });
    await newUser.save();

    // CREATING PROFILE

    // creating a user profile which is basically linked to the new user who signed up.
    const newProfile = new UserProfile({
        user_id: newUser._id,   // to fetch the user ID from the Database collection.   
        name,
        gender,
        city,
        data_of_birth,
        occupation,
        bio
    });

    await newProfile.save();

    res.status(201).json({
        message: 'User and Profile created successfully'
    })
        
    } catch (err) {
      console.error(`Error creating profile: ${err}`);
      res.status(500).json({
        message: 'Error creating user Profile'
      })
    } 
}

const render_profile = async(req, res) =>{
    try{
        // console.log(city);
        const cities = await City.find();
        res.render('profile', {cities});
    }catch(error)
    {
        console.error("Failed to load Profile: ", error);
        res.status(404).json({
            message: "Failed to load Profile"   
        })
    }
} 

module.exports = {
    render_profile,
    create_profile
}