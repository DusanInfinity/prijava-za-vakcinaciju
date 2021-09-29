import { HttpClient } from "./httpClient.js";

class ApiClient extends HttpClient {
  constructor(hdrs) {
    super({
      baseURL: 'https://localhost:44357/',
      headers: hdrs
    });
  }
  get apoteka() {
      return {
          vratiZaposlene: (idApoteke) => this.get(`Apoteka/VratiZaposlene/${idApoteke}`),
          azurirajZaposlenog: (idApoteke, username, noviZaposleni) => this.put(`Apoteka/AzurirajZaposlenog/${idApoteke}/${username}`, noviZaposleni),
          kreirajZaposlenog: (idApoteke, noviZaposleni, lozinka) => this.post(`Apoteka/KreirajZaposlenog/${idApoteke}/${lozinka}`, noviZaposleni),
          obrisiZaposlenog: (idApoteke, username) => this.delete(`Apoteka/ObrisiZaposlenog/${idApoteke}/${username}`),

 
          vratiPorudzbine: (idApoteke) => this.get(`Apoteka/VratiPorudzbine/${idApoteke}`),
          kreirajPorudzbinu: (idApoteke, novaPorudzbina) => this.post(`Apoteka/KreirajPorudzbinu/${idApoteke}`, novaPorudzbina),
          potvrdiPorudzbinu: (idApoteke, idPorudzbine, potvrdjenaPorudzbina) => this.put(`Apoteka/PotvrdiPorudzbinu/${idApoteke}/${idPorudzbine}`, potvrdjenaPorudzbina),
          obrisiPorudzbinu: (idApoteke, idPorudzbine) => this.delete(`Apoteka/ObrisiPorudzbinu/${idApoteke}/${idPorudzbine}`),
          dodajLekUPorudzbinu: (idApoteke, idPorudzbine, sifraLeka, kolicinaLeka) => this.post(`Apoteka/DodajLekUPorudzbinu/${idApoteke}/${idPorudzbine}/${sifraLeka}/${kolicinaLeka}`),
          izmeniKolicinuLeka: (idApoteke, idPorudzbine, sifra, kolicinaLeka) => this.put(`Apoteka/IzmeniKolicinuPorucenogLeka/${idApoteke}/${idPorudzbine}/${sifra}/${kolicinaLeka}`),
          obrisiLekIzPorudzbine: (idApoteke, idPorudzbine, sifraLeka) => this.delete(`Apoteka/ObrisiLekIzPorudzbine/${idApoteke}/${idPorudzbine}/${sifraLeka}`),
          

          vratiALekove: (idApoteke) => this.get(`Apoteka/VratiALekove/${idApoteke}`),
          azurirajLek: (idApoteke, sifra, noviALek) => this.put(`Apoteka/AzurirajLek/${idApoteke}/${sifra}`, noviALek),
          kreirajLek: (noviALek) => this.post(`Apoteka/KreirajLek`, noviALek),
          // brisanje leka ide preko lanacApoteka.obrisiLekIzBaze -> NAPOMENA: brise se lek za sve apoteke, nema opcije brisanja samo za jednu
          vratiParalelneLekove: (sifraLeka) => this.get(`Apoteka/VratiParalelneLekove/${sifraLeka}`),


          vratiPrihodeApoteke: (idApoteke, brMeseci) => this.get(`Apoteka/VratiPrihodePoMesecima/${idApoteke}/${brMeseci}`),
          vratiBrojProdatihLekovaApotekePoMesecima: (idApoteke, brMeseci) => this.get(`Apoteka/VratiBrojProdatihLekovaPoMesecima/${idApoteke}/${brMeseci}`),
          
      };
  }
}

export default ApiClient;
