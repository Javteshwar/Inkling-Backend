const { Router } = require('express');
const userDocumentController = require('../controllers/userDocumentController');

const router = Router();

router.get('/api/get-user-documents', userDocumentController.userDocsGet);

router.post('/api/post-user-document', userDocumentController.userDocPost);

module.exports = router;