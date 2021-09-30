import { Gradjanin } from "./gradjanin.js";
import { ApiClient } from "./util/apiClient.js";
import { Vakcina } from "./vakcina.js";

export class Ambulanta {
    constructor(id, adresa, preostalaMestaZaVakcinaciju, vakcine = [])
    {
        this.id = id;
        this.adresa = adresa;
        this.vakcine = vakcine;
        this.preostalaMestaZaVakcinaciju = preostalaMestaZaVakcinaciju;
        this.container = null;
        this.grad = null;
        this.sideElements = [];
    }

    crtajAmbulantu(grad)
    {
        if (!grad) throw new Error("Grad nije validan!");
        this.grad = grad;

        this.container = document.createElement('div');
        this.container.className = 'Ambulanta';
        grad.containerAmbulante.appendChild(this.container);

        let el = document.createElement('h2');
        el.className = 'AdresaAmbulante';
        el.innerHTML = this.adresa;
        this.container.appendChild(el);

        el = document.createElement('h3');
        el.innerHTML = 'Preostalo prijava: ' + this.preostalaMestaZaVakcinaciju;
        this.container.appendChild(el);

        this.container.onclick = (e) => {
            this.onAmbulanceSelect();
        };
    }
    async ucitajDostupneVakcine()
    {
        const api = new ApiClient();
        const vakcine = await api.vaccApp.vratiVakcineZaAmbulantu(this.id);
        console.log(vakcine);
        this.vakcine = [];
        vakcine.forEach(v => {
            this.vakcine.push(new Vakcina(v.id, v.naziv));
        });
    }

    async onAmbulanceSelect() {
        if(!this.grad || !this.container || this.container.classList.contains('Selected')) return;

        //alert(`Izabrali ste ambulantu sa adresom: ${this.adresa}`);
        Ambulanta.DeselectAmbulances();
        try
        {
            await this.ucitajDostupneVakcine();
            this.container.classList.add('Selected');
            this.toggleButtons();
        }
        catch(e) {
            console.log(e);
            alert(e.message);
        }
    }

    toggleButtons() 
    {
        if(!this.grad.containerSideMenu) throw new Error("Host nije validan!");

        this.grad.removeSideElements();
        this.grad.prikaziSideMenu();

        //this.grad.prikaziSideMenu();
        const dugmici = ['Prijavi se', 'Proveri prijavu', 'Izmeni prijavu', 'Obrisi prijavu'];
        dugmici.forEach(d => {
            let el = document.createElement('button');
            el.className = 'button';
            el.innerHTML = d;
            el.onclick = (ev) => {
                this.onButtonClick(d);
            }
            this.grad.containerSideMenu.appendChild(el);
            this.sideElements.push(el);
        });
    }

    async onButtonClick(buttonText) 
    {
        //alert(`Klik na dugme: ${buttonText}`);

        switch(buttonText)
        {
            case 'Prijavi se':
                {
                    this.toggleVaccApp();
                    break;
                }
            case 'Proveri prijavu':
                {
                    let jmbg = prompt("Unesite Vaš JMBG", "");
                    if(jmbg === null) return;
                    jmbg = Number(jmbg);
                    if(!Number.isInteger(jmbg))
                    {
                        alert(`Niste uneli ispravan JMBG! (${jmbg})`);
                        return;
                    }
                    try
                    {
                        const api = new ApiClient();
                        const gradjanin = await api.vaccApp.vratiPrijavljenogGradjanina(jmbg);
                        console.log(gradjanin);
                        alert(`JMBG: ${gradjanin.jmbg}
                              \nIme: ${gradjanin.ime}
                              \nPrezime: ${gradjanin.prezime}
                              \nIzabrana ambulanta: ${gradjanin.izabranaAmbulanta.adresa}
                              \nIzabrana vakcina: ${gradjanin.izabranaVakcina.naziv}`);
                    }
                    catch(e) { 
                        console.log(e);
                        alert(e.message);
                    }
                    
                    break;
                }    
            case 'Izmeni prijavu':
                {
                    let jmbg = prompt("Unesite Vaš JMBG", "");
                    if(jmbg === null) return;
                    jmbg = Number(jmbg);
                    if(!Number.isInteger(jmbg))
                    {
                        alert(`Niste uneli ispravan JMBG! (${jmbg})`);
                        return;
                    }
                    try
                    {
                        const api = new ApiClient();
                        const gradjanin = await api.vaccApp.vratiPrijavljenogGradjanina(jmbg);
                        console.log(gradjanin);
                        this.toggleChangeVaccApp(jmbg);
                    }
                    catch(e) { 
                        console.log(e);
                        alert(e.message);
                    }
                    
                    break;
                }
            case 'Obrisi prijavu':
                {
                    let jmbg = prompt("Unesite Vaš JMBG", "");
                    if(jmbg === null) return;
                    jmbg = Number(jmbg);
                    if(!Number.isInteger(jmbg))
                    {
                        alert(`Niste uneli ispravan JMBG! (${jmbg})`);
                        return;
                    }

                    try
                    {
                        const api = new ApiClient();
                        console.log(`${jmbg}`);
                        await api.vaccApp.obrisiPrijavu(jmbg);
                        alert(`Uspešno ste obrisali prijavu sa JMBG-om: ${jmbg}`);
                        this.toggleButtons();
                    }
                    catch(e) {
                        console.log(e);
                        alert(e.message);
                    }
                    
                    break;
                }
        }
    }

