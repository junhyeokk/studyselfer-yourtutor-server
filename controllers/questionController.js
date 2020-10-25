const { Question, QuestionImage, SolutionImage } = require("../models");

const getQuestions = async (req, res) => {
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

const getQuestion = async (req, res) => {
    try {
        const question = await Question.findAll({
            where : { id : req.params.id },
            include : [{
                model : QuestionImage,
                attributes : {
                    exclude : ['createdAt', 'updatedAt', 'deletedAt']
                }
            },
            {
                model : SolutionImage,
                attributes : {
                    exclude : ['createdAt', 'updatedAt', 'deletedAt']
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

exports.getQuestions = getQuestions;
exports.getQuestion = getQuestion;