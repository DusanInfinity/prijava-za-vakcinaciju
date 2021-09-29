import {Grad} from "./grad.js";
import {ApiClient} from "./util/apiClient.js";


const api = new ApiClient();

function crtajStranicu(gradovi)
{
    const panel = document.createElement('div');
    panel.id = 'MainPanel';
    document.body.appendChild(panel);

    const head = document.createElement('div');
    head.className = 'Head';
    panel.appendChild(head);

    const gradCont = document.createElement('div');
    gradCont.className = 'GradCont';
    panel.appendChild(gradCont);

    let el = document.createElement('h1');
    el.innerHTML = 'Dobrodosli na sajt za prijavu!';
    head.appendChild(el);

    const izborGrada = document.createElement('div');
    izborGrada.className = 'IzborGrada';
    head.append(izborGrada);
    el = document.createElement('h3');
    el.innerHTML = 'Izaberite grad u kojem zelite da se vakcinisete:';
    izborGrada.appendChild(el);

    const dropdown = document.createElement('select');
    dropdown.id = 'IzborGradaList';
    let option = document.createElement('option');
    option.selected = true;
    option.hidden = true;
    option.disabled = true;
    option.text = 'Izaberi'
    dropdown.appendChild(option);
    gradovi.forEach(g => {
        option = document.createElement('option');
        option.value = g.id;
        option.text = g.naziv;
        dropdown.appendChild(option);
    });
    dropdown.onchange = onCitySelect;
    izborGrada.appendChild(dropdown);

    const helpText = document.createElement('h3');
    helpText.innerHTML = 'Sada izaberite klikom na apoteku koja Vam odgovara.';
    helpText.style.display = 'none';
    izborGrada.appendChild(helpText);

    async function onCitySelect()
    {
        const el = document.getElementById('IzborGradaList');
        if(el)
        {
            try
            {
                const ambulante = await api.vaccApp.vratiAmbulanteZaGrad(el.value);
                console.log(ambulante);
                const grad = new Grad(el.value, el.text, ambulante);
                gradCont.replaceChildren();
                grad.crtajGrad(gradCont);
                //alert(`Izabrali ste grad ${gradovi[index]}!`);
                helpText.style.display = 'block';
            }
            catch(e) { 
                console.log(e); 
                alert(e.message);
            }
        }
    }
}




/*const gradovi = ['Beograd', 'Nis', 'Vranje'];
const ambulante = {
    "Beograd": [ new Ambulanta('Kralja Petra 1', 5), new Ambulanta('Kralja Petra 2', 3), new Ambulanta('Kralja Petra 3', 1) ],
    "Nis": [ new Ambulanta('Kralja Aleksandra 1', 5), new Ambulanta('Kralja Aleksandra 2', 3), ],
    "Vranje": [ new Ambulanta('Cara Dusana 1', 5)],
} 
crtajStranicu(gradovi, ambulante); */

const gradovi = await api.vaccApp.vratiGradove();
console.log(gradovi);
crtajStranicu(gradovi);
