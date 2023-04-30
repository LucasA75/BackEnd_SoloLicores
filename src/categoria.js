const { admin } = require("./firebase.js")

module.exports = async (req, res) => {
    switch (req.method) {
        case "GET":
            return procesarGET(req, res);
        case "POST":
            return procesarPOST(req, res);
        case "PUT":
            return procesarPUT(req, res);
        case "DELETE":
            return procesarDELETE(req, res);
        default:
            res.code(500).send({ error: "Metodo HTTP no soportado!" })
    }
}

function getColeccion() {
    return admin.firestore().collection("categorias");
}


async function procesarGET(req, res) {
    try {
        const querySnapshot = await getColeccion().get();
        const documentos = querySnapshot.docs.map(d => {
            /*   
            Esto se utiliza si el id queda fuera de los campos
            return {
                  id: d.id,
                  ...d.data()
              } */
            return d.data();
        });

        return documentos;
    } catch (error) {
        res.code(500).send({ error: error.message });
    }
}

async function procesarPOST(req, res) {

    try {
        const { nombre, descripcion } = req.body;
        const categoria = {
            nombre,
            descripcion

        }
        const documento = await getColeccion().doc(); /* Con esto creamos una colleccion en firebase */
        const id = documento.id;
        documento.set(categoria);
        categoria.id = id;
        return categoria;

    } catch (error) {
        res.code(500).send({ error: error.message });
    }
}
async function procesarDELETE(req, res) {
    try {
        const id = req.query.id // http://localhost:300/categoria?id=XXXX
        const docRef = await getColeccion().doc(id)
        await docRef.delete();
        return { borrado: true }
    } catch (error) {
        return {borrado:false, message: error.message}
    }

}
async function procesarPUT(req, res) {
    try {
        const {nombre, descripcion, id} = req.body;
        const categoria = {
            nombre,
            descripcion
        }
        const documento = await getColeccion().doc( id ); // crea documento vacío         
        documento.update( categoria );        
        return categoria; 
    } catch (error) {
        res.code(500).send({error: error.message});
    }
}