module.exports = syniks.db.define( 'helpMenu', {
    command: {
        type: syniks.db.DataTypes.STRING,
        unique: true,
        primaryKey: true,
    },
    description: syniks.db.DataTypes.STRING,
    usage: syniks.db.DataTypes.STRING,
    aliases: syniks.db.DataTypes.STRING,
    cat: syniks.db.DataTypes.STRING
} );