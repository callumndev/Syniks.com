module.exports = syniks.db.define('poll_storages', {
    num: {
      type: syniks.db.DataTypes.TINYINT,
      allowNull: true
    },
    guild: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    },
    channel: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    },
    reactions: {
      type: syniks.db.DataTypes.STRING(218),
      allowNull: true
    },
    options: {
      type: syniks.db.DataTypes.STRING(23),
      allowNull: true
    },
    end: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    },
    msg: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'poll_storages',
    timestamps: true
  });
