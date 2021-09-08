export class Grad {
    constructor(naziv, ambulante = [])
    {
        this.naziv = naziv;
        this.ambulante = ambulante;
        this.container = null;
        this.containerAmbulante = null;
        this.containerSideMenu = null;
    }

    crtajGrad(host)
    {
        if (!host) throw new Error("Host nije validan!");

        this.container = document.createElement('div');
        this.container.className = 'GradContainer';
        host.appendChild(this.container);

        this.containerAmbulante = document.createElement('div');
        this.containerAmbulante.className = 'ContainerAmbulanti';
        this.container.appendChild(this.containerAmbulante);

        this.containerSideMenu = document.createElement('div');
        this.containerSideMenu.className = 'ContainerSideMenu';
        this.containerSideMenu.style.display = 'none'; // hide
        this.container.appendChild(this.containerSideMenu);
        
        this.ambulante.forEach(a => {
            a.crtajAmbulantu(this);
        });
    }

    prikaziSideMenu()
    {
        if(!this.containerSideMenu) return;

        this.containerSideMenu.style.display = 'block';
    }

    removeSideElements()
    {
        this.containerSideMenu.replaceChildren();
    }
}