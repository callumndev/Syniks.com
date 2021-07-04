module.exports = syniks.db.define('HELP_MENs', {
    command: {
      type: syniks.db.DataTypes.STRING(21),
      allowNull: true
    },
    description: {
      type: syniks.db.DataTypes.STRING(46),
      allowNull: true
    },
    usage: {
      type: syniks.db.DataTypes.STRING(27),
      allowNull: true
    },
    aliases: {
      type: syniks.db.DataTypes.STRING(13),
      allowNull: true
    },
    cat: {
      type: syniks.db.DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'HELP_MENs',
    timestamps: true
  });
