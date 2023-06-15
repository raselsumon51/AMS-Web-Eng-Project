const User = require('../models/user.js');


const adminController = {
   findAdmin: async(req, res) => {
    const users = await User.find();
    res.render('admin', {
        email: users[0].email,
        users:users
    })
}
}
module.exports = adminController