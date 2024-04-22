const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'iamsuperman2000'
const Profile = require('../models/profileModel')

const Login = async (req, res)=>{
    const {username, password} = req.body

    if (!username || !password){
        return res.status(400).json({error:'Fill all the fields'})
        
    }
    const user = await User.findOne({username: username})


    if (!user){
        return res.status(400).json({error:"Wrong username"})
    
    }
    // if (user.role == 'admin') {
    //     return res.status(400).json({error:"Not authorized to login as admin here"})
    // }

    if (user && await bcrypt.compare(password, user.password)){

        return res.status(200).json({
            name: user.name,
            username: user.username,
            email: user.email,
            token: generateToken(user)
        })
    }
    else {
        res.status(400).json({error:'Wrong password'})
        
    }
}


const Register = async (req, res)=>{
    const {name, email,username, password1, password2, role} = req.body

    if(await User.findOne({username})){
        return res.status(400).json({error:'Username already exists'})
    }
    if (await User.findOne({email})){
        return res.status(400).json({error:'Email already exists'})
    }
    if (!name || !email || !password1 || !password2 || !role){
        return res.status(400).json({error:'Please fill all the fields'})
    }
    if (password1 != password2){
        return res.status(400).json({error: 'Passwords do not match'})
    }

    console.log(role)

    try {
        const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password1, salt)

    const user = await User.create({
        name: name,
        username: username,
        email: email,
        password: hashedPassword,
        role: role
    })

    if (user){
        const profile = await Profile.create({
            userId: user.id,
            name: user.name
        })
        return res.status(200).json(user)
    }
    else {
        return res.status(400).json({error: 'User could not be created'})
    }
    }
    catch(error){
        console.log(error)
        console.log(error.message)
        res.status(500).json({error:error.message})
    }
}

const generateToken = (user)=>{
    return jwt.sign({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role
    }, JWT_SECRET, {expiresIn:'15d'})
}

module.exports = {
    Login, Register
}