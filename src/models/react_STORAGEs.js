module.exports = syniks.db.define('react_STORAGEs', {
    aic: {
      type: syniks.db.DataTypes.TINYINT,
      allowNull: true
    },
    gID: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    },
    mID: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    },
    cID: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    },
    rID: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    },
    emoji: {
      type: syniks.db.DataTypes.STRING(18),
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'react_STORAGEs',
    timestamps: true
  });
