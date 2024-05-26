import express from "express";
export const router = express.Router();

router.get("/", (req, res) => {
  res.status(404).json({
  });
});

export default router;
