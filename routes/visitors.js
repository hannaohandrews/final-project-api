const router = require("express").Router();

module.exports = db => {
  // get request for the form 
  router.get("/visitors", (req, res) => {
    db.query(
      `
      SELECT * 
      FROM visitors`
    )
    .then(result => {
      res.status(200).json({visitors: result.rows})
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  //GETTING specific visitor

  router.post("/visitors", (req,res) => {
    db.query(
        `
        INSERT INTO visitors (first_name,last_name, phone, email, password) 
        VALUES($1::text, $2::text, $3::text, $4::text, $5::text)
        RETURNING *
        `,[req.body.first_name, req.body.last_name, req.body.phone, req.body.email, req.body.password])
 
    .then(result => {
      res.status(200).json({visitors: result.rows});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};