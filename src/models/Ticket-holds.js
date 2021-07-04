module.exports = syniks.db.define('Ticket-holds', {
    id: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true,
      primaryKey: true
    },
    category: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true
    },
    message: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true
    },
    guild: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true
    },
    emoji: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true
    },
    role: {
      type: syniks.db.DataTypes.STRING(0),
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'Ticket-holds',
    timestamps: true
  });
