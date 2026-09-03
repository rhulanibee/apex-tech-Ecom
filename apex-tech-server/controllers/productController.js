export const createProductController = (Product) => {
  return {
    // GET /api/products (with optional ?category= and ?isFlashDeal= filters)
    getAllProducts: async (req, res, next) => {
      try {
        const { category, isFlashDeal } = req.query;
        const filter = {};

        if (category && category !== 'all') {
          filter.category = category;
        }

        if (isFlashDeal !== undefined) {
          filter.isFlashDeal = isFlashDeal === 'true';
        }

        const products = await Product.findAll({ where: filter });
        res.status(200).json({
          status: 'success',
          results: products.length,
          data: { products },
        });
      } catch (err) {
        next(err);
      }
    },

    // GET /api/products/:id
    getProductById: async (req, res, next) => {
      try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
          return res.status(404).json({
            status: 'fail',
            message: `Product with ID ${req.params.id} not found`,
          });
        }
        res.status(200).json({
          status: 'success',
          data: { product },
        });
      } catch (err) {
        next(err);
      }
    },

    // POST /api/products
    createProduct: async (req, res, next) => {
      try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({
          status: 'success',
          data: { product: newProduct },
        });
      } catch (err) {
        next(err);
      }
    },
  };
};