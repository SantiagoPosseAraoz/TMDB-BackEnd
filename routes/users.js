const express = require("express");
const router = express.Router();
const User = require("../models");
const { generateToken } = require("../config/token");
const { validateUser } = require("../middleware/validation");

router.get("/", (req, res) => {
  User.findAll().then((users) => res.send(users));
});

router.post("/login", (req, res) => {
  const { userName, password } = req.body;
  User.findOne({
    where: { userName },
  })
    .then((selectedUser) => {
      if (!selectedUser) return res.send(401);

      selectedUser.validatePassword(password).then((isValid) => {
        if (!isValid) return res.sendStatus(401);
        else {
          let token = generateToken(req.body.userName);
          res.status(201).send(token);
        }
      });
    })
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  User.create(req.body).then((user) => res.send(user));
});

router.post("/especifico", validateUser, (req, res) => {
  User.findOne({ where: { userName: req.user } }).then((user) =>
    res.send(user)
  );
});

router.post("/especifico/movies/:id", validateUser, (req, res) => {
  let arr;
  User.findOne({ where: { userName: req.user } })
    .then((usuario) => (arr = usuario.movieFavorites))
    .then(() => {
      arr = arr.filter(num => num != req.params.id)
      User.update(
        { movieFavorites: arr },
        { where: { userName: req.user } }
      ).then(() => {
        res.send("actualizado");
      });
    });
});
router.post("/especifico/tv/:id", validateUser, (req, res) => {
  let arr;
  User.findOne({ where: { userName: req.user } })
    .then((usuario) => (arr = usuario.tvFavorites))
    .then(() => {
      arr = arr.filter(num => num != req.params.id)
      User.update(
        { tvFavorites: arr },
        { where: { userName: req.user } }
      ).then(() => {
        res.send("actualizado");
      });
    });
});

router.post("/traer", (req, res) => {
  User.findOne({ where: { userName: req.body.userName } }).then((user) =>
    res.send(user)
  );
});

router.put("/moviefavorites", validateUser, (req, res) => {
  const num = Number(req.body.id); 
  let arr;
  User.findOne({ where: { userName: req.user } })
    .then((usuario) => (arr = usuario.movieFavorites))
    .then(() => {
      if (arr.indexOf(Number(req.body.id)) === -1) {
        arr.push(Number(req.body.id));
      }
      User.update(
        { movieFavorites: arr },
        { where: { userName: req.user } }
      ).then(() => {
        res.send("actualizado");
      });
    });
});

router.put("/tvfavorites", validateUser, (req, res) => {
  const num = Number(req.body.id);
  let arr;
  User.findOne({ where: { userName: req.user } })
    .then((usuario) => (arr = usuario.tvFavorites))
    .then(() => {
      if (arr.indexOf(Number(req.body.id)) === -1) {
        arr.push(Number(req.body.id));
      }
      User.update({ tvFavorites: arr }, { where: { userName: req.user } }).then(
        () => {
          res.send("actualizado");
        }
      );
    });
});

module.exports = router;
