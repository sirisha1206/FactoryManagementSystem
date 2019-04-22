const express = require('express');
const router = express.Router();
const passport = require('passport');
const Stepgroup = require('../../models/machine/stepgroup');

//Get
router.get('/all',passport.authenticate('jwt',{session : false}),  (req, res, next) => {
    console.log("hi");
    Stepgroup.getStepgroups((err, data) => {
        res.json(data);
    });
    //res.send('Redirected to Contant list');
});

router.get('/get/:name',passport.authenticate('jwt',{session : false}),  (req, res, next) => {
    var name = req.params.name;
    //console.log(name);
    Stepgroup.getStepGroupNames(name,(err, data) => {
        res.json(data);
    });
});

//Create
router.post('/create',passport.authenticate('jwt',{session : false}),  (req, res, next) => {
    let newStepgroup = new Stepgroup({
        name: req.body.name,
        description : req.body.description,
        steps:req.body.steps
    });
    Stepgroup.addStepgroup(newStepgroup, (err, stepgroup) => {
        if (err) {
            res.json({ success: false, msg: "Failed to Add Stepgroup." });
        } else {
            res.json({ success: true, msg: "Stepgroup Added." });
        }
    });
});

//Update
router.put('/update/:id',passport.authenticate('jwt',{session : false}),  function (req, res, next) {
    //console.log(req.body);
    var id = req.params.id;
    var update = {
        name: req.body.name,
        description : req.body.description,
        steps:req.body.steps
    };
    Stepgroup.updateStepgroup(id, update, (err, machineGroup) => {
        if (err) {
            res.json({ msg: 'Failed while updating Stepgroup', status: 'error' });
        } else {
            res.json({ msg: 'Stepgroup updated successfully' });
        }
    });
});

//Delete
router.delete('/delete/:id',passport.authenticate('jwt',{session : false}),  (req, res, next) => {
    Stepgroup.deleteStepgroup(req.params.id, (err, result) => {
        if (err) {
            res.json({ msg: 'Failed while deleting Stepgroup', status: 'error', success: false });
        } else {
            res.json({ msg: 'Stepgroup deleted successfully' });
        }
    })
});

module.exports = router;