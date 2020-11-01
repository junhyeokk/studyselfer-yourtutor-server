const path = require("path");
const Sequelize = require("sequelize");
require("dotenv").config();

const env = process.env.NODE_ENV || "development";
// const env = "development";
const config = require(path.join(__dirname, "..", "config", "config.js"))[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Question = require("./question")(sequelize, Sequelize);
db.Bookmark = require("./bookmark")(sequelize, Sequelize);
db.Try = require("./try")(sequelize, Sequelize);
db.Set = require("./set")(sequelize, Sequelize);
db.QuestionImage = require("./questionImage")(sequelize, Sequelize);
db.SolutionImage = require("./solutionImage")(sequelize, Sequelize);
// db.ListeningFile = require("./listeningFile")(sequelize, Sequelize);
db.GradeInfo = require("./gradeInfo")(sequelize, Sequelize);
db.Part = require("./part")(sequelize, Sequelize);
db.UserGrade = require("./userGrade")(sequelize, Sequelize);

db.User.hasMany(db.Bookmark, { foreignKey: "user_id", sourceKey: "id" });
db.Bookmark.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });

db.Question.hasMany(db.Bookmark, { foreignKey: "question_id", sourceKey: "id" });
db.Bookmark.belongsTo(db.Question, { foreignKey: "user_id", targetKey: "id" });

db.User.hasMany(db.Try, { foreignKey: "user_id", sourceKey: "id" });
db.Try.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });
db.Question.hasMany(db.Try, { foreignKey: "question_id", sourceKey: "id" });
db.Try.belongsTo(db.Question, { foreignKey: "question_id", targetKey: "id" });
db.Set.hasMany(db.Try, { foreignKey: "set_id", sourceKey: "id" });
db.Try.belongsTo(db.Set, { foreignKey: "set_id", targetKey: "id" });

const UserSet = sequelize.define('UserSetRelation', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    score: {
        type: Sequelize.DataTypes.TINYINT,
        allowNull: true,
        unique: false,
    },
    time: {
        type: Sequelize.DataTypes.TIME,
        allowNull: true,
        unique: false,
    }
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});

db.User.belongsToMany(db.Set, { through: UserSet });
db.Set.belongsToMany(db.User, { through: UserSet });
UserSet.belongsTo(db.Set, { foreignKey: "set_id", targetKey: "id" });
UserSet.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });
db.UserSet = UserSet;

const QuestionSet = sequelize.define('QuestionSetRelation', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    question_number: {
        type: Sequelize.DataTypes.TINYINT,
        allowNull : true,
        unique : false,
    }
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});

db.Question.belongsToMany(db.Set, { through: QuestionSet });
db.Set.belongsToMany(db.Question, { through: QuestionSet });
QuestionSet.belongsTo(db.Question, { foreignKey: "question_id", targetKey: "id" });
QuestionSet.belongsTo(db.Set, { foreignKey: "set_id", targetKey: "id" });
db.QuestionSet = QuestionSet;

db.GradeInfo.hasOne(db.Set, { foreignKey: "grade_info_id", sourceKey: "id" });
db.Set.belongsTo(db.GradeInfo, { foreignKey: "grade_info_id", targetKey: "id", as: "grade_info" });

db.Part.hasMany(db.Set, { foreignKey: "part_id", sourceKey: "id" });
db.Set.belongsTo(db.Part, { foreignKey: "part_id", targetKey: "id" });

db.User.hasMany(db.UserGrade, { foreignKey: "user_id", sourceKey: "id" });
db.UserGrade.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });

db.Question.hasMany(db.QuestionImage, { foreignKey: "question_id", sourceKey: "id", as: "question_image" });
db.QuestionImage.belongsTo(db.Question, { foreignKey: "question_id", targetKey: "id" });

db.Question.hasMany(db.SolutionImage, { foreignKey: "question_id", sourceKey: "id", as: "solution_image" });
db.SolutionImage.belongsTo(db.Question, { foreignKey: "question_id", targetKey: "id" });

// db.ListeningFile.hasMany(db.Question, {foreignKey : "listening_file_id", sourceKey : "id"});
// db.Question.belongsTo(db.ListeningFile, {foreignKey : "listening_file_id", targetKey : "id"});

module.exports = db;