const { Bookmark } = require("../models");

exports.postBookmark = async (req, res) => {
    try {
        const bookmark = await Bookmark.findOrCreate({
            where : {
                user_id : res.locals.userId,
                // TODO : could be changed to req.user.id
                question_id : req.body.question_id
            },
        });

        res.json(bookmark[0].id);
    } catch (error) {
        console.log(error);
        // TODO : error code
        res.json(error);
    }
}

exports.getBookmark = async (req, res) => {
    try {
        const where = {...req.query, user_id : res.locals.userId};
        const bookmark = await Bookmark.findAll({
            where,
            attributes : {
                exclude : ['createdAt', 'updatedAt', 'deletedAt']
            }
        });

        res.json(bookmark);
    } catch (error) {
        console.log(error);
        // TODO : error code
        res.json(error);
    }
}

exports.deleteBookmark = async (req, res) => {
    try {
        const where = {...req.query, user_id : res.locals.userId};
        const bookmark = await Bookmark.destroy({
            where,
        });

        res.json(bookmark);
    } catch (error) {
        console.log(error);
        // TODO : error code
        res.json(error);
    }
}