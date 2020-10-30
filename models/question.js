module.exports = (sequelize, DataTypes) => {
    return sequelize.define('question', {
        subject: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: false,
        },
        correct_answer: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
        source_of_question: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: false,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
        answer_type: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            unique: false,
        },
        correct_rate: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            unique: false,
        },
        grade_of_question: {
            type: DataTypes.TINYINT,
            allowNull: true,
            unique: false,
        }
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })
}