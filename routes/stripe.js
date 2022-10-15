const router = require("express").Router()
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);
// const Stripe = require("stripe")
// const stripe = Stripe('sk_test_51LsNrZCbgMrWnfY4ojJ0e4hx8XzEjQ2Prtd1GhCe8lBOZ0WL7SbiJudxMOyWYz2zVz8OgdIu0lqW5Xev2zNjsGTg00Qv6EzbiV')

router.post("/payment", (req, res) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd"
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).json(stripeErr)
            } else {
                res.status(200).json(stripeRes)
            }
        })
})

module.exports = router