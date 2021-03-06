module.exports = (sequelize, DataTypes) => {
    return sequelize.define('set', {
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        // grade_info_id
        // part_id
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })
}