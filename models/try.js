module.exports = (sequelize, DataTypes) => {
    return sequelize.define('try', {
        excluded_option: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            unique: false,
        },
        time_taken: {
            type: DataTypes.TIME,
            allowNull: false,
            unique: false,
        },
        choice: {
            type: DataTypes.TINYINT,
            allowNull: true,
            unique: false,
        },
        earned_score: {
            type: DataTypes.TINYINT,
            allowNull: true,
            unique: false,
        },
        exited: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            unique: false,
        },
        test_type: {
            type: DataTypes.TINYINT,
            allowNull: false,
            unique: false,
        },
        // user_id
        // question_id
        // set_id
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })
}