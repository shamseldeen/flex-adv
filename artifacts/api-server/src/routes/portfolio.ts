import { Router } from "express";
import { db } from "@workspace/db";
import { portfolioTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let items;
    if (category && typeof category === "string") {
      items = await db.select().from(portfolioTable).where(eq(portfolioTable.category, category));
    } else {
      items = await db.select().from(portfolioTable);
    }
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch portfolio" });
  }
});

router.get("/categories", async (_req, res) => {
  try {
    const rows = await db
      .select({
        name: portfolioTable.category,
        count: sql<number>`cast(count(*) as int)`,
      })
      .from(portfolioTable)
      .groupBy(portfolioTable.category);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [item] = await db.select().from(portfolioTable).where(eq(portfolioTable.id, id));
    if (!item) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch portfolio item" });
  }
});

export default router;
