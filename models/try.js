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
            type: DataTypes.TINYINT,    // tiny int
            allowNull: true,
            unique: false,
        },
        is_correct: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            unique: false,
        },
        exited: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            unique: false,
        },
        test_type: {
            type: DataTypes.TINYINT,    // tiny int
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