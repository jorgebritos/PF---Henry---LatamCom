const { Router } = require("express");
const axios = require("axios");
const { Op } = require("sequelize");
const { Comment, User } = require("../db.js");
const router = Router();


router.get('/', async (req, res) => {

    let commentTable = await Comment.findAll({
        include: {
            model: User,
            attributes: ["username"],
            through: {
                attributes: []
            }
        },
        order: [
            ['id', 'ASC']
        ]
    })

    res.send(commentTable);
})

router.post('/', async (req, res) => {
    try {
        const { comment, rating, idUser } = req.body
        if (!comment || !rating || !idUser) {
            return res.status(422).send("Missing data")
        }

        
        const newComment = await Comment.create({
            comment,
            rating
        })
        
        const searchUser = await User.findOne({
            where: { id: idUser }
        })

        newComment.addUser(searchUser)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(404)
    }
})

router.put('/:id', async (req, res) => {
    const selectedComment = await Comment.findOne({
        where: {
            id: req.params.id
        }
    });
    if (selectedComment) {
        let data = { ...req.body }

        let keys = Object.keys(data);

        keys.forEach(k => {
            selectedComment[k] = data[k]
        });

        await selectedComment.save()

        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router