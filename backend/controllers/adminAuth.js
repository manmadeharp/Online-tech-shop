const SessionModel = require('../models/sessionModel')
const router = require('../routes/adminRouter')
exports.checkSignedIn = (async (req, res, next) =>{
    if (await SessionModel.checkSession(req.session.adminID)){
        next();  //
        return
    }
    res.send('you must login as an admin to access this page')

})

