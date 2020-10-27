const { Question, QuestionImage, SolutionImage, Bookmark } = require("../models");

exports.getQuestions = async (req, res) => {
    try {
        // TODO : dealing with parameters
        const questions = await Question.findAll({
            attributes : {
                exclude : ['createdAt', 'updatedAt', 'deletedAt']
            }
        });

        res.json(questions);
    } catch (error) {
        console.log(error);
        // TODO : error code
        res.json(error);
    }
}

exports.getQuestion = async (req, res) => {
    try {
        const question = await Question.findOne({
            where : { id : req.params.id },
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
                where : { user_id : res.locals.userId },
                // TODO : could be changed to req.user.id
                attributes : {
                    exclude : ['createdAt', 'updatedAt', 'deletedAt', 'user_id', 'question_id']
                }
            }],
            attributes : {
                exclude : ['createdAt', 'updatedAt', 'deletedAt']
            }
        });

        res.json(question);
    } catch(error) {
        console.log(error);
        // TODO : error code
        res.json(error);
    }
}