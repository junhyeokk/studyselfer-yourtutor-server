const { Set, Question, QuestionImage, SolutionImage } = require("../models");

const getSets = async (req, res) => {
    try {
        // TODO : dealing with parameters
        const sets = await Set.findAll({
            attributes : {
                exclude : ['createdAt', 'updatedAt', 'deletedAt']
            }
        });

        res.json(sets);
    } catch (error) {
        console.log(error);
        // TODO : error code
        res.json(error);
    }
}

const getSet = async(req, res) => {
    try {
        const set = await Set.findAll({
            where : { id : req.params.id },
            include : {
                model : Question,
                through : { attributes : [] },
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
                },
            },
            attributes : {
                exclude : ['createdAt', 'updatedAt', 'deletedAt']
            }
        });

        res.json(set);
    } catch (error) {
        console.log(error);
        // TODO : error code
        res.json(error);
    }
}

exports.getSets = getSets;
exports.getSet = getSet;