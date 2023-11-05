const router = require("express").Router();
const {
  fetchNews,
  updateNewsPreferences,
  getNewsPreferences,
  updateReadPreferences,
  getReadPreferences,
  updateFavouritePreferences,
  getFavouritePreferences,
} = require("../controllers/UserNewsController");

router.get("/", fetchNews);

router.put("/preferences", updateNewsPreferences);

router.get("/preferences", getNewsPreferences);

router.put("read", updateReadPreferences);

router.put("favourite", updateFavouritePreferences);

router.get("read", getReadPreferences);

router.get("favourite", getFavouritePreferences);

module.exports = router;
