const { Comment, User, Product } = require("../db.js");



const getComment = async (req, res) => {

    let commentTable = await Comment.findAll({
        include: [
            {
                model: User,
                attributes: ["username"],
                through: {
                    attributes: []
                }
            },
            {
                model: Product,
                attributes: ["id", "name"],
                through: {
                    attributes: []
                }
            }],
        order: [
            ['id', 'ASC']
        ]
    })

    res.send(commentTable);
}

const postComment = async (req, res) => {
    try {
        const { comment, rating, idUser, idProduct } = req.body
        if (!comment || !rating || !idUser || !idProduct) {
            return res.status(422).send("Missing data")
        }


        const newComment = await Comment.create({
            comment,
            rating
        })

        const searchUser = await User.findOne({
            where: { id: idUser }
        })

        const searchProduct = await Product.findOne({
            where: { id: idProduct }
        })

        await newComment.addUser(searchUser)
        await searchProduct.addComment(newComment)
        res.status(201);
    } catch (error) {
        res.sendStatus(404)
    }
}

const putComment = async (req, res) => {
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
}

const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedComment = await Comment.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!deletedComment) return 0;
        await Comment.destroy({where: { id: id }});

        return res.status(200).json("Comment deleted");
    }
    catch (err) {
        return res.status(500).send(`Comment could not be deleted (${err})`);
    }
}

module.exports = {
    getComment,
    postComment,
    putComment,
    deleteComment
}