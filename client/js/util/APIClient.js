import { HttpClient } from "./httpClient.js";

class ApiClient extends HttpClient {
  constructor(hdrs) {
    super({
      baseURL: 'https://localhost:44357/',
      headers: hdrs
    });
  }
  get vaccApp() {
      return {
          vratiGradove: () => this.get(`VaccApp/VratiGradove`),
          vratiAmbulanteZaGrad: (gradID) => this.get(`VaccApp/VratiAmbulanteZaGrad/${gradID}`),
          vratiVakcineZaAmbulantu: (adresaAmbulante) => this.get(`VaccApp/VratiVakcineZaAmbulantu/${adresaAmbulante}`),

          vratiPrijavljenogGradjanina: (jmbg) => this.get(`VaccApp/VratiPrijavljenogGradjanina/${jmbg}`),
          prijaviGradjanina: (adresaAmbulante, gradjanin) => this.post(`VaccApp/PrijaviGradjanina/${adresaAmbulante}`, gradjanin),
          izmeniPrijavu: (jmbg, vakcina) => this.put(`VaccApp/IzmeniPrijavu/${jmbg}`, vakcina),
          obrisiPrijavu: (jmbg) => this.delete(`VaccApp/ObrisiPrijavu/${jmbg}`),
      };
  }
}

export default ApiClient;
