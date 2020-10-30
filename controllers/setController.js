const { Set, Question, QuestionImage, SolutionImage, Bookmark, GradeInfo } = require("../models");

exports.getSets = async (req, res) => {
    try {
        // TODO : dealing with parameters
        const sets = await Set.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            }
        });

        res.json(sets);
    } catch (error) {
        console.log(error);
        // TODO : error code
        res.json(error);
    }
}

exports.getSet = async (req, res) => {
    try {
        const set = await Set.findOne({
            where: { id: req.params.id },
            include: [{
                model: Question,
                through: { attributes: [] },
                include: [
                    {
                        model: QuestionImage,
                        as: "question_image",
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'deletedAt']
                        }
                    },
                    {
                        model: SolutionImage,
                        as: "solution_image",
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'deletedAt']
                        }
                    },
                    {
                        model: Bookmark,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'deletedAt']
                        }
                    },
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt']
                },
            },
            {
                model: GradeInfo,
                as: "grade_info",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"]
                }
            }],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            }
        });

        res.json(set);
    } catch (error) {
        console.log(error);
        // TODO : error code
        res.json(error);
    }
}