import express from "express";
import authenticationUser from '../../app/middlewares/authentication.js';
import authorizeUser from '../../app/middlewares/authorize.js';
import paymentController from "../../app/controller/payment-controller.js";

const paymentRoute = express.Router();

paymentRoute.post( "/create-payment-intent", authenticationUser, authorizeUser(['owner', 'serviceProvider']), paymentController.createPaymentIntent);

export default paymentRoute;