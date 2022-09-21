const { Router } = require('express');
const router = Router();

const admin = require("firebase-admin");

const db = admin.firestore();

router.post("/api/marcas", async (req, res) => {

	try {
		const body = req.body;
		body.fecha = new Date()
		await db.collection("marcas")
    .doc()
    .create(body)
	
		return res.status(204).json();
		
	} catch (error) {
		return res.status(500).send(error)
	}

});

//optener un item por id
router.get("/api/marcas/:item_id", async (req, res) => {
	try {
		const doc = db.collection('marcas').doc(req.params.item_id);
		const item = await doc.get();
		const response = item.data()
		//const masId = ({...response, id: item.id});

		return res.status(200).json(response);

	} catch (error) {
		return res.status(500).send(error)
	}

})

//optener todos los items
router.get("/api/marcas", async (req, res) => {

	try {
		const query = db.collection('marcas');
		const querySnapshot = await query.get();

		const response = querySnapshot.docs.map( doc => ({...doc.data(), id: doc.id }));
		return res.status(200).json(response);
		
	} catch (error) {
		return res.status(500).send(error)
	}

});

//eliminar item
router.delete("/api/marcas/:item_id", async (req, res) => {
	try {
		const doc = db.collection('marcas').doc(req.params.item_id);
		await doc.delete();
		return res.status(200).json();
	} catch (error) {
		return res.status(500).send(error)
	}
});

//actualizar item
router.put("/api/marcas/:item_id", async (req, res) => {
	try {
		const doc = db.collection('marcas').doc(req.params.item_id);
        await doc.update(req.body)
		// await doc.update({
		// 	nombre: req.body.nombre
		// });
		return res.status(200).json();
	} catch (error) {
		return res.status(500).send(error)
	}
})

module.exports = router