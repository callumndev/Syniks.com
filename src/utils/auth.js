module.exports = {
    isSiteAdmin: id => syniks.settings.siteAdmins.includes( id )
};