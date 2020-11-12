const {Schema, model} = require('mongoose');

const session = new Schema ({
    expires: {type: Date},
    session: {type: String}
})

session.statics.checkSession = async function (ID) {
    let sessions = await this.find({})
    for (let session of sessions) {
        if(JSON.parse(session.session).userID == ID){
            return true
        }
        if (JSON.parse(session.session).adminID == ID) {
            return true
        }
    }
    return false;
}

module.exports = model('sessions', session);