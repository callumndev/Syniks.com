module.exports = syniks.db.define( 'banned_user_STORAGEs', {
    id: {
        type: syniks.db.DataTypes.BIGINT,
        allowNull: true,
        primaryKey: true
    }
}, {
    sequelize: syniks.db.sequelize,
    tableName: 'banned_user_STORAGEs',
    timestamps: true
} );