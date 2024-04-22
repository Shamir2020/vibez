const Profile = require('../models/profileModel')
const User = require('../models/userModel')

const UpdateProfile = async (req, res)=>{

    console.log(req.body)
    var profile

    try {
        if (req.file){

            profile = await Profile.findOneAndUpdate({userId: req.body.id},{
                user: req.body.id,
                name: req.body.name,
                language: req.body.language,
                location: req.body.location,
                phone: req.body.phone,
                facebook: req.body.facebook,
                instagram: req.body.instagram,
                profilePic: req.file.path
            })
        }
        else {
            profile = await Profile.findOneAndUpdate({userId: req.body.id},{
                name: req.body.name,
                language: req.body.language,
                location: req.body.location,
                phone: req.body.phone,
                facebook: req.body.facebook,
                instagram: req.body.instagram,
    
            })
         }
    
    
        console.log('Profile Updated')
        res.status(200).json(profile)
    }
    catch(error){
        res.status(500).json({error: error.message})
        console.log(error)
        console.log(error.message)
    }
}

const GetProfile = async (req, res) =>{
    const id = req.params.id 

    const profile = await Profile.findOne({userId:id})

    res.status(200).json(profile)
}

module.exports = {
    UpdateProfile,
    GetProfile
}