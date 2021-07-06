module.exports = syniks.db.define( 'CONFIGURATION_STORAGE_SERVER', {
    id: {
        type: syniks.db.DataTypes.STRING,
        unique: true,
        primaryKey: true
    },
    modLog: syniks.db.DataTypes.STRING,
    eventLog: syniks.db.DataTypes.STRING,
    prefix: syniks.db.DataTypes.STRING,
    suggestCh: syniks.db.DataTypes.STRING,
    autoRole: syniks.db.DataTypes.STRING,
    muteRole: syniks.db.DataTypes.STRING,
    vcAuto: syniks.db.DataTypes.STRING,
    vcCat: syniks.db.DataTypes.STRING,
    invM: syniks.db.DataTypes.STRING,
    invI: syniks.db.DataTypes.STRING,
    sS:syniks.db.DataTypes.BOOLEAN
} );