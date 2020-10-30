module.exports = (sequelize, DataTypes) => {
    return sequelize.define("userGrade", {
        grade: {
            type: DataTypes.TINYINT,
            allowNull: false,
            unique: false,
        }
        // user_id
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })
}