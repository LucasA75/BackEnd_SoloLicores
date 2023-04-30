const {admin}  = require("../src/firebase")

module.exports = async(req, res)=>{

    try {
        const token = req.headers.authentication.split(' ')[1];
        console.log(token)
        await admin.auth().verifyIdToken(token)
        return {token: "valido"}
    } catch (error) {
        res.code(401).send({"token":"invalido"})
    }

}