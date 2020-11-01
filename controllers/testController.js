const { Op } = require("sequelize");
const { Set, Question, QuestionImage, SolutionImage, Bookmark, GradeInfo, UserSet, Try } = require("../models");

exports.getTests = async (req, res) => {
    try {
        const tests = await Set.findAll({
            where: {
                grade_info_id: { [Op.ne]: null }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            }
        })

        res.json(tests);
    } catch (error) {
        console.log(error);
        // TODO : error code
        res.json(error);
    }
}

exports.getTest = async (req, res) => {
    try {
        const test = await Set.findOne({
            where: { id: req.params.id },
            include: [{
                model: Question,
                through: { attributes: ["question_number"] },
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
                // {
                //     model: GradeInfo,
                //     as: "grade_info",
                //     attributes: {
                //         exclude: ["createdAt", "updatedAt", "deletedAt"]
                //     }
                // }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            }
        });

        const questions = [];
        for (const question of test.questions) {
            const bookmark = await Bookmark.findOne({
                where: {
                    user_id: res.locals.userId,
                    question_id: question.id,
                }
            });

            return_question_images = [];
            return_solution_images = [];
            for (const question_image of question.question_image) {
                return_question_images.push(question_image.question_image_url);
            }

            for (const solution_image of question.solution_image) {
                return_solution_images.push(solution_image.solution_image_url);
            }

            questions[question.QuestionSetRelation.question_number - 1] = {
                "id": question.id,
                "answer_type": question.answer_type,
                "score": question.score,
                "question_image": return_question_images,
                "solution_image": return_solution_images,
                "correct_answer": question.correct_answer,
                "bookmark": bookmark ? true : false,
            }
        }

        res.json(questions);
    } catch (error) {
        console.log(error);
        // TODO : error code
        res.json(error);
    }
}

exports.postTest = async (req, res) => {
    try {
        const newTries = [];
        let set_finished = true;
        let total_score = 0;
        let total_time = 0;

        for (const trial of req.body) {
            const question = await Question.findByPk(trial.question_id);
            const newTry = {
                excluded_option: parseInt(trial.excluded_option, 2),
                // 01001
                time_taken: trial.time_taken,
                choice: trial.choice,
                earned_score: (trial.choice == question.correct_answer) ? question.score : 0,
                exited: trial.exited,
                test_type: 3,
                // 1 : evaluation
                // 2 : recommendation
                // 3 : normal test
                user_id: res.locals.userId,
                // TODO : could be changed to req.user.id
                question_id: trial.question_id,
                set_id: req.params.id
                // when test type is 3
            };

            total_time += trial.time_taken;
            total_score += newTry.earned_score;
            if (trial.exited) set_finished = false;

            newTries.push(newTry);
        }

        const newRows = await Try.bulkCreate(newTries);
        if (set_finished) {
            const set_info = await UserSet.findOne({
                where: {
                    user_id: res.locals.userId,
                    set_id: req.params.id
                }
            });

            if (set_info) {
                await UserSet.update({
                    time: total_time,
                    score: total_score,
                }, {
                    where: {
                        user_id: res.locals.userId,
                        set_id: req.params.id
                    }
                })
            } else {
                await UserSet.create({
                    user_id: res.locals.userId,
                    set_id: req.params.id,
                    time: total_time,
                    score: total_score,
                })
            }
        }

        res.json("success");
    } catch (error) {
        console.log(error);
        // TODO : error code
        res.json(error);
    }
}