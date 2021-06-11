module.exports = async (req, res, next) => {
  try {
    const { role } = req;
    if (role !== "admin") {
      return res.status(403).send("Not authorized");
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(403).jsend("Not authorized");
  }
};
