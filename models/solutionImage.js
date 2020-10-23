module.exports = (sequelize, DataTypes) => {
    return sequelize.define('solutionImage', {
        solution_image_url: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: false,
        },
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