var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
app.use(express.json());

//--------SQL Database connection------------//
const Sequelize = require("sequelize");
const db = new Sequelize("transapp", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

var PORT = 3000;

//----------------E N D P O I N T S ---------------//

app.post("/", (req, res) => {
  const { title, amount, entryType, date } = req.body;
  console.log(title, amount, entryType, date);

  try {
    db.query(
      "INSERT INTO transactions (title, amount, entryType, date) VALUES (?,?,?,?)",
      {
        replacements: [title, amount, entryType, date],
      }
    ).then(() => {
      res.status(201).send({ msg: "transaction successfully created" });
    });
  } catch {
    res.status(500).send();
  }
});

app.put("/", (req, res) => {
  const { id, title, date, amount } = req.body;

  try {
    db.query(
      "UPDATE transactions SET title = ?, date = ?, amount = ?  WHERE ID=?",
      {
        replacements: [title, date, amount, id],
      }
    ).then(() => {
      res.status(201).send({ msg: "entry updated" });
    });
  } catch {
    res.status(500).send();
  }
});

app.delete("/", (req, res) => {
  const id = req.body.id;
  console.log(id);

  try {
    db.query("UPDATE transactions SET displayed = 'N' WHERE ID=?", {
      replacements: [id],
    }).then(() => {
      res.status(201).send({ msg: "entry marked as deleted" });
    });
  } catch {
    res.status(500).send();
  }
});

app.get("/", (req, res) => {
  console.log("/get entry type - Time:" + Date());
  try {
    db.query("SELECT * FROM transactions WHERE DISPLAYED = 'Y'").then(
      (response) => {
        res.status(201).send(response[0]);
      }
    );
  } catch {
    res.status(500).send();
  }
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
