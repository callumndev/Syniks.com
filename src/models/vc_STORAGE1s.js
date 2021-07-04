module.exports = syniks.db.define('vc_STORAGE1s', {
    num: {
      type: syniks.db.DataTypes.TINYINT,
      allowNull: true
    },
    user: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    },
    guild: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    },
    channel: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'vc_STORAGE1s',
    timestamps: true
  });
