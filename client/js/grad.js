export class Grad {
    constructor(naziv, ambulante = [])
    {
        this.naziv = naziv;
        this.ambulante = ambulante;
        this.container = null;
        this.containerApoteke = null;
        this.containerSideMenu = null;
    }

    crtajGrad(host)
    {
        if (!host) throw new Error("Host nije validan!");

        this.container = document.createElement('div');
        this.container.className = 'GradContainer';
        host.appendChild(this.container);

        this.containerApoteke = document.createElement('div');
        this.containerApoteke.className = 'ContainerAmbulanti';
        this.container.appendChild(this.containerApoteke);
        
        this.ambulante.forEach(a => {
            a.crtajAmbulantu(this.containerApoteke);
        });

        this.crtajSideMenu();
    }

    crtajSideMenu()
    {
        if(!this.container) throw new Error("Host nije validan!");

        this.containerSideMenu = document.createElement('div');
        this.containerSideMenu.className = 'ContainerSideMenu';
        //this.containerSideMenu.style.display = 'none'; // hide
        this.container.appendChild(this.containerSideMenu);

        this.crtajDugmice(this.containerSideMenu);
    }


    crtajDugmice(host) 
    {
        if(!host) throw new Error("Host nije validan!");

        const dugmici = ['Prijavi se', 'Izmeni prijavu', 'Obrisi prijavu'];
        dugmici.forEach(d => {
            let el = document.createElement('button');
            el.className = 'button';
            el.innerHTML = d;
            el.onclick = (ev) => {
                this.onButtonClick(d);
            }
            host.appendChild(el);
        });
    }

    onButtonClick(buttonText) 
    {
        alert(`Klik na dugme: ${buttonText}`)
    }
}