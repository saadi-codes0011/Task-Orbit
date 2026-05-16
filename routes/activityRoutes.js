const express = require('express');
const router = express.Router();
const ActivityLog = require('../modals/ActivityLog');
router.get('/', async (req, res) => {
  try {
    const logs = await ActivityLog.find().sort({ timestamp: -1 }).limit(10);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/clear', async (req, res) => {
  try {
    await ActivityLog.deleteMany({}); 
    res.status(200).json({ message: "History cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {

    await ActivityLog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Activity deleted successfully"
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
});

module.exports = router;