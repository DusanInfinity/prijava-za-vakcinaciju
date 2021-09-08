export class Ambulanta {
    constructor(adresa, preostaloPrijava, vakcine = [])
    {
        this.adresa = adresa;
        this.vakcine = vakcine;
        this.preostaloPrijava = preostaloPrijava;
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
        el.innerHTML = 'Preostalo prijava: ' + this.preostaloPrijava;
        this.container.appendChild(el);

        this.container.onclick = (e) => {
            this.onAmbulanceSelect();
        };
    }

    onAmbulanceSelect() {
        if(!this.grad) return;

        //alert(`Izabrali ste ambulantu sa adresom: ${this.adresa}`);
        Ambulanta.DeselectAmbulances();
        this.container.classList.add('Selected');
        this.toggleButtons();
    }

    toggleButtons() 
    {
        if(!this.grad.containerSideMenu) throw new Error("Host nije validan!");

        this.grad.removeSideElements();
        this.grad.prikaziSideMenu();

        //this.grad.prikaziSideMenu();
        const dugmici = ['Prijavi se', 'Izmeni prijavu', 'Obrisi prijavu'];
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

    onButtonClick(buttonText) 
    {
        //alert(`Klik na dugme: ${buttonText}`);

        switch(buttonText)
        {
            case 'Prijavi se':
                {
                    this.toggleVaccApp();
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
            el.className = labels[i] + 'VaccApp';
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
            option.value = v;
            option.text = v;
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

    onButtonVaccAppClick(buttonText) {
        //alert(`Klik na dugme: ${buttonText}`);

        switch(buttonText)
        {
            case 'Odustani':
                {
                    this.toggleButtons();
                }
        }
    }

    static DeselectAmbulances()
    {
        const ambulances = document.querySelectorAll('.Ambulanta.Selected');
        ambulances.forEach(a => {
            a.classList.remove('Selected');
        });
    }
}