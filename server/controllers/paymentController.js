const Payment = require('../models/paymentModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');


const paymentController = {
    getPayments: async (req, res) => {
        try {
            const payments = await Payment.find();
            res.json(payments);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createPayment: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('username email');
            if (!user) {
                return res.status(400).json({ msg: "User does not exist." });
            }

            const { cart, address } = req.body;
            const { _id, username, email } = user;

            const newPayment = new Payment({
                user_id: _id, username, email, cart, address
            });

            cart.filter(item => {
                return sold(item._id, item.quantity, item.sold);
            });


            await newPayment.save();
            res.json({ msg: "Payment Succes!" });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

const sold = async (id, quantity, oldSold) => {
    await Product.findOneAndUpdate({ _id: id }, {
        sold: quantity + oldSold
    });
};

module.exports = paymentController;