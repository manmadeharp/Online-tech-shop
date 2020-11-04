const sessionModel = require('../models/sessionModel')
const router = require('../routes/adminRouter')
exports.checkSignedIn = (async(req, res, next) =>{

})

router.get('/profile', checkSignedIn, async (req, res) => {
    if (sessionModel.checkSignedIn(req.session.userID)){
        next();
        return
    }

    res.send('you must login to access this page')

})