module.exports = syniks.db.define( 'banned_STORAGEs', {
    i: {
        type: syniks.db.DataTypes.TINYINT,
        allowNull: true
    },
    w: {
        type: syniks.db.DataTypes.STRING( 7 ),
        allowNull: true
    },
    g: {
        type: syniks.db.DataTypes.STRING( 0 ),
        allowNull: true
    }
}, {
    sequelize: syniks.db.sequelize,
    tableName: 'banned_STORAGEs',
    timestamps: true
} );