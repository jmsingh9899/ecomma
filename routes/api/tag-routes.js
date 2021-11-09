const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({ include: Product }).then(dbTags => {
    if (dbTags.length) {
      res.json(dbTags)
    } else {
      res.status(404).json({ message: "No Tags found!" })
    }
    // find all tags
    // be sure to include its associated Product data
  })
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    }, include: Product
  }).then((dbTag) => {
    if (dbTag) {
      res.json(dbTag)
    } else {
      res.status(404).json({ message: 'No such Tag found' })
    }
  })
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  }).then(newTag => {
    res.json(newTag);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ message: "an error occured", err: err })
    // create a new tag
  })
});

router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name,
    where: {
      id: req.params.id
    }
  }).then((updatedTag) => {
    res.json(updatedTag)
  }
  )
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
    // delete on tag by its `id` value
  }).then((deletedTag) => {res.json(deletedTag)})
});

module.exports = router;
