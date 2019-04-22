const express = require('express');
const router = express.Router();
const passport = require('passport');
const Part = require('../../models/machine/part');

//Get
router.get('/all', passport.authenticate('jwt',{session : false}), (req, res, next) => {
    Part.getParts((err, data) => {
        res.json(data);
    });
});

router.get('/get/:name',passport.authenticate('jwt',{session : false}),  (req, res, next) => {
    var name = req.params.name;
    //console.log(name);
    Part.getPartNames(name,(err, data) => {
        res.json(data);
    });
});

//Create
router.post('/create',passport.authenticate('jwt',{session : false}),  (req, res, next) =>{
    let newPart = new Part({
        name : req.body.name,
        description : req.body.description,
        isSerial: req.body.isSerial,
        qrCode : req.body.qrCode,
        availableQuantity:req.body.availableQuantity
    });
    newPart.qrCode = "{ partName :" + newPart.name +"}";
    Part.addPart(newPart, (err, reason) =>{
        if(err){
            res.json({success : false, msg : "Failed to Add part."+err});
        }else{
            res.json({success : true, msg : "Part Added."});
        }
    });
});

//Update
router.put('/update/:id',passport.authenticate('jwt',{session : false}),  function (req, res,next) {
    var id = req.params.id;
    var update = { 
        name : req.body.name,
        description : req.body.description,
        isSerial: req.body.isSerial,
        qrCode : req.body.qrCode,
        availableQuantity:req.body.availableQuantity
    };
    update.qrCode = "{ partName :" + update.name + "}"
    Part.updatePart(id, update, (err, reason) => {
         if (err) {
            res.json({ msg: 'Failed while updating part', status: 'error' });
        } else {
            res.json({ msg: 'new part updated successfully' });
        }
    });
});

//Delete
router.delete('/delete/:id',passport.authenticate('jwt',{session : false}),  (req, res, next) => {
    Part.deletePart(req.params.id,(err, result) => {
        if (err) {
            res.json({ msg: 'Failed while deleting part', status: 'error',success:false });
        } else {
            res.json({ msg: 'part deleted successfully' });
        }
    })
});

module.exports = router;