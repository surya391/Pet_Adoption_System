import _ from "lodash";
import stripe from "../../config/stripe/stripe.js";
const paymentController  =  { }

paymentController.createPaymentIntent  =  async ( req, res ) => {
    try {
        const { amount } = _.pick ( req.body, [ "amount" ])
        const paymentIntent = await stripe.paymentIntents.create( {
            // amount: amount,
            // currency : "inr"
            amount: amount * 100, // Convert to paisa (1 INR = 100 paisa)
            currency: "inr"  
        })
        res.json({ clientSecret: paymentIntent.client_secret } )
    }  catch (error) {
        console.log( error );
        return res.status( 500 ).json( { error :  [ { msg : "Something went wrong while creating Payment Intent"}]})
    }
}

export default paymentController;