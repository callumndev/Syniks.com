module.exports = syniks.db.define( 'lockdownConfig', {
    guild: {
        type: syniks.db.DataTypes.STRING,
        primaryKey: true,
        unique: true
    },
    roles: { type: syniks.db.DataTypes.JSON, allowNull: false, defaultValue: syniks.settings.modelDefaults.lockdownConfig.roles },
} );