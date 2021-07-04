module.exports = syniks.db.define('invites_STORAGE_holds', {
    id: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true,
      primaryKey: true
    },
    invites: {
      type: syniks.db.DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'invites_STORAGE_holds',
    timestamps: true
  });
