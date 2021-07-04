module.exports = syniks.db.define('temp_STORAGEs', {
    guild: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true
    },
    id: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true,
      primaryKey: true
    },
    time: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true
    },
    type: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'temp_STORAGEs',
    timestamps: true
  });
