module.exports = (sequelize, DataTypes) => {
    return sequelize.define('bookmark', {
        // user_id
        // question_id
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })
}