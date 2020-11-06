const SessionModel = require('../models/sessionModel')
const router = require('../routes/usersRouter')
exports.checkSignedIn = (async (req, res, next) =>{
    if (await SessionModel.checkSession(req.session.userID)){
        next();  //
        return
    }
    res.send('you must login to access this page')

})

iiii