export class Ambulanta {
    constructor(adresa, preostaloPrijava, vakcine = [])
    {
        this.adresa = adresa;
        this.vakcine = vakcine;
        this.preostaloPrijava = preostaloPrijava;
        this.container = null;
    }

    crtajAmbulantu(host)
    {
        if (!host) throw new Error("Host nije validan!");

        this.container = document.createElement('div');
        this.container.className = 'Ambulanta';
        host.appendChild(this.container);

        let el = document.createElement('h2');
        el.className = 'AdresaAmbulante';
        el.innerHTML = this.adresa;
        this.container.appendChild(el);

        el = document.createElement('h3');
        el.className = 'KeyValue';
        el.innerHTML = 'Preostalo prijava: ' + this.preostaloPrijava;
        this.container.appendChild(el);

        this.container.onclick = (e) => {
            this.onAmbulanceSelect();
        };
    }

    onAmbulanceSelect() {
        alert(`Izabrali ste ambulantu sa adresom: ${this.adresa}`);
    }
}