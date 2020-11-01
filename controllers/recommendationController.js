const Sequelize = require("sequelize");
const { Question, QuestionImage, SolutionImage, Bookmark, Set, Part } = require("../models");

exports.getRecommendation = async (req, res) => {
    try {
        // TODO : request to deep learning server
        const question_ids = [1, 2, 3];

        const questions = [];
        for (const id of question_ids) {
            const question = await Question.findOne({
                where : {id : id},
                include : [{
                    model : Set,
                    include : [{
                        model : Part
                    }]
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
            questions.push({
                "id" : question.id,
                "answer_type" : question.answer_type,
                "score" : question.score,
                "question_image" : question.question_image,
                "solution_image" : question.solution_image,
                "correct_answer" : question.correct_answer,
                "part_chapter" : part_chapter,
                "bookmark" : bookmark ? true : false,
            });
        }

        res.json(questions);
    } catch(error) {
        console.log(error);
        // TODO : error code
        res.json(error);
    }
}

exports.postRecommendation = async (req, res) => {

}