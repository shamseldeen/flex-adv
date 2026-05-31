import { Router } from "express";
import { db } from "@workspace/db";
import { clientsTable } from "@workspace/db";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const items = await db.select().from(clientsTable);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch clients" });
  }
});

export default router;
