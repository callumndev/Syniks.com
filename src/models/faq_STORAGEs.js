module.exports = syniks.db.define('faq_STORAGEs', {
    num: {
      type: syniks.db.DataTypes.TINYINT,
      allowNull: true
    },
    guild: {
      type: syniks.db.DataTypes.BIGINT,
      allowNull: true
    },
    faq: {
      type: syniks.db.DataTypes.STRING(32),
      allowNull: true
    }
  }, {
    sequelize: syniks.db.sequelize,
    tableName: 'faq_STORAGEs',
    timestamps: true
  });
