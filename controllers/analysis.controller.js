exports.getAnalysis = async (req, res) => {
  try {
    res.render("analysis");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching Analysis");
  }
};
