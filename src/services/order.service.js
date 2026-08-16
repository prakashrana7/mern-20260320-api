import { 
    ORDER_STATUS_CANCELLED, 
    ORDER_STATUS_CONFIRMED,
    ORDER_STATUS_DELIVERED,
    ORDER_STATUS_SHIPPED 
} from "../constants/orderStatus.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Payment from "../models/Payment.js";
import { 
    PAYMENT_METHOD_CASH,
    PAYMENT_METHOD_ONLINE,
    PAYMENT_STATUS_FAILED, 
    PAYMENT_STATUS_SUCCESS 
} from "../constants/payment.js";
import { payViaKhalti } from "../utils/payment.js";
import userService from "./user.service.js";
import mongoose from "mongoose";

//for admin
const getOrders = async () => {
    return await Order.aggregate([
    {
    $sort: {
    createdDate: -1,
       },
    },

    // Get user information
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },

    // Get product information
    {
      $lookup: {
        from: "products",
        localField: "orderItems.product",
        foreignField: "_id",
        as: "orderItems",
      },
    },

    // Get payment information
    {
      $lookup: {
        from: "payments",
        localField: "payment",
        foreignField: "_id",
        as: "payment",
       },
    },
    {
      $unwind: {
        path: "$payment",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        // Order information
        _id: 1,
        orderNumber: 1,
        shippingAddress: 1,
        status: 1,
        totalPrice: 1,
        createdDate: 1,

        // User information
        "user._id": 1,
        "user.name": 1,
        "user.email": 1,
        "user.phone": 1,

        // Product information
        "orderItems._id": 1,
        "orderItems.name": 1,
        "orderItems.price": 1,
        "orderItems.brand": 1,
        "orderItems.category": 1,
        "orderItems.imageUrls": 1,

        // Payment information
        "payment._id": 1,
        "payment.transactionId": 1,
        "payment.amount": 1,
        "payment.method": 1,
        "payment.status": 1,
        "payment.createdAt": 1,
      },
    },
  ]);
};

const getOrderById = async (id) => {
    const order = await Order.findById(id)
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls")
    .populate("payment", "transactionId amount method status");

    if(!order) throw{
        status:404,
        message:"Order not found."
    }

    return order;
};

const createOrder = async (data, authUser) => {
    const user = await userService.getById(authUser._id, authUser);

    if (!data.shippingAddress) {
        data.shippingAddress = user.address;
    }
    const productIds = data.orderItems.map((item) => item.product);

    const products = await Product.find({
        _id: { $in: productIds },
    });

    let totalPrice = 0;

    for (const item of data.orderItems) {
        const product = products.find(
            (product) => product._id.toString() === item.product.toString()
        );

        if (!product) {
            throw {
                status: 404,
                message: "Product not found.",
            };
        }

        totalPrice += product.price * item.quantity;
    }
    
    data.totalPrice = totalPrice;
    data.orderNumber = crypto.randomUUID();
    data.user = authUser._id;

    return await Order.create(data);
};

const updateOrderStatus = async (id, status) => {
    return await Order.findByIdAndUpdate(id, { status }, { returnDocument: "after" },
    );
};

const cancelOrder = async(id) => {
     const order = await Order.findById(id);

    if (!order) {
        throw {
            status: 404,
            message: "Order not found.",
        };
    }

    if (order.status === ORDER_STATUS_CANCELLED) {
        throw {
            status: 400,
            message: "Order has already been cancelled.",
        };
    }

    if (
        order.status === ORDER_STATUS_CONFIRMED ||
        order.status === ORDER_STATUS_SHIPPED ||
        order.status === ORDER_STATUS_DELIVERED
    ) {
        throw {
            status: 400,
            message: "Order cannot be cancelled after it has been confirmed.",
        };
    }

    return await Order.findByIdAndUpdate(id, {status: ORDER_STATUS_CANCELLED }, { returnDocument: "after" },
    );
};

const deleteOrder = async (id) => {
    await Order.findByIdAndDelete(id);
};

const confirmOrder = async (id, status, authUser) => {
    const order = await getOrderById(id);

     if (order.user._id.toString() !== authUser._id.toString()) {
        throw {
            status: 403,
            message: "Access denied.",
        };
    }

    if (status?.toUpperCase() != PAYMENT_STATUS_SUCCESS) {
        await Payment.findByIdAndUpdate(order.payment, {
            status: PAYMENT_STATUS_FAILED,
        });

        throw{
            status: 400,
            message: "Payment failed.",
        };
    }
   await Payment.findByIdAndUpdate(order.payment, {
            status: PAYMENT_STATUS_SUCCESS,
        });

    return await Order.findByIdAndUpdate(id, 
        { status: ORDER_STATUS_CONFIRMED }, 
        { returnDocument: "after" },
    );
};

const getOrdersByUser = async (userId, status) => {
    const filter = {user: userId};

    if (status) filter.status = status;

    return await Order.find(filter)
     .sort({ createdDate: -1 })
     .populate("user", "name email phone")
     .populate("orderItems.product", "name brand category price imageUrls")
     .populate("payment", "transactionId amount method status createdAt");
};

const getOrdersByMerchant = async (merchantId) => {
    return await Order.aggregate([
         {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
            },
        },
        {
            $unwind: "$user",
        },
        {
            $lookup: {
                from: "products",
                localField: "orderItems.product",
                foreignField: "_id",
                as: "orderItems",
            },
        },
        {
            $match: {
                "orderItems.createdBy": new mongoose.Types.ObjectId(merchantId),
            },
        },
        {
            $project: {
                orderNumber: 1,
                payment: 1,
                shippingAddress: 1,
                status: 1,
                totalPrice: 1,
                "user._id": 1,
                "user.name": 1,
                "user.email": 1,
                "user.phone": 1,
                "orderItems._id": 1,
                "orderItems.name": 1,
                "orderItems.price": 1,
                "orderItems.brand": 1,
                "orderItems.category": 1,
                "orderItems.imageUrls": 1,
                createdDate: 1,
            },
        },
    ]);
};

const orderPaymentViaCash= async (id) => {
    const order = await getOrderById(id);

    const orderPayment = await Payment.create({
        method: PAYMENT_METHOD_CASH,
        amount: order.totalPrice,
    });

    return await Order.findByIdAndUpdate(
        id,{
        status: ORDER_STATUS_CONFIRMED,
        payment: orderPayment.id,
    },
    { returnDocument: "after" },
    );
};

const orderPaymentViaKhalti = async (id) => {
    const order = await getOrderById(id);

    const orderPayment = await Payment.create({
        method: PAYMENT_METHOD_ONLINE,
        amount: order.totalPrice,
    });

    await Order.findByIdAndUpdate(id, {
        payment: orderPayment.id,
    });

    return await payViaKhalti ({
        id: id,
        amount: order.totalPrice,
        purchaseOrderId: order.orderNumber,
        purchaseOrderName: order.orderItems[0].product.name,
        customerInfo: {
            name: order.user.name,
            email: order.user.email,
            phone: order.user.phone,
        },
    });
};

export default { 
    getOrders, 
    getOrderById, 
    getOrdersByMerchant, 
    getOrdersByUser, 
    createOrder, 
    updateOrderStatus, 
    deleteOrder, 
    cancelOrder, 
    confirmOrder, 
    orderPaymentViaCash, 
    orderPaymentViaKhalti, 
};

