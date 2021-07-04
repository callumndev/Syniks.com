module.exports = syniks.db.define('sqlite_sequence', {
    name: {
      type: syniks.db.DataTypes.STRING(21),
      allowNull: true
    },
    seq: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'sqlite_sequence',
    timestamps: false
  });
