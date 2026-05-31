import { Router } from "express";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ error: "name, phone, and message are required" });
    }
    await db.insert(contactsTable).values({ name, phone, email: email || null, message });
    res.status(201).json({ success: true, message: "تم إرسال رسالتك بنجاح، سنتواصل معك قريباً" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit contact" });
  }
});

export default router;
