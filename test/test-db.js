const test = require("ava");
const db = require("../db")({
  sqliteFile: "test.sqlite3",
  test: true
})

test.serial("create payment and get payment", async function(t) {
  await db.initDB()
  let payment = null
  try {
    payment = await db.createPayment({
      payee: "payee",
      user_id: "user_id",
      endpoint: "endpoint",
      point: 5,
      price: 3,
      paid: false
    })
  } catch(err) {
    t.fail(err)
    return
  }
  if (!(payment.payee === "payee" 
    && payment.user_id === "user_id" 
    && payment.endpoint === "endpoint" 
    && payment.point === 5 
    && payment.price === 3 
    && payment.paid === false)) {
    t.fail()
    return
  }

  let payments = null
  try {
    payments = await db.getPayments()
  } catch(err) {
    t.fail(err)
    return
  }
  if (!(payments.length === 1 && payments[0].payee === "payee")) {
    t.fail()
    return
  }
  t.pass()
})
