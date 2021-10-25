class buildURL {    
    constructor() {
        this.setup();
    }
    
    setup() {
        this._base = null;
        
        this._url = null;
        
        this._params = [];
    }
    
    base(base) {
        this._base = base;
        return this;
    }
    
    url(url) {
        this._url = url;
        return this;
    }
    
    param(key, value, encode) {
        return this.params({ key, value, encode });
    }
    
    params(...params) {
        this._params.push(...this.constructor.normalizeParams(params));
        return this;
    }
    
    static normalizeParam(key, value, encode) {
        return { key, value, encode }
    }
    
    static normalizeParams(...params) {
        return params
        .flat(2)
        .map(param => this.normalizeParam(param.key, param.value, typeof param.encode == 'boolean' ? param.encode : true));
    }
    
    toString() {
        let url = this._base ? `${this._url || ''}${this._base}` : this._url || '';
        let params = (this._params || []).map(param => {
            let key = param.key,
            value = param.encode == true ? encodeURIComponent(param.value) : param.value;
            
            return `${key}=${value}`
        });
        
        const builtURL = [
            url,
            params.length >= 1 ? '&' : '',
            params.join('&')
        ];
        
        
        return builtURL.join('');
    }
}

module.exports = buildURL;
