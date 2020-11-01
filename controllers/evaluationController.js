const { Part, Set, Question, QuestionImage, SolutionImage, UserSet } = require("../models");

exports.getPartsInfos = async (req, res) => {
    try {
        const parts = await Part.findAll({
            include: {
                model: Set,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt", "grade_info_id", "part_id"]
                }
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"]
            }
        });

        res.json(parts);
    } catch (error) {
        console.log(error);
        // TODO : error code
        res.json(error);
    }
}

exports.postEvaluation = async (req, res) => {
    try {
        if (req.body.parts) {
            await UserSet.destroy({
                where : {
                    user_id : res.locals.userId,
                },
                force : true,
            });

            const learned_chapters = [];
            for (const chapter_id of req.body.parts) {
                const new_user_set_relation = {
                    user_id : res.locals.userId,
                    set_id : chapter_id,
                }
                learned_chapters.push(new_user_set_relation);
            }

            await UserSet.bulkCreate(learned_chapters);
        }
        // TODO : change code to destroy chapter relation

        // TODO : get next question from deep learning server

        const q_num = await Question.count();
        const id = Math.floor(Math.random() * q_num) + 1;

        const question = await Question.findOne({
            where: { id: id },
            include: [
                {
                    model : QuestionImage,
                    as : "question_image"
                },
                {
                    model : SolutionImage,
                    as : "solution_image"
                }
            ]
        });

        return_question_images = [];
        return_solution_images = [];
        for (const question_image of question.question_image) {
            return_question_images.push(question_image.question_image_url);
        }

        for (const solution_image of question.solution_image) {
            return_solution.images.push(solution_image.solution_image_url);
        }

        const return_question = {
            "id" : question.id,
            "answer_type" : question.answer_type,
            "score" : question.score,
            "question_image": return_question_images,
            "solution_image": return_solution_images,
            "correct_answer": question.correct_answer,
        };

        res.json(return_question);
    } catch (error) {
        console.log(error);
        // TODO : error code
        res.json(error);
    }
}