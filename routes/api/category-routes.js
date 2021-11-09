const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({include: Product}).then((dbCatergories) => {
    if (dbCatergories.length) {
      res.json(dbCatergories)
    } else {
      res.status(404).json({ message: "No Catergories found!" })
    }
  })
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({ where: { id: req.params.id },include: Product}).then((dbCategory) => {
    res.json(dbCategory)
  })
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  }).then(newCategory => {
    res.json(newCategory);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ message: "an error occured", err: err })
    // create a new tag
  })
  // create a new category
});

router.put('/:id', (req, res) => {
  Category.update({
    category_name: req.body.category_name},
    {where: {
      id: req.params.id
    }}
  ).then((updatedCategory) => {
    res.json(updatedCategory)
  }
  )
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
    // delete on Category by its `id` value
  }).then((deletedCategory) => {res.json(deletedCategory)})
});

module.exports = router;
