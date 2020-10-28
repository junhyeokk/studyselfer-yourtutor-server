const { Try, Question } = require("../models");

function time_convert(num)
 { 
  var hours = Math.floor(num / 60);  
  var minutes = num % 60;
  return hours + ":" + minutes;         
}

exports.postTry = async (req, res) => {
    try {
        // TODO : bulk create
        const question = await Question.findByPk(req.body.question_id);
        const newTry = await Try.create({
            excluded_option : parseInt(req.body.excluded_option, 2),
            // 01001
            time_taken : time_convert(req.body.time_taken),
            choice : req.body.choice,
            is_correct : req.body.choice == question.correct_answer,
            exited : req.body.exited,
            test_type : req.body.test_type,
            // 1 : evaluation
            // 2 : recommendation
            // 3 : normal test
            user_id : res.locals.userId,
            // TODO : could be changed to req.user.id
            question_id : req.body.question_id,
            set_id : req.body.set_id || null
            // when test type is 3
        });

        res.json(newTry);
    } catch (error) {
        console.log(error);
        // TODO : error code
        res.json(error);
    }
}

exports.getTry = async (req, res) => {
    try {
        const where = {...req.query, user_id : res.locals.userId};
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