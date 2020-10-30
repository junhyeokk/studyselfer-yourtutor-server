module.exports = (sequelize, DataTypes) => {
    return sequelize.define("part", {
        name : {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
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