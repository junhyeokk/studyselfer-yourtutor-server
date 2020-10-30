module.exports = (sequelize, DataTypes) => {
    return sequelize.define("gradeInfo", {
        raw_1: {
            type: DataTypes.TINYINT,
            allowNull: true,
            unique: false,
        },
        standard_1: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            unique: false,
        },
        raw_2: {
            type: DataTypes.TINYINT,
            allowNull: true,
            unique: false,
        },
        standard_2: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            unique: false,
        },
        raw_3: {
            type: DataTypes.TINYINT,
            allowNull: true,
            unique: false,
        },
        standard_3: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            unique: false,
        },
        raw_4: {
            type: DataTypes.TINYINT,
            allowNull: true,
            unique: false,
        },
        standard_4: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            unique: false,
        },
        raw_5: {
            type: DataTypes.TINYINT,
            allowNull: true,
            unique: false,
        },
        standard_5: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            unique: false,
        },
        raw_6: {
            type: DataTypes.TINYINT,
            allowNull: true,
            unique: false,
        },
        standard_6: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            unique: false,
        },
        raw_7: {
            type: DataTypes.TINYINT,
            allowNull: true,
            unique: false,
        },
        standard_7: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            unique: false,
        },
        raw_8: {
            type: DataTypes.TINYINT,
            allowNull: true,
            unique: false,
        },
        standard_8: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            unique: false,
        },
        raw_9: {
            type: DataTypes.TINYINT,
            allowNull: true,
            unique: false,
        },
        standard_9: {
            type: DataTypes.SMALLINT,
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