const express = require('express');
const router = express.Router()

const {getItems, createItem, getItem, deleteItem,updateItem} = require('../controller/itemsController');

router.route('/').get(getItems).post(createItem)
router.route('/:id').get(getItem).delete(deleteItem).put(updateItem)

module.exports = router