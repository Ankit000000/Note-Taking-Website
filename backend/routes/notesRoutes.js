const { add_new2, showspecific2, showall2, delete_post2, update_favourite2, update_note_partial } = require('../controllers/notesController');
const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload2 = multer({ dest: 'uploads2/' })


router.get('/every-note', showall2);

router.get('/specific-note/:id', showspecific2);

router.delete('/deletenote/:id', delete_post2);

router.post('/newnote', upload2.array('image', 20), add_new2);

router.patch('/favourite/note/:id', update_favourite2);

router.patch('/update-note/:id', upload2.array('image', 20), update_note_partial);

module.exports = router;