    toggleVaccApp()
    {
        if(!this.grad.containerSideMenu) throw new Error("Host nije validan!");

        this.grad.removeSideElements();
        this.grad.prikaziSideMenu();

        //this.grad.prikaziSideMenu();
        const containerVA = document.createElement('div');
        containerVA.className = 'VaccApp';
        this.grad.containerSideMenu.appendChild(containerVA);
        this.sideElements.push(containerVA);

        let el = document.createElement('h3');
        el.innerHTML = 'Prijava za vakcinaciju';
        containerVA.appendChild(el);

        let kvpElements = [];
        const labels = ['JMBG', 'Ime', 'Prezime'];
        const labelTypes = ['number', 'text', 'text'];
        for(let i = 0; i < labels.length; i++)
        {
            kvpElements.push(document.createElement('div'));
            kvpElements[i].className = 'KeyValue';
            containerVA.appendChild(kvpElements[i]);

            el = document.createElement('label');
            el.innerHTML = labels[i];
            kvpElements[i].appendChild(el);

            el = document.createElement('input');
            el.type = labelTypes[i];
            el.className = labels[i] + '_VaccApp';
            kvpElements[i].appendChild(el);
        }
        
        // Izbor vakcine
        const izborVakcineKVP = document.createElement('div');
        izborVakcineKVP.className = 'KeyValue';
        containerVA.appendChild(izborVakcineKVP);
        el = document.createElement('label');
        el.innerHTML = 'Vakcina';
        izborVakcineKVP.appendChild(el);
        let dropdown = document.createElement('select');
        dropdown.id = 'IzborVakcineList';
        let option = document.createElement('option');
        option.selected = true;
        option.hidden = true;
        option.disabled = true;
        option.text = 'Izaberi'
        dropdown.appendChild(option);
        this.vakcine.forEach(v => {
            option = document.createElement('option');
            option.value = v.id;
            option.text = v.naziv;
            dropdown.appendChild(option);
        });
        izborVakcineKVP.appendChild(dropdown);


        // Dugmici
        const dugmiciContainer = document.createElement('div');
        dugmiciContainer.className = 'horizontalniDugmici';
        containerVA.appendChild(dugmiciContainer);

        const dugmici = ['Prijavi se', 'Odustani'];
        dugmici.forEach(d => {
            el = document.createElement('button');
            el.className = 'button';
            el.innerHTML = d;
            el.onclick = (ev) => {
                this.onButtonVaccAppClick(d);
            }
            dugmiciContainer.appendChild(el);
        });
    }

    async onButtonVaccAppClick(buttonText, data) {
        //alert(`Klik na dugme: ${buttonText}`);

        switch(buttonText)
        {
            case 'Prijavi se':
                {
                    const vaccApp = document.getElementsByClassName('VaccApp');
                    if(vaccApp)
                    {
                        const jmbg = document.getElementsByClassName('JMBG_VaccApp')[0].value;
                        const ime = document.getElementsByClassName('Ime_VaccApp')[0].value;
                        const prezime = document.getElementsByClassName('Prezime_VaccApp')[0].value;
                        const vakcina = document.getElementById('IzborVakcineList');

                        if(isNaN(jmbg) || !Number.isInteger(Number(jmbg)))
                        {
                            alert(`Niste uneli ispravan JMBG!`);
                            return;
                        }
                        const regEx = /^[a-z,.'-]+$/i;
                        if(ime.length < 3 || ime.length > 50 || !regEx.test(ime))
                        {
                            alert('Niste uneli ispravno ime!');
                            return;
                        }

                        if(prezime.length < 3 || prezime.length > 50 || !regEx.test(prezime))
                        {
                            alert('Niste uneli ispravno prezime!');
                            return;
                        }

                        try
                        {
                            const vakcinaId = vakcina.options[vakcina.selectedIndex].value;
                            const gradjanin = new Gradjanin(jmbg, ime, prezime);
                            const api = new ApiClient();
                            api.setHeader('Content-Type', 'application/json');
                            console.log(`${this.id} - ${vakcinaId} ${JSON.stringify(gradjanin)}`);
                            await api.vaccApp.prijaviGradjanina(this.id, vakcinaId, gradjanin);
                            alert(`Uspešno ste se prijavili za vakcinaciju!\n\nIme: ${ime} ${prezime}\nJMBG: ${jmbg}\nIzabrana vakcina: ${vakcina.options[vakcina.selectedIndex].text}`);
                            this.toggleButtons();
                        }
                        catch(e) {
                            console.log(e);
                            alert(e.message);
                        }
                    }
                    break;
                }
            case 'Izmeni':
            {
                const changeVaccApp = document.getElementsByClassName('ChangeVaccApp');
                if(changeVaccApp)
                {
                    const vakcina = document.getElementById('IzmenaVakcineList');

                    try
                    {
                        const vakcinaIme = vakcina.options[vakcina.selectedIndex].text;
                        const jmbg = Number(data);
                        const api = new ApiClient();
                        console.log(`${jmbg} - ${vakcinaIme}`);
                        await api.vaccApp.izmeniPrijavu(jmbg, vakcinaIme);
                        alert(`Uspešno ste se izmenili vakcinu!\n\nJMBG: ${jmbg}\nIzabrana vakcina: ${vakcinaIme}`);
                        this.toggleButtons();
                    }
                    catch(e) {
                        console.log(e);
                        alert(e.message);
                    }
                }
                break;
            }
            case 'Odustani':
                {
                    this.toggleButtons();
                    break;
                }
        }
    }

    toggleChangeVaccApp(enteredJMBG)
    {
        if(!this.grad.containerSideMenu) throw new Error("Host nije validan!");

        this.grad.removeSideElements();
        this.grad.prikaziSideMenu();

        const containerVA = document.createElement('div');
        containerVA.className = 'ChangeVaccApp';
        containerVA.dataset.jmbg = enteredJMBG;
        this.grad.containerSideMenu.appendChild(containerVA);
        this.sideElements.push(containerVA);

        let el = document.createElement('h3');
        el.innerHTML = 'Izmena vakcine za JMBG: ' + enteredJMBG;
        containerVA.appendChild(el);
        
        // Izbor vakcine
        const izborVakcineKVP = document.createElement('div');
        izborVakcineKVP.className = 'KeyValue';
        containerVA.appendChild(izborVakcineKVP);
        el = document.createElement('label');
        el.innerHTML = 'Vakcina';
        izborVakcineKVP.appendChild(el);
        let dropdown = document.createElement('select');
        dropdown.id = 'IzmenaVakcineList';
        let option = document.createElement('option');
        option.selected = true;
        option.hidden = true;
        option.disabled = true;
        option.text = 'Izaberi'
        dropdown.appendChild(option);
        this.vakcine.forEach(v => {
            option = document.createElement('option');
            option.value = v.id;
            option.text = v.naziv;
            dropdown.appendChild(option);
        });
        izborVakcineKVP.appendChild(dropdown);


        // Dugmici
        const dugmiciContainer = document.createElement('div');
        dugmiciContainer.className = 'horizontalniDugmici';
        containerVA.appendChild(dugmiciContainer);

        const dugmici = ['Izmeni', 'Odustani'];
        dugmici.forEach(d => {
            el = document.createElement('button');
            el.className = 'button';
            el.innerHTML = d;
            el.onclick = (ev) => {
                this.onButtonVaccAppClick(d, enteredJMBG);
            }
            dugmiciContainer.appendChild(el);
        });
    }

    static DeselectAmbulances()
    {
        const ambulances = document.querySelectorAll('.Ambulanta.Selected');
        ambulances.forEach(a => {
            a.classList.remove('Selected');
        });
    }
}