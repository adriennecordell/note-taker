const router = require('express').Router();
const path = require('path')
const fs = require('fs')

const dbPath = path.join(__dirname, '..', 'db', 'db.json')

router.get('/notes', (req, res) => {
    fs.readFile(dbPath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ err: "error" })
            return
        }
        res.json(JSON.parse(data))
    })
})

router.post("/notes", (req, res) => {
    fs.readFile(dbPath, "utf-8", function (err, data) {
      if (err) {
        res.status(500).json(err);
        return;
      }
      const notes = JSON.parse(data);
  
      const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: Math.random(),
      };
      notes.push(newNote);
  
      fs.writeFile(dbPath, JSON.stringify(notes), function (err) {
        if (err) {
          res.status(500).json(err);
          return;
        }
        res.status(200).json(notes);
      });
    });
  });

router.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Please provide an ID" });
    }
  
    fs.readFile(dbPath, "utf8", function (err, data) {
      const note = JSON.parse(data);
      const updateNotes = note.filter((item) => item.id != req.params.id);
      fs.writeFile(dbPath, JSON.stringify(updateNotes), function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        res.json(true);
      });
    });
  });


module.exports = router;