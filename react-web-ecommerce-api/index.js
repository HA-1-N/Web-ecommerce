const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require("./routes/stripe");
const sizeRoute = require("./routes/size-router/size");
const cors = require("cors");

const app = express();
const port = 5000;

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('DB Mongoose connect success'))
    .catch((err) => { console.log(err) });

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/sizes", sizeRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});