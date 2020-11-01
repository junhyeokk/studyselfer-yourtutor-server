const { Op } = require("sequelize");
const { Try, Question } = require("../models");

function time_convert(num)
{ 
  var hours = Math.floor(num / 60);  
  var minutes = num % 60;
  return hours + ":" + minutes;
}
// TODO : move time_convert function to middleware?

exports.postTry = async (req, res) => {
    try {
        const newTries = [];
        for (const trial of req.body) {
            const question = await Question.findByPk(trial.question_id);
            const newTry = {
                excluded_option : parseInt(trial.excluded_option, 2),
                // 01001
                time_taken : time_convert(trial.time_taken),
                choice : trial.choice,
                earned_score : (trial.choice == question.correct_answer) ? question.score : 0,
                exited : trial.exited,
                test_type : trial.test_type,
                // 1 : evaluation
                // 2 : recommendation
                // 3 : normal test
                user_id : res.locals.userId,
                // TODO : could be changed to req.user.id
                question_id : trial.question_id,
                set_id : trial.set_id || null
                // when test type is 3
            };

            newTries.push(newTry);
        }

        const newRows = await Try.bulkCreate(newTries);
        res.json(newRows);
    } catch (error) {
        console.log(error);
        // TODO : error code
        res.json(error);
    }
}

exports.getTry = async (req, res) => {
    try {
        const since = req.query.since || "2000-1-1";
        delete req.query.since;
        const until = req.query.until || Date.now();
        delete req.query.until;

        const where = {
            ...req.query,
            user_id : res.locals.userId,
            created_at : { [Op.between] : [new Date(since), new Date(until)] },
        };

        const try_row = await Try.findAll({
            where,
            attributes : {
                exclude : ['createdAt', 'updatedAt', 'deletedAt']
            }
        });

        res.json(try_row);
    } catch (error) {
        console.log(error);
        // TODO : error code
        res.json(error);
    }
}