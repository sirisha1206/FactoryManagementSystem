const express = require('express');
const router = express.Router();
const passport = require('passport');
const Step = require('../../models/machine/step');

//Get
router.get('/all',passport.authenticate('jwt',{session : false}), (req, res, next) => {
    Step.getSteps((err, data) => {
        res.json(data);
    });
    //res.send('Redirected to Contant list');
});

router.get('/getById/:id',passport.authenticate('jwt',{session : false}), (req, res, next) => {
    Step.getStepById(req.params.id, (err, step)=>{
        if(err){
            res.json({success : false, msg : "Failed to Add user."});
        }else{
            res.json({success : true, msg : "User Added.", data:step});
        }
    });
});


//Create
router.post('/create',passport.authenticate('jwt',{session : false}), (req, res, next) =>{
    let newStep = new Step({
        name : req.body.name,
        description : req.body.description,
        parts:req.body.parts,
        documents:req.body.documents 
    });
    Step.addStep(newStep, (err, step) =>{
        if(err){
            res.json({success : false, msg : "Failed to Add user."});
        }else{
            res.json({success : true, msg : "User Added.", data:step});
        }
    });
});

//Update
router.put('/update/:id',passport.authenticate('jwt',{session : false}), function (req, res,next) {
    //console.log( req.body);
    var id = req.params.id;
    var update = { 
        name : req.body.name,
        description : req.body.description,
        parts:req.body.parts,
        documents:req.body.documents 
    };
    Step.updateStep(id, update, (err, reason) => {
         if (err) {
            res.json({ msg: 'Failed while updating contact', status: 'error' });
        } else {
            res.json({ msg: 'new contact added successfully' });
        }
    });
});

//Delete
router.delete('/delete/:id',passport.authenticate('jwt',{session : false}), (req, res, next) => {
    console.log(req.params.id);
    Step.deleteStep(req.params.id,(err, result) => {
        if (err) {
            res.json({ msg: 'Failed while deleting contact', status: 'error',success:false });
        } else {
            res.json({ msg: 'new contact added successfully' });
        }
    })
});

module.exports = router;