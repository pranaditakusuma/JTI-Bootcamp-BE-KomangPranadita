const express = require('express');
const router = express.Router();
const mongo = require('mongojs');
const db = mongo('mongodb+srv://kpranadita:s1mqfDH1qpbEguba@clusterlatihan.zeg8gie.mongodb.net/CSR', ['todos']);

router.get('/', function(req, res, next){
   let query = {};
   if (req.query.text) query.text = req.query.text;
   if (req.query.isCompleted){
    if (req.query.isCompleted === 'true') query.isCompleted = true;
    else query.isCompleted = false;
   }
   
    db.todos
    .find(query, function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    })
});


router.post('/', function(req, res, next){
    let todo = req.body;

    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        })
    } else {
        db.todos.save(todo, function(err, result){
            if(err){
                res.send(err);

            }else {
                res.json(result);
            }
        });
    }
});

router.put('/:id', function(req, res, next){
    let todo = req.body;
    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        })
    } else {
        db.todos
        .replaceOne({
            _id: db.ObjectId(req.params.id)
        }, todo, {}, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

module.exports = router;