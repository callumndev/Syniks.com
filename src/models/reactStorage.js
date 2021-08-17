module.exports = syniks.db.define( 'reactStorage', {
    aic: {
        type: syniks.db.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    gID: syniks.db.DataTypes.STRING,
    mID: syniks.db.DataTypes.STRING,
    cID: syniks.db.DataTypes.STRING,
    rID: syniks.db.DataTypes.STRING,
    emoji: 'VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci'
})