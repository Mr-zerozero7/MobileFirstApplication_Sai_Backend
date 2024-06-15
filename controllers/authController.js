const User = require('../models/User');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {email: '', password: ''};

    // incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'That email is not registered'
    }

    // incorrect password
    if(err.message === 'incorrect password'){
        errors.password = 'That password is incorrect'
    }
    

    //duplicate email error
    if(err.code === 11000){
        errors.email = 'that email is already registered';
        return errors
    }
    
    // validation errors
    if(err.message.includes('user validation failed')){
        // console.log(err)
        Object.values(err.errors).forEach(({properties}) => {
            // console.log(properties)
            errors[properties.path] = properties.message
        })
    }

    return errors
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: maxAge})
}

// controller actions
module.exports.signup_get = (req, res) => {
    res.render('/');
}

module.exports.login_get = (req, res) => {
    res.render('/');
}


// signup action
module.exports.signup_post = async(req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.create({email, password})
        const token = createToken(user._id);
        res.cookie('jwt', token, {maxAge: maxAge * 1000});
        res.status(201).json({user: user._id, jwt: token})
    }catch(err){
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

// login action
module.exports.login_post = async(req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id);
        res.cookie('jwt', token, { maxAge: maxAge * 1000});
        res.status(200).json({user: user._id, jwt: token})
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }

}


// logout action
module.exports.logout_get = async(req, res) => {
    const {email,password} = req.body
    try {
        const user = await User.login(email,password)
        const token = ''
        res.cookie('jwt', token, {maxAge: 1, path: '/login'});
        res.status(200).json({user:user._id, jwt:token})
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json(errors)
    }

}


