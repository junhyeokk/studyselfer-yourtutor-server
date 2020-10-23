module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: true,
            unique: false,
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: true,
            unique: true,
        },
        kakao_id_number: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
        },
        group: {
            type: DataTypes.ENUM("science", "liberal"),
            allowNull: true,
            unique: false,
        },
        selected_subjects: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: false,
        },
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })
}