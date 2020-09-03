const router = require("express").Router();
let ToDo = require('../models/todo.model');

router.route('/').get((req, res) => {
    ToDo.find().sort('completed -createdAt')
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const completed = req.body.completed;
    const newToDo = new ToDo({
        title, completed
    });

    newToDo.save()
        .then(() => res.json('ToDo added'))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

router.route('/:id').get((req, res) => {
    ToDo.findById(req.params.id)
        .then(todo => res.json(todo))
        .catch(err => res.status(400).json(`Error: ${err}`))
});
  
router.route('/:id').delete((req, res) => {
    ToDo.findByIdAndDelete(req.params.id)
        .then(() => res.json('ToDo deleted.'))
        .catch(err => res.status(400).json(`Error: ${err}`))
});
  
router.route('/update/:id').post((req, res) => {
    ToDo.findById(req.params.id)
        .then(todo => {
            todo.title = req.body.title;
            todo.completed = req.body.completed;
  
            todo.save()
                .then(() => res.json('ToDo updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
 });

module.exports = router;