const Order = require("../models/Order");
const razorpay = require('razorpay');

const instance = new razorpay({
    key_id: 'rzp_test_ZDm2fyF0f5TviJ',
    key_secret: 'qqu4bZuhiLHL8e5uMlyKGYIW',
});

exports.create = async (req, res) => {
    try {
        const { user, item, address, paymentMode, total } = req.body;
        if (paymentMode === 'Online') {
            const options = {
                amount: total * 100,
                currency: 'INR',
                receipt: 'receipt_order_74394',
                payment_capture: 1,
                notes: { user, item },
            };
            const resp = {};
            await instance.orders.create(options, async (err, order) => {
                if (err) {
                    return res.status(500).json({ message: 'Error creating order' });
                }
                resp.orderId = order.id;
            });
            resp.currency = 'INR';
            resp.amount = total * 100;
            resp.receipt = 'receipt_order_74394';
            resp.payment_capture = 1;
            resp.notes = { user, item };
            return res.status(200).json(resp);
        } else {
            const created = new Order({ user, item, address, paymentMode, total });
            await created.save();
            return res.status(200).json(created);
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error creating order' });
    }
};

exports.capturePayment = async (req, res) => {
    const { paymentId, ORDER } = req.body;
    const order = new Order({
        ORDER
    });
    try {
        const paymentDetails = await instance.payments.fetch(paymentId);

        if (paymentDetails.status === 'captured') {
            order.paymentStatus = 'Paid';
            await order.save();
            res.status(200).json({
                message: 'Payment successfully captured',
                order,
            });
        } else {
            res.status(400).json({ error: 'Payment not successful' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getByUserId=async(req,res)=>{
    try {
        const {id}=req.params
        const results=await Order.find({user:id})
        res.status(200).json(results)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error fetching orders, please trying again later'})
    }
}

exports.getAll = async (req, res) => {
    try {
        let skip=0
        let limit=0

        if(req.query.page && req.query.limit){
            const pageSize=req.query.limit
            const page=req.query.page
            skip=pageSize*(page-1)
            limit=pageSize
        }

        const totalDocs=await Order.find({}).countDocuments().exec()
        const results=await Order.find({}).skip(skip).limit(limit).exec()

        res.header("X-Total-Count",totalDocs)
        res.status(200).json(results)

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error fetching orders, please try again later'})
    }
};

exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Order.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error updating order, please try again later'})
    }
}
