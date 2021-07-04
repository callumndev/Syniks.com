module.exports = syniks.db.define( 'AUTO_SAs', {
    guild: {
        type: syniks.db.DataTypes.BIGINT,
        allowNull: true
    },
    mentions: {
        type: syniks.db.DataTypes.TINYINT,
        allowNull: true
    },
    bypass: {
        type: syniks.db.DataTypes.STRING( 0 ),
        allowNull: true
    },
    mentionCount: {
        type: syniks.db.DataTypes.TINYINT,
        allowNull: true
    },
    linkProt: {
        type: syniks.db.DataTypes.TINYINT,
        allowNull: true
    }
}, {
    sequelize: syniks.db.sequelize,
    tableName: 'AUTO_SAs',
    timestamps: true
} );