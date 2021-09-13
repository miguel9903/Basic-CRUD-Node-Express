const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const productController = require('../controllers/products');

// Middlewares
const validateFields = require('../middlewares/validate-fields');
const existProductId = require('../middlewares/db-validators');

router.get('/', productController.getProducts);

router.get('/:id', [
    check('id', 'Invalid product ID').isMongoId(),
    check('id').custom(id => existProductId(id)),
    validateFields
], productController.getProduct);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('description', 'Descripction is required').not().isEmpty(),
    validateFields
], productController.createProduct);


router.put('/:id', [
    check('id', 'Invalid product ID').isMongoId(),
    check('id').custom(id => existProductId(id)),
    check('name', 'Name is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('description', 'Descripction is required').not().isEmpty(),
    validateFields
], productController.updateProduct);


router.delete('/:id', [
    check('id', 'Invalid product ID').isMongoId(),
    check('id').custom(id => existProductId(id)),
    validateFields
], productController.deleteProduct);

module.exports = router;