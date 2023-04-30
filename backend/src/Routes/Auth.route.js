import express from 'express';
import User from '../Models/User.model.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post('/register', (req, res) => {

    // catch (err) {
    //     console.log(err);
    //     return res.status(err.statusCode ?? 500).send({ message: err.data });
    // }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        handle: req.body.handle,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save().then(user => res.status(200).send(user)).catch(err => console.log(err))
    // (err, user) => {
    // if (err) {
    //     res.status(500).send({ message: err });
    //     return;
    // }
    // if (req.body.roles) {
    //     Role.find({ name: { $in: req.body.roles } }, (err, roles) => {
    //         if (err) {
    //             res.status(500).send({ message: err });
    //         }
    //         user.roles = roles.map(role => role._id);
    //         user.save(err => {
    //             if (err) {
    //                 res.status(500).send({ message: err });
    //                 return;
    //             }
    //             res.send({ message: `User was registered successfully` });
    //         })
    //     })
    // }
    // else {
    //     Role.findOne({ name: `user` }, (err, role) => {
    //         if (err) {
    //             res.status(500).send({ message: err });
    //             return;
    //         }
    //         user.roles = [role._id];
    //         user.save(err => {
    //             if (err) {
    //                 res.status(500).send({ message: err });
    //                 return;
    //             }
    //             res.send({ message: `User was registered successfully` });
    //         });
    //     });
    // }
    //});
});

router.post('/signin', (req, res) => {
    User.findOne({ email: req.body.email })
        // .populate('roles')
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
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });

        })
        .catch(err => {
            return res.status(500).send({ message: err })
        });


});

export { router as users };