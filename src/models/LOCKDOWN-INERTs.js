module.exports = syniks.db.define('LOCKDOWN-INERTs', {
    channel: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'LOCKDOWN-INERTs',
    timestamps: true
  });
