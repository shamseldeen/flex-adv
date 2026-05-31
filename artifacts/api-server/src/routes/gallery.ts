import { Router } from "express";
import { db } from "@workspace/db";
import { galleryTable } from "@workspace/db";
import { eq, asc, sql } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let items;
    if (category && typeof category === "string") {
      items = await db
        .select()
        .from(galleryTable)
        .where(eq(galleryTable.category, category))
        .orderBy(asc(galleryTable.sortOrder));
    } else {
      items = await db.select().from(galleryTable).orderBy(asc(galleryTable.sortOrder));
    }
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch gallery" });
  }
});

router.get("/categories", async (_req, res) => {
  try {
    const rows = await db
      .select({
        name: galleryTable.category,
        count: sql<number>`cast(count(*) as int)`,
      })
      .from(galleryTable)
      .groupBy(galleryTable.category);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch gallery categories" });
  }
});

export default router;
