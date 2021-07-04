module.exports = syniks.db.define('musicions', {
    wid: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true
    },
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
    reason: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true
    },
    staff: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true
    },
    type: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'musicions',
    timestamps: true
  });
