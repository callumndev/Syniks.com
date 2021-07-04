module.exports = syniks.db.define( 'CONFIGURATION_STORAGE_SERVERs', {
    id: {
        type: syniks.db.DataTypes.BIGINT,
        allowNull: true,
        primaryKey: true
    },
    modLog: {
        type: syniks.db.DataTypes.STRING( 18 ),
        allowNull: true
    },
    eventLog: {
        type: syniks.db.DataTypes.STRING( 18 ),
        allowNull: true
    },
    prefix: {
        type: syniks.db.DataTypes.STRING( 2 ),
        allowNull: true
    },
    suggestCh: {
        type: syniks.db.DataTypes.STRING( 18 ),
        allowNull: true
    },
    autoRole: {
        type: syniks.db.DataTypes.STRING( 0 ),
        allowNull: true
    },
    muteRole: {
        type: syniks.db.DataTypes.STRING( 18 ),
        allowNull: true
    },
    vcAuto: {
        type: syniks.db.DataTypes.STRING( 18 ),
        allowNull: true
    },
    vcCat: {
        type: syniks.db.DataTypes.STRING( 18 ),
        allowNull: true
    },
    invM: {
        type: syniks.db.DataTypes.STRING( 18 ),
        allowNull: true
    },
    invI: {
        type: syniks.db.DataTypes.STRING( 112 ),
        allowNull: true
    },
    sS: {
        type: syniks.db.DataTypes.TINYINT,
        allowNull: true
    }
}, {
    sequelize: syniks.db.sequelize,
    tableName: 'CONFIGURATION_STORAGE_SERVERs',
    timestamps: true
} );