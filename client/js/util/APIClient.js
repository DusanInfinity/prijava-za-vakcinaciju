import { HttpClient } from "./httpClient.js";

export class ApiClient extends HttpClient {
  constructor(hdrs) {
    super({
      baseURL: 'https://localhost:44389/',
      headers: hdrs
    });
  }
  get vaccApp() {
      return {
          vratiGradove: () => this.get(`VaccApp/VratiGradove`),
          vratiAmbulanteZaGrad: (gradID) => this.get(`VaccApp/VratiAmbulanteZaGrad/${gradID}`),
          vratiVakcineZaAmbulantu: (ambulantaID) => this.get(`VaccApp/VratiVakcineZaAmbulantu/${ambulantaID}`),

          vratiPrijavljenogGradjanina: (jmbg) => this.get(`VaccApp/VratiPrijavljenogGradjanina/${jmbg}`),
          prijaviGradjanina: (ambulantaID, vakcinaID, gradjanin) => this.post(`VaccApp/PrijaviGradjanina/${ambulantaID}/${vakcinaID}`, gradjanin),
          izmeniPrijavu: (jmbg, imeVakcine) => this.put(`VaccApp/IzmeniPrijavu/${jmbg}/${imeVakcine}`),
          obrisiPrijavu: (jmbg) => this.delete(`VaccApp/ObrisiPrijavu/${jmbg}`),
      };
  }
}