module.exports = syniks.db.define('LOCKDOWN-CONFs', {
    guild: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    },
    roles: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'LOCKDOWN-CONFs',
    timestamps: true
  });
