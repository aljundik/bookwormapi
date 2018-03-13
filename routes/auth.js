const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', (req,res)=>{
    const { credentials } = req.body;

    User.findOne({email: credentials.email}).then((user) => {
        if(user && user.isPassValid(credentials.password)) {
            res.json({ user: user.authToken()});
            
        }else{
            res.status(400).json({errors:{global: 'somthing went wrong'}})
        }
    })
    
});

module.exports = router;