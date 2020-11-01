const Sequelize = require("sequelize");
const { Question, QuestionImage, SolutionImage, Bookmark, Set, Part, Try } = require("../models");

function time_convert(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return hours + ":" + minutes;
}
// TODO : move time_convert function to middleware?
exports.getRecommendation = async (req, res) => {
    try {
        // TODO : request to deep learning server
        const question_ids = [1, 2, 3];

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
                return_solution.images.push(solution_image.solution_image_url);
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
            const question = await Question.findByPk(trial.question_id);
            const newTry = {
                excluded_option: parseInt(trial.excluded_option, 2),
                // 01001
                time_taken: time_convert(trial.time_taken),
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
                set_id: req.params.id
                // when test type is 3
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