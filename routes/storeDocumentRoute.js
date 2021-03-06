const { Router } = require('express');
const documentController = require('../controllers/storeDocumentController');

const router = Router();

router.get('/api/get-store-documents', documentController.storeDocumentsListGet);

router.post('/api/post-store-document', documentController.storeDocumentPost);

router.get('/api/test', documentController.test);

module.exports = router;