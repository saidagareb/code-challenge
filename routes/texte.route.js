const express = require('express');
const router = express.Router();
const texte_controller = require('../controllers/texte.controller');

router.post('/create', texte_controller.texte_create);
router.get('/:id', texte_controller.texte_details);
router.put('/:id/update', texte_controller.texte_update);
router.delete('/:id/delete', texte_controller.texte_delete);
router.get('/', texte_controller.texte_get_with_pagination);
router.get('/fuzzy', texte_controller.texte_fetch_fuzzy);
// router.get('/countOccurence', texte_controller.texte_get_occurence);
module.exports = router;