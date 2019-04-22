const express = require('express');
const router = express.Router();
const passport = require('passport');
const Document = require('../../models/machine/document');
const upload = require('../../config/upload').upload;

//Get
router.get('/all',passport.authenticate('jwt',{session : false}),  (req, res, next) => {
    Document.getDocuments((err, data) => {
        res.json(data);
    });
    //res.send('Redirected to Contant list');
});

router.get('/get/:name',passport.authenticate('jwt',{session : false}),  (req, res, next) => {
    var name = req.params.name;
    //console.log(name);
    Document.getDocumentNames(name,(err, data) => {
        res.json(data);
    });
});

//Create
router.post('/create',passport.authenticate('jwt',{session : false}),  (req, res, next) =>{
    let newDocument = new Document({
        name : req.body.name,
        description : req.body.description,
        uploadFileName: req.body.uploadFileName,
        originalFileName: req.body.originalFileName
    });
    Document.addDocument(newDocument, (err, line) =>{
        if(err){
            res.json({success : false, msg : "Failed to Add Document."});
        }else{
            res.json({success : true, msg : "Document Added."});
        }
    });
});

//Update
router.put('/update/:id',passport.authenticate('jwt',{session : false}),  function (req, res,next) {
    //console.log( req.body);
    var id = req.params.id;
    var update = { 
        name : req.body.name,
        description : req.body.description,
        uploadFileName: req.body.uploadFileName,
        originalFileName: req.body.originalFileName
    };
    Document.updateDocument(id, update, (err, line) => {
         if (err) {
            res.json({ msg: 'Failed while updating Document', status: 'error' });
        } else {
            res.json({ msg: 'new Document added successfully' });
        }
    });
});

//Delete
router.delete('/delete/:id',passport.authenticate('jwt',{session : false}),  (req, res, next) => {
    Document.deleteDocument(req.params.id,(err, result) => {
        if (err) {
            res.json({ msg: 'Failed while deleting Document', status: 'error',success:false });
        } else {
            res.json({ msg: 'Document deleted successfully' });
        }
    })
});

//Post
router.post("/upload", (req, res, next) => {
    upload(req, res, (error) => {
        if (error) {
            return res.status(501).json({ error: error });
        }
        res.json({ originalname: req.file.originalname, uploadName: req.file.filename });
    });
});
module.exports = router;