module.exports = syniks.db.define('LEVEL_STORE_SYNs', {
    num: {
      type: syniks.db.DataTypes.SMALLINT,
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
    xp: {
      type: syniks.db.DataTypes.MEDIUMINT,
      allowNull: true
    },
    messages: {
      type: syniks.db.DataTypes.STRING(1),
      allowNull: true
    },
    points: {
      type: syniks.db.DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'LEVEL_STORE_SYNs',
    timestamps: true
  });
