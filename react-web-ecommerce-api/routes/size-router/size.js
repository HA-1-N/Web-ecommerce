const router = require("express").Router();
const Size = require("../../models/size/Size");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../verifyToken");

// Create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    // const newSize = new Size(req.body);
    // try {
    //     const savedSize = await newSize.save();
    //     res.status(200).json(savedSize);
    // } catch (error) {
    //     res.status(500).json(error)
    // }

   await Size.findOne({'size' : req.body.size}, 'size')
        .then(data => {
            if (data == null) {
                const createNewSize = async () => {
                    const newSize = new Size(req.body);
                    try {
                        const savedSize = await newSize.save();
                        res.status(200).json(savedSize);
                    } catch (error) {
                        res.status(500).json(error)
                    }
                }
                createNewSize();
            } else {
                res.status(501).json("Data existed !");
            }          
        })
        .catch(err => {
            //nếu truy vấn thất bại hoặc giá trị đặt vào không hợp lệ
            res.status(501).json(err)
        });
})

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Size.findByIdAndDelete(req.params.id);
        res.status(200).json("Size has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedSize = await Size.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedSize);
    } catch (error) {
        res.status(500).json(error);
    }
});


// Get All Size
router.get("/",
    // verifyTokenAndAdmin
    async (req, res) => {

        const queryNew = req.query.new;  // lấy giá trị của key new trong query parameter từ client gửi lên server

        try {
            let totalSize;
            if (queryNew) {
                totalSize = await Size.find().sort({ createdAt: -1 }).limit(1);
            } else {
                totalSize = await Size.find();
            }
            res.status(200).json(totalSize);
        } catch (error) {
            res.status(500).json(error);
        }
    })

module.exports = router;