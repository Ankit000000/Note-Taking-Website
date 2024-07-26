const { showall, showspecific, add_new, delete_post, update_favourite, update_hyperlink_partial } = require('../controllers/hyperlinksController');
const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


router.get('/every-post', showall);

router.get('/specific-hyperlink/:id', showspecific);

router.delete('/:id', delete_post);

router.post('/post', upload.single('image'), add_new);

router.patch('/favourite/:id', update_favourite);

router.patch('/update-hyperlink/:id', upload.single('image'), update_hyperlink_partial);

module.exports = router;