var express = require('express'),
    router = express.Router(),
    materiaModel = require('../models/Materia');

router.get('/', function (req, res) {
    materiaModel.find({}, function (err, materias) {
        if (err) {
            res.status(500);
            res.json({
                status: 500,
                err
            });
        } else {
            //console.log(materias);
            res.json(materias);
        }
    });
});

router.get('/:name', function (req, res) {
    if (req.params.name) {
        materiaModel.findOne({
            nombre: req.params.name
        }, function (err, materia) {
            if (err) {
                res.status(500);
                res.json({
                    status: 500,
                    err
                });
            } else {
                res.json(materia);
            }
        });
    } else {
        res.status(400);
        res.json({
            status: 400,
            err: 'Bad Request'
        })
    }
});
router.get('/delete/:name', function (req, res) {
    if (req.params.name) {
        materiaModel.deleteOne({
            nombre: req.params.name
        }, function (err, materia) {
            if (err) {
                res.status(500);
                res.json({
                    status: 500,
                    err
                });
            } else {
                res.json(materia);
            }
        });
    } else {
        res.status(400);
        res.json({
            status: 400,
            err: 'Bad Request'
        })
    }
});

router.post('/', function(req,res){
    let Materia = new materiaModel({
        nombre: req.body.name,
        uv: req.body.uv,
        descripcion: req.body.descripcion
    })

    Materia.save(function(err){
        if (err){
            res.status(500)
            res.send({err});
        }
        res.send({message: "saved" , success:true});
    });
});

module.exports = router;