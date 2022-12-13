const { Comment, User, Product } = require("../db.js");

const reportComment = async (req, res) => {
    let { id } = req.params
    let reported = await Comment.findOne({
        where: { id: id },
        attributes: ["id", "comment"],
        include: [
            {
                model: User,
                attributes: ["id", "username"],
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
            }]
    })

    let admin = await User.findOne({
        where: { admin: true },
        include:
        {
            model: Comment,
            as: "reported",
            attributes: ["id"],
            through: {
                attributes: []
            }
        }
    })
    if (admin.reported.filter((c) => c.id === Number(id)).length) {
        return res.sendStatus(403)
    }
    if (reported && admin) {
        await admin.addReported(reported)
        await admin.save();
        return res.send(reported)
    } else {
        res.sendStatus(401)
    }

}

const getAllReported = async (req, res) => {
    let admin = await User.findOne({
        where: { admin: true },
        include:
        {
            model: Comment,
            as: "reported",
            attributes: ["id", "comment"],
            through: {
                attributes: []
            },
            include: [
                {
                    model: User,
                    attributes: ["id", "username"],
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
                }]
        }
    })
    return res.send(admin.reported)
}

const dismissReport = async (req, res) => {
    let { id } = req.params

    let admin = await User.findOne({
        where: { admin: true },
        include:
        {
            model: Comment,
            as: "reported",
            where: { id: id },
            attributes: ["id"],
            through: {
                attributes: []
            }
        }
    })

    let reported = admin.reported;
    await admin.removeReported(reported)
    await admin.save()
}

module.exports = {
    getAllReported,
    reportComment,
    dismissReport
}