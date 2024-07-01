import { getAuth } from "firebase-admin/auth";
class Middleware {
    async decodeToken(req, res, next) {
        const authHeader = req.headers.authorization;
        if (authHeader === "Bearer" || !authHeader)
            return res.json({ message: "Unauthorized. Token is missing." });
        const token = authHeader.split(" ")[1];
        try {
            const decodedValue = await getAuth().verifyIdToken(token);
            if (decodedValue) {
                req.user = decodedValue;
                return decodedValue.email_verified
                    ? next()
                    : res.json({ message: "Unauthorized. Email not verified." });
            }
            return res.json({ message: "Unauthorized. Bad token." });
        }
        catch (e) {
            return res.json({
                message: "Internal Error: " + e.message,
            });
        }
    }
}
export default new Middleware();
//# sourceMappingURL=index.js.map