module.exports = syniks.db.define('Infractions', {
    wid: {
      type: syniks.db.DataTypes.TINYINT,
      allowNull: true
    },
    guild: {
      type: syniks.db.DataTypes.BIGINT,
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
    reason: {
      type: syniks.db.DataTypes.STRING(74),
      allowNull: true
    },
    staff: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    },
    type: {
      type: syniks.db.DataTypes.STRING(4),
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'Infractions',
    timestamps: true
  });
