const { Op } = require("sequelize");
const fetch = require("node-fetch");
const { Question, QuestionImage, SolutionImage, Bookmark, Set, Part, Try } = require("../models");

exports.getRecommendation = async (req, res) => {
    try {
        const question_ids = [];
        
        const tries = await Try.findAll({
            where : {
                user_id: res.locals.userId,
            },
            include : [{
                model: Question
            }]
        });

        const correct_wrong_log = {
            "correct" : [],
            "wrong" : [],
        }
        for (const try_row of tries) {
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
                question_ids.push(q.id);
            }

            if (question_ids.length == 3) break;
        }

        const questions = [];
        for (const id of question_ids) {
            const question = await Question.findOne({
                where: { id: id },
                include: [{
                    model: Set,
                    include: [{
                        model: Part
                    }]
                },
                {
                    model: QuestionImage,
                    as : "question_image"
                },
                {
                    model: SolutionImage,
                    as : "solution_image"
                }]
            });

            const bookmark = await Bookmark.findOne({
                where: {
                    user_id: res.locals.userId,
                    question_id: question.id,
                }
            });

            const part_chapter = {};
            for (const set of question.sets) {
                if (set.part) {
                    part_chapter["part"] = set.part.name;
                    part_chapter["chapter"] = set.title;
                }
            }

            return_question_images = [];
            return_solution_images = [];
            for (const question_image of question.question_image) {
                return_question_images.push(question_image.question_image_url);
            }

            for (const solution_image of question.solution_image) {
                return_solution_images.push(solution_image.solution_image_url);
            }

            questions.push({
                "id": question.id,
                "answer_type": question.answer_type,
                "score": question.score,
                "question_image": return_question_images,
                "solution_image": return_solution_images,
                "correct_answer": question.correct_answer,
                "part_chapter": part_chapter["chapter"],
                "bookmark": bookmark ? true : false,
            });
        }

        res.json(questions);
    } catch (error) {
        console.log(error);
        // TODO : error code
        res.json(error);
    }
}

exports.postRecommendation = async (req, res) => {
    try {
        const newTries = [];

        for (const trial of req.body) {
            const question = await Question.findOne({
                where : { id : trial.question_id },
                include : {
                    model : Set,
                    where : { part_id : {[Op.ne] : null} }
                }
            });

            const newTry = {
                excluded_option: parseInt(trial.excluded_option, 2),
                // 01001
                time_taken: trial.time_taken,
                choice: trial.choice,
                earned_score: (trial.choice == question.correct_answer) ? question.score : 0,
                exited: trial.exited,
                test_type: 2,
                // 1 : evaluation
                // 2 : recommendation
                // 3 : normal test
                user_id: res.locals.userId,
                // TODO : could be changed to req.user.id
                question_id: trial.question_id,
                // set_id: question.sets[0].id,
            };
            newTries.push(newTry);
        }

        await Try.bulkCreate(newTries);
        res.json("success");
    } catch (error) {
        console.log(error);
        // TODO : error code
        res.json(error);
    }
}
