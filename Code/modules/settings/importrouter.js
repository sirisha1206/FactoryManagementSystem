const express = require('express');
const router = express.Router();
const passport = require('passport');
const Import = require('../../models/settings/import');
const Machine = require('../../models/machine/machine');
const Area = require('../../models/machine/area');
const Line = require('../../models/machine/line');
const Machinegroup = require('../../models/machine/machinegroup');

//Get
router.get('/importHistory', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Import.getImports((err, data) => {
        res.json(data);
    });
});

//Create
router.post('/create', passport.authenticate('jwt', { session: false }),(req, res, next) => {
    if (req.body.moduleName === "machine") {
        var data = req.body.data;
        for (let i = 0; i < data.length; i++) {
            Area.getAreaByName(req.body.data[i].area, (err, doc) => {
                data[i].area = doc[0]._id;
                Line.getLineByName(req.body.data[i].line, (err, doc) => {
                    data[i].line = doc[0]._id;
                    Machinegroup.getMachineGroupByName(req.body.data[i].machinegroup,(err, doc) => {
                        data[i].machinegroup = doc[0]._id;
                        let newMachine = new Machine({
                            name: data[i].name,
                            machinegroup: data[i].machinegroup,
                            company: data[i].company,
                            model: data[i].model,
                            dateOfInstall: data[i].dateOfInstall,
                            qrCode: "",
                            area: data[i].area,
                            line: data[i].line,
                            barcode: data[i].barcode,
                        });
                        newMachine.qrCode = "{ machineName :" + newMachine.name + ",area:" + newMachine.area + ",line:" + newMachine.line + "}";
                        Machine.addMachine(newMachine, (err, docs) => {
                            console.log(docs);
                        });
                    });
                });
            });
        }
        let today = new Date();
        let newImport = new Import({
            moduleName: req.body.moduleName,
            date: today.getMonth()+"-"+today.getDate()+"-"+today.getFullYear()
        });
        Import.addImport(newImport,(err, importData) => {
            if (err) {
                res.json({ success: false, msg: "Failed to import." });
            } else {
                res.json({success : true, msg : "Machine data inserted successfully"});
            }
        } )
    }
});

router.get('/download',  (req, res, next) => {
    res.download(__dirname + '../../../import-excels/machine.xlsx', "machine.xlsx");
});

module.exports = router;