const Sequelize = require("sequelize");
const { Question, QuestionImage, SolutionImage, Bookmark } = require("../models");

exports.getRecommend = async (req, res) => {
    try {
        // TODO : request to deep learning server
        const recommend = await Question.findAll({
            limit : parseInt(req.query.limit) || null,
            include : [{
                model : QuestionImage,
                as : "question_image",
                attributes : {
                    exclude : ['createdAt', 'updatedAt', 'deletedAt']
                }
            },
            {
                model : SolutionImage,
                as : "solution_image",
                attributes : {
                    exclude : ['createdAt', 'updatedAt', 'deletedAt']
                }
            },
            {
                model : Bookmark,
                // TODO : could be changed to req.user.id
                attributes : {
                    exclude : ['createdAt', 'updatedAt', 'deletedAt', 'user_id', 'question_id']
                }
            }],
            attributes : {
                exclude : ['createdAt', 'updatedAt', 'deletedAt']
            },
        });

        res.json(recommend);
    } catch(error) {
        console.log(error);
        // TODO : error code
        res.json(error);
    }
}