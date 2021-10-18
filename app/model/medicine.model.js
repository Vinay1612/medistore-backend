module.exports = (sequelize, Sequelize) => {
    const medicine = sequelize.define("Medicine", {
      c_name: {
        type: Sequelize.STRING,
      },
      c_batch_no: {
        type: Sequelize.STRING,
      },
      d_expiry_date: {
        type: Sequelize.DATE,
      },
      n_balance_qty: {
          type: Sequelize.INTEGER
      },
      c_packaging: {
        type: Sequelize.STRING,
      },
      c_unique_code: {
        type: Sequelize.INTEGER
      },
      c_schemes: {
        type: Sequelize.STRING,
      },
      n_mrp: {
          type: Sequelize.FLOAT
      },
      c_manufacturer: {
        type: Sequelize.STRING,
      },
      hsn_code: {
        type: Sequelize.INTEGER
      }
    }, {
        timestamps: false,
    });
  
    return medicine;
  };