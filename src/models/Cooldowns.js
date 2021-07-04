module.exports = syniks.db.define('Cooldowns', {
    num: {
      type: syniks.db.DataTypes.MEDIUMINT,
      allowNull: true
    },
    id: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true,
      primaryKey: true
    },
    time: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    },
    type: {
      type: syniks.db.DataTypes.STRING(7),
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'Cooldowns',
    timestamps: true
  });