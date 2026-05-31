import { Router } from "express";
import { db } from "@workspace/db";
import { clientsTable, galleryTable } from "@workspace/db";
import { sql } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const [{ clientsCount }] = await db
      .select({ clientsCount: sql<number>`cast(count(*) as int)` })
      .from(clientsTable);

    const [{ galleryCount }] = await db
      .select({ galleryCount: sql<number>`cast(count(*) as int)` })
      .from(galleryTable);

    const yearsExperience = new Date().getFullYear() - 2015;

    res.json({
      projectsCount: Math.max(galleryCount, 2400),
      clientsCount: Math.max(clientsCount, 300),
      yearsExperience,
      teamSize: 100,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
