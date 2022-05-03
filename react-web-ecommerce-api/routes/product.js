const router = require("express").Router();
const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

// CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error)
    }
});


// UPDATE

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET PRODUCT

router.get("/find/:id",
    // verifyTokenAndAdmin, 
    async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json(error);
        }
    });

// GET ALL PRODUCTS

router.get("/",
    //  verifyTokenAndAdmin,
    async (req, res) => {

        const queryNew = req.query.new;  // lấy giá trị của key new trong query parameter từ client gửi lên server
        const queryCategory = req.query.category;

        try {

            let products;

            if (queryNew) {
                products = await Product.find().sort({ createdAt: -1 }).limit(1);
            } else if (queryCategory) {
                products = await Product.find({     // lọc tìm kiếm theo category khi có query truyền vào là các phần tử thuộc mảng đó
                    categories: {
                        $in: [queryCategory],
                    }
                });
            } else {
                products = await Product.find();
            }

            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error);
        }
    });

module.exports = router;