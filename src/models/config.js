module.exports = syniks.db.define( 'config', {
    id: {
        type: syniks.db.DataTypes.STRING,
        unique: true,
        primaryKey: true
    },

    // General
    prefix:              { type: syniks.db.DataTypes.STRING, allowNull: false, defaultValue: syniks.settings.modelDefaults.config.prefix },
    suggestionChannel:   syniks.db.DataTypes.STRING,
    autoRoles:           { type: syniks.db.DataTypes.JSON, allowNull: false, defaultValue: syniks.settings.modelDefaults.config.autoRoles },
    mutedRole:           syniks.db.DataTypes.STRING,

    // Logs
    modLogChannel:       syniks.db.DataTypes.STRING,
    eventLogChannel:     syniks.db.DataTypes.STRING,
    disabledEvents:      { type: syniks.db.DataTypes.JSON, allowNull: false, defaultValue: syniks.settings.modelDefaults.config.disabledEvents },

    // VC
    autoVC_Category:     syniks.db.DataTypes.STRING,
    autoVC_Channel:      syniks.db.DataTypes.STRING,

    // Invites
    inviteChannel:       syniks.db.DataTypes.STRING,
    inviteImage:         syniks.db.DataTypes.STRING,

    // Server Stats
    serverStatsEnabled:  { type: syniks.db.DataTypes.BOOLEAN, allowNull: false, defaultValue: syniks.settings.modelDefaults.config.serverStatsEnabled },

    // Levelling
    levelMessageChannel: syniks.db.DataTypes.STRING,

    // Number Guesser
    numberGuesserChannel: syniks.db.DataTypes.STRING,
    numberGuesserNumber: syniks.db.DataTypes.INTEGER,
    numberGuesserNumberMin: syniks.db.DataTypes.INTEGER,
    numberGuesserNumberMax: syniks.db.DataTypes.INTEGER,

    // Leave Message
    leaveChannel:       syniks.db.DataTypes.STRING,
    leaveImage:         syniks.db.DataTypes.STRING
} );