import { Router } from "express";
import { db } from "@workspace/db";
import { servicesTable } from "@workspace/db";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const services = await db.select().from(servicesTable);
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

export default router;
