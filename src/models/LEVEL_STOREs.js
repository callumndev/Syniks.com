module.exports = syniks.db.define('LEVEL_STOREs', {
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
      type: syniks.db.DataTypes.SMALLINT,
      allowNull: true
    },
    messages: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true
    },
    points: {
      type: syniks.db.DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'LEVEL_STOREs',
    timestamps: true
  });
