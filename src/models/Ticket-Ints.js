module.exports = syniks.db.define('Ticket-Ints', {
    id: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true,
      primaryKey: true
    },
    message: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true
    },
    count: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'Ticket-Ints',
    timestamps: true
  });
