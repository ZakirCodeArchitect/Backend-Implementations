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

const get_profile = async(req, res) => {
    const {email, password} = req.body;

    try
    {
        // here do not use 'new' because you are searching not inserting
        const user = await User.findOne({
            email
        });
    
        if(!user)
        {
            return res.send("Error does not exist!!")
        }

        if(user.password !== password)
        {
            return res.send(`Invalid Credentials`)
        }

        const profile = await UserProfile.findOne({ user_id: user._id });

        if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
        }
        res.send(profile);
    }catch(error)
    {
        res.send(error)
    }

    

}
module.exports = {
    render_profile,
    create_profile,
    get_profile
}