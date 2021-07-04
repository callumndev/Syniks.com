module.exports = syniks.db.define('temp-roles', {
    num: {
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
    role: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true
    },
    time: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'temp-roles',
    timestamps: true
  });
