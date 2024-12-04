const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database/db.sqlite",
});

const Coupon = sequelize.define("Coupon", {
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    discountType: {
        type: DataTypes.ENUM("percentage", "flat"),
        allowNull: false,
    },
    discountValue: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});

module.exports = { Coupon, sequelize };