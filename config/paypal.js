
const paypal = require('paypal-rest-sdk');

// paypal Configuration
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'Aa-W-pGeYVM_SlF1shTyfJFhV_jkkX1buwyVhju87IE2bEdPzKuQUzMG_PjETyaQu-bV9RJM9xmq2JuZ',
  'client_secret': 'EFkZvwS0shEy-5Iy-gNn1Pn2Urq1xXCmct3JaPYyw4tCRPgwi_nbVbDbdGi2iigQMJYh7JRXwsUSZGBw'
});

module.exports = paypal