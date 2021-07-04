module.exports = syniks.db.define('Ticket-Confs', {
    guild: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    },
    log: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'Ticket-Confs',
    timestamps: true
  });
