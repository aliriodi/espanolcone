// import paypal from '@paypal/checkout-server-sdk'
const paypal = require('@paypal/checkout-server-sdk');

// Creating an environment
let clientId = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_CLIENT_SECRET;
console.log(clientId)

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
//let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let environment = new paypal.core.LiveEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

export default async function handler(req,res){
    if(req.method === 'POST'){
        const request = new paypal.orders.OrdersCreateRequest();

        request.requestBody({
            "intent": "CAPTURE",
            "purchase_units": [
                {
                    "amount": {
                        "currency_code": "USD",
                        "value": req.body.cost
                    }
                }
             ]
        });

        const response = await  client.execute(request)
console.log(response)
console.log(response.result.links.map(link=>console.log(link)))
        return res.json({id: response.result.id})

    }
}