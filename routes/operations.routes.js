const express = require('express');
const router = express.Router();

// Controllers
const contactControllers = require('../controllers/contacts.controller');

// MiddleWere
const middleWeres = require('../middlewere/verification');

// Routes
router.post('/contacts/show',middleWeres.verifyToken, contactControllers.viewContacts);
router.post('/contacts/add',middleWeres.verifyToken, contactControllers.addContact)
router.put('/contacts/update',middleWeres.verifyToken, contactControllers.updateContact)
router.delete('/contacts/delete',middleWeres.verifyToken, contactControllers.deleteContact)

module.exports = router;