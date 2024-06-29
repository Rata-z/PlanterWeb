import { firestoreDB } from "../../server.js";

export const getUserPlants = async (req, res) => {
  const uid = req.user.uid;

  // req.auth = req.user;

  try {
    const plantsSnapshot = await firestoreDB
      .collection("plants")
      .doc(uid)
      .collection("userPlants")
      .get();
    if (!plantsSnapshot) {
      return res.status(404).json({ message: "Plants not found" });
    }
    res.status(200).json(plantsSnapshot.docs.map((doc) => doc.data()));
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch plants." });
  }
};
