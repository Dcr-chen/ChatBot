module.exports = ( function() {
    let configFile = rootPath + "/src/config.json";
    let config = files.exists( configFile ) ? files.read( configFile ) : "{}";
    config = JSON.parse( config );

    let url = config.openai.apiurl;
    let key = config.openai.apitoken;
    let mod = config.openai.model;

    let headers = {
        "Content-Type"  : "application/json",
        "Authorization" : "Bearer " + key
    };
    let serverInfo = {
        url    : url,
        model  : mod,
        headers: headers
    }
    let packageInfo = config.package;

    this.getConfig = function() {
        return {
            server  : serverInfo,
            package : packageInfo
        }
    }

    return this;
} )()