module.exports = syniks.db.define('vouch_STORAGEs', {
    id: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true,
      primaryKey: true
    },
    count: {
      type: syniks.db.DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'vouch_STORAGEs',
    timestamps: true
  });
