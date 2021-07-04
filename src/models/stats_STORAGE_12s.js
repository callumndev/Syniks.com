module.exports = syniks.db.define('stats_STORAGE_12s', {
    guild: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    },
    members: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    },
    online: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    },
    bots: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'stats_STORAGE_12s',
    timestamps: true
  });
