module.exports = syniks.db.define( 'config', {
    id: {
        type: syniks.db.DataTypes.STRING,
        unique: true,
        primaryKey: true
    },

    // General
    prefix:             { type: syniks.db.DataTypes.STRING, allowNull: false, defaultValue: syniks.settings.modelDefaults.config.prefix },
    suggestionChannel:  syniks.db.DataTypes.STRING,
    autoRoles:          { type: syniks.db.DataTypes.JSON, allowNull: false, defaultValue: syniks.settings.modelDefaults.config.autoRoles },
    mutedRole:          syniks.db.DataTypes.STRING,

    // Logs
    modLogChannel:      syniks.db.DataTypes.STRING,
    eventLogChannel:    syniks.db.DataTypes.STRING,

    // VC
    autoVC_Category:    syniks.db.DataTypes.STRING,
    autoVC_Channel:     syniks.db.DataTypes.STRING,

    // Invites
    inviteChannel:      syniks.db.DataTypes.STRING,
    inviteImage:        syniks.db.DataTypes.STRING,

    // Server Stats
    serverStatsEnabled: { type: syniks.db.DataTypes.BOOLEAN, allowNull: false, defaultValue: syniks.settings.modelDefaults.config.serverStatsEnabled }
} );