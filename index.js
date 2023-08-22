let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let cors = require("cors");
const store = require("./model/store");
let paypal = require("./config/paypal");

// mongo db connection
require("./config/db");

// environmental variable config
require("dotenv").config({ debug: true });

app.use(cors());
app.use(bodyParser.json());

// Fetching files config
app.use(express.static("public"));


app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/tour"));
app.use("/api", require("./routes/news"));
app.use("/api", require("./routes/videos"));
app.use("/api", require("./routes/music"));
app.use("/api", require("./routes/store"));
app.use("/api", require("./routes/album"));

app.get("/api/pay/:id", async (req, res) => {
  let Id = req.params.id;

  if (!Id) return res.status(403).send({ message: "ID param is required" });

  let result = await store.findById(Id);
  if(result.quantity == 0){
    return res.status(403).send({ message: "Out Of stock" });
  }
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://16.171.254.234:5000/success_backend/" + result._id,
      cancel_url: "http://16.171.254.234:5000/cancel_backend/" + result._id,
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: result.title,
              sku: "001",
              price: result.price.toString(),
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: result.price.toString(),
        },
        description: result.description,
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});
app.get("/success_backend/:id", async (req, res) => {
  let Id = req.params.id;

  if (!Id) return res.status(403).send({ message: "ID param is required" });

  let result = await store.findById(Id);

  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: result.price.toString(),
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    async function (error, payment) {
      if (error) {
        throw error;
      } else {
        let quantity = result.quantity - 1;
        let updated = await store.findByIdAndUpdate(Id , { quantity });
        console.log(updated)
         res.redirect(301,`http://16.171.254.234:5000/success`)
      }
    }
  );
});
app.get("/cancel_backend/:id", (req, res) =>  res.redirect(301,`http://16.171.254.234:5000/decline`));

app.use(express.static('./build'))

app.use('*', (req, res) => {

    res.sendfile('./build/index.html');

});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
