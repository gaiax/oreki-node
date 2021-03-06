const Sequelize = require("sequelize")

module.exports = function(config) {
  let sqliteFile = "payment.sqlite3"
  let test = false
  if (config !== undefined) {
    if (config.sqliteFile !== undefined) {
      sqliteFile = config.sqliteFile
    }
    if (config.test !== undefined) {
      test = config.test
    }
  }
  const sequelize = new Sequelize(
    "database",
    "",
    "",
    {
      dialect: "sqlite",
      storage: sqliteFile
    }
  )

  const Payment = sequelize.define(
    "payment",
    {
      payee: Sequelize.STRING,
      user_id: Sequelize.STRING,
      endpoint: Sequelize.STRING,
      point: Sequelize.INTEGER,
      price: Sequelize.INTEGER,
      paid: Sequelize.BOOLEAN,
      remain: Sequelize.INTEGER
    },
    {
      timestamps: true
    }
  )


  return {
    initDB: function() {
        return sequelize
          .sync({force: test})
    },
    getPayments: function() { 
      return Payment.findAll({
        where: {
          paid: false
        }
      })
    },
    createPayment: function(obj) {
      return Payment.create(obj)
    }
  }
}
