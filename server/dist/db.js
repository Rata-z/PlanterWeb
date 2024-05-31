const mongoose = require("mongoose");
export const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database COnnected: ${conn.connection.host}`);
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=db.js.map