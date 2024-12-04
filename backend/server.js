const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models/coupon");
const couponRoutes = require("./routes/couponRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

sequelize.sync({ force: true }).then(async () => {
    const { Coupon } = require("./models/coupon");

    await Coupon.bulkCreate([
        { code: "DISCOUNT10", discountType: "percentage", discountValue: 10, expiresAt: "2024-12-31" },
        { code: "FLAT5", discountType: "flat", discountValue: 5, expiresAt: "2024-12-15" },
    ]);

    console.log("Database synced and seeded!");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});

app.use("/api/coupons", couponRoutes);
