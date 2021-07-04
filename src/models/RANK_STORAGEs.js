module.exports = syniks.db.define('RANK_STORAGEs', {
    num: {
      type: syniks.db.DataTypes.TINYINT,
      allowNull: true
    },
    id: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true,
      primaryKey: true
    },
    guild: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    },
    level: {
      type: syniks.db.DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'RANK_STORAGEs',
    timestamps: true
  });
