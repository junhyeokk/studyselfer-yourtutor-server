const { Part, Set, Question, QuestionImage, SolutionImage, UserSet, Try } = require("../models");

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
        let random_num = 0;

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
            // TODO : change code to destroy chapter relation
        } else if (req.body.try) {
            await Try.create({
                excluded_option : parseInt(req.body.try.excluded_option, 2),
                time_taken : req.body.try.time_taken,
                exited : req.body.try.exited,
                test_type : 1,
                user_id : res.locals.userId,
                question_id : req.body.try.question_id,
            });

            random_num = Math.floor(Math.random() * 5) + 1
        }

        const result = {
            "expected_grade" : 3,
            "raw_score" : 70,
            "standard_score" : 124,
            "good" : ["jisu and log", "hamsu geukhan", "pyung myun gok sun"],
            "bad" : ["sunyul and johap", "jiphap myungjae", "tongkae"]
        }

        if (random_num == 3) {
            res.json(result)
            res.end();
        }

        const q_num = await Question.count();
        let id = Math.floor(Math.random() * q_num) + 1;
        let q = await Question.findByPk(id);

        while (!q) {
            id = Math.floor(Math.random() * q_num) + 1;
            q = await Question.findByPk(id);
        }
        // TODO : get next question from deep learning server

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