module.exports = syniks.db.define('Ticket-Stores', {
    channel: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true
    },
    user: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true
    },
    guild: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'Ticket-Stores',
    timestamps: true
  });
