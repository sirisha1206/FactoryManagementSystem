const express = require('express');
const router = express.Router();
const passport = require('passport');
const Template = require('../../models/machine/template');

//Get
router.get('/all',passport.authenticate('jwt',{session : false}),  (req, res, next) => {
    console.log("all");
    Template.getTemplates((err, data) => {
        res.json(data);
    });
    //res.send('Redirected to Contant list');
});

router.get('/get/:name',passport.authenticate('jwt',{session : false}),  (req, res, next) => {
    var name = req.params.name;
    //console.log(name);
    Template.getTemplateNames(name,(err, data) => {
        res.json(data);
    });
});

//Create
router.post('/create',passport.authenticate('jwt',{session : false}),  (req, res, next) =>{
    console.log(req.body);
    let newTemplate = new Template({
        name : req.body.name,
        description : req.body.description,
        machine : req.body.machine,
        reason: req.body.reason,
        stepgroups: req.body.stepgroups
    });
    Template.addTemplate(newTemplate, (err, Template) =>{
        if(err){
            res.json({success : false, msg : "Failed to Add user."});
        }else{
            res.json({success : true, msg : "User Added."});
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
        machine : req.body.machine,
        reason: req.body.reason,
        stepgroups: req.body.stepgroups
    };
    Template.updateTemplate(id, update, (err, Template) => {
        if (err) {
            res.json({ msg: 'Failed while updating contact', status: 'error' });
        } else {
            res.json({ msg: 'new contact added successfully' });
        }
    });
});

//Delete
router.delete('/delete/:id',passport.authenticate('jwt',{session : false}),  (req, res, next) => {
    Template.deleteTemplate(req.params.id,(err, result) => {
        if (err) {
            res.json({ msg: 'Failed while deleting contact in Template', status: 'error',success:false });
        } else {
            res.json({ msg: 'new contact added to Template successfully' });
        }
    })
});

module.exports = router;