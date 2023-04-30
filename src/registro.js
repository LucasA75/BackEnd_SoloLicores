const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");

function crearUsuarioEnFirebase(email, contrasena) {
    const auth = getAuth();
    try {
        const user = createUserWithEmailAndPassword(auth, email, contrasena);
        return user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return { errorCode, errorMessage }
    }
}

module.exports = async (request, response) => {
    // GET 
    const datosGET = request.query;
    // POST 
    const datosPOST = request.body;
    console.dir(datosPOST)
    const JsonNuevo = JSON.parse(datosPOST)
    const newUser = crearUsuarioEnFirebase(JsonNuevo.email, JsonNuevo.password);
    return { newUser };
}; 