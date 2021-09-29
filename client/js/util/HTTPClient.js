export class HttpClient {
    constructor(options = {}) {
      this._baseURL = options.baseURL || "";
      this._headers = options.headers || {};
    }
  
    async _fetchJSON(endpoint, options = {}) {
      const res = await fetch(this._baseURL + endpoint, {
        ...options,
        headers: this._headers
      });

      if (!res.ok) 
      {
        let errorMsg = res.statusText;

        // prazan try/catch jer nas zanima samo da li ima atributa message i ako ima koristimo tu poruku za poruku greske
        try
        {
          let parsedJson = await res.json();
          errorMsg = parsedJson.message;
        }
        catch { }

        throw new Error(errorMsg);
      }
      
  
      if (options.parseResponse !== false && res.status !== 204)
        return res.json();
  
      return undefined;
    }
  
    setHeader(key, value) {
      this._headers[key] = value;
      return this;
    }
  
    getHeader(key) {
      return this._headers[key];
    }
  
    get(endpoint, options = {}) {
      return this._fetchJSON(endpoint, {
        ...options,
        method: "GET"
      });
    }
  
    post(endpoint, body, options = {}) {
      return this._fetchJSON(endpoint, {
        ...options,
        body: body ? JSON.stringify(body) : undefined,
        method: "POST"
      });
    }
  
    put(endpoint, body, options = {}) {
      return this._fetchJSON(endpoint, {
        ...options,
        body: body ? JSON.stringify(body) : undefined,
        method: "PUT"
      })
    }
  
    delete(endpoint, options = {}) {
      return this._fetchJSON(endpoint, {
        parseResponse: false,
        ...options,
        method: "DELETE"
      });
    }
  }
  
  //export default HttpClient;