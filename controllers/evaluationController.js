const { Op } = require("sequelize");
const fetch = require("node-fetch");
const { Part, Set, Question, QuestionImage, SolutionImage, UserSet, Try } = require("../models");
require("dotenv").config();

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
                where: {
                    user_id: res.locals.userId,
                },
                force: true,
            });

            const learned_chapters = [];
            for (const chapter_id of req.body.parts) {
                const new_user_set_relation = {
                    user_id: res.locals.userId,
                    set_id: chapter_id,
                }
                learned_chapters.push(new_user_set_relation);
            }

            await UserSet.bulkCreate(learned_chapters);
        } else if (req.body.try) {
            const question = await Question.findByPk(req.body.try.question_id);

            await Try.create({
                excluded_option: parseInt(req.body.try.excluded_option, 2),
                time_taken: req.body.try.time_taken,
                choice: req.body.try.choice,
                earned_score: (req.body.try.choice == question.correct_answer) ? question.score : 0,
                exited: req.body.try.exited,
                test_type: 1,
                user_id: res.locals.userId,
                question_id: req.body.try.question_id,
            });
<<<<<<< HEAD

            random_num = Math.floor(Math.random() * 8) + 1
        }

        const result = {
            "expected_grade" : 3,
            "raw_score" : 70,
            "standard_score" : 124,
            "good" : ["지수와 로그", "함수의 극한", "평면곡선"],
            "bad" : ["순열과 조합", "집합과 명제", "통계"]
        }

//  	if (req.body.try) {
//		if (req.body.try.choice == 1) {
//			res.json(result)
//			res.end();
//		}
//	}

	if (random_num == 3) {
=======
        }

        const tries = await Try.findAndCountAll({
            where: {
                user_id: res.locals.userId,
                created_at: { [Op.between]: [new Date(Date.now() - 86400000), new Date(Date.now())] },
                test_type: 1
            },
            include: [{
                model: Question
            }]
        });

        if (tries.count >= 5) {
            try_log = []
            for (const try_row of tries.rows) {
                try_log.push([try_row.question.part1,
                    try_row.question.part2,
                    try_row.question_part3,
                    try_row.choice,
                    try_row.question.correct_rate]);
            }

            const result = await fetch(process.env.AI_SERVER_ADDRESS + "/evaluation", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(try_log)
            });

>>>>>>> f87067eec88cc42cdbc1ba8938d58c3910a086a7
            res.json(result)
            res.end();
       }

        let id = "";

        if (tries.count == 0) {
            const q_num = await Question.count();
            let q = await Question.findByPk(id);

            while (!q) {
                id = Math.floor(Math.random() * q_num) + 1;
                q = await Question.findByPk(id);
            }
        } else {
            const correct_wrong_log = {
                "correct": [],
                "wrong": [],
            }
            for (const try_row of tries.rows) {
                if (try_row.earned_score == 0) {
                    correct_wrong_log["wrong"].push(try_row.question.source_of_question);
                } else {
                    correct_wrong_log["correct"].push(try_row.question.source_of_question);
                }
            }

            const next_questions = await fetch(process.env.AI_SERVER_ADDRESS + '/recommendation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(correct_wrong_log)
            });

            for (const next_question of next_questions.json()) {
                const q = await Question.findOne({
                    where : { source_of_question : next_question[0] }
                });

                if (q) {
                    id = q.id;
                    break;
                }
            }
        }

        const question = await Question.findOne({
            where: { id: id },
            include: [
                {
                    model: QuestionImage,
                    as: "question_image"
                },
                {
                    model: SolutionImage,
                    as: "solution_image"
                }
            ]
        });

        return_question_images = [];
        return_solution_images = [];
        for (const question_image of question.question_image) {
            return_question_images.push(question_image.question_image_url);
        }

        for (const solution_image of question.solution_image) {
            return_solution_images.push(solution_image.solution_image_url);
        }

        const return_question = {
            "id": question.id,
            "answer_type": question.answer_type,
            "score": question.score,
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
