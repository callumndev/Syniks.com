module.exports = syniks.db.define('stats_STORAGE_132s', {
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
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'stats_STORAGE_132s',
    timestamps: true
  });
