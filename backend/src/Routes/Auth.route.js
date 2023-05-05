import express from 'express';
import User from '../Models/User.model.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post('/register', (req, res) => {

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        handle: req.body.handle,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save()
        .then(() => res.status(200).send({ message: `User was registered successfully` }))
        .catch(err => {
            res.status(500).send({ message: err })
        })

});

router.post('/signin', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: `User not found` });
            }

            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid username/password combination"
                });
            }

            const authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push(`ROLE_${user.roles[i].name.toUpperCase()}`);
            };

            const token = jwt.sign({ id: user.id }, process.env.DB_URI, { expiresIn: 86400 });

            res.status(200).send({
                id: user._id,
                name: user.name,
                roles: authorities,
                accessToken: token
            });

        })
        .catch(err => {
            return res.status(500).send({ message: err })
        });


});

export { router as users };