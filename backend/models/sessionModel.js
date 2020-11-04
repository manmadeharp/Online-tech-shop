const {Schema, model} = require('mongoose');

const session = new Schema ({
    expires: {type: Date},
    session: {type: String}
})

session.statics.checkSession = async function (userID) {
    let sessions = this.find()
    for (let session of sessions) {
        if(JSON.parse(session.sessions).userID == userID){
            return true
        }
    }
    return exists;
}

module.exports = model('sessions', session);