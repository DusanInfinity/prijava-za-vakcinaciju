using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VaccApp.Models;

namespace VaccApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VaccAppController : ControllerBase
    {
        public VaccContext Context { get; set; }
        public VaccAppController(VaccContext context)
        {
            Context = context;
        }

        [HttpGet]
        [Route("VratiGradove")]
        public async Task<List<Grad>> VratiGradove()
        {
            return await Context.Gradovi.ToListAsync();
        }

        [HttpGet]
        [Route("VratiAmbulanteZaGrad/{gradID}")]
        public async Task<List<Ambulanta>> VratiAmbulanteZaGrad(int gradID)
        {
            Grad grad = await Context.Gradovi.FirstOrDefaultAsync(g => g.ID == gradID);

            if (grad == null)
                return new List<Ambulanta>();

            return grad.Ambulante.ToList();
        }

        [HttpGet]
        [Route("VratiVakcineZaAmbulantu/{adresaAmbulante}")]
        public async Task<List<Vakcina>> VratiVakcineZaAmbulantu(string adresaAmbulante)
        {
            Ambulanta amb = await Context.Ambulante.FirstOrDefaultAsync(a => a.Adresa == adresaAmbulante);

            if (amb == null)
                return new List<Vakcina>();

            return amb.DostupneVakcine.ToList();
        }

        [HttpGet]
        [Route("VratiPrijavljenogGradjanina/{jmbg}")]
        public async Task<Gradjanin> VratiPrijavljenogGradjanina(long jmbg)
        {
            return await Context.Gradjani.FirstOrDefaultAsync(g => g.JMBG == jmbg);
        }

        [HttpPost]
        [Route("PrijaviGradjanina/{adresaAmbulante}")]
        public async Task<IActionResult> PrijaviGradjanina([FromBody] Gradjanin g, string adresaAmbulante)
        {
            Ambulanta amb = await Context.Ambulante.FirstOrDefaultAsync(a => a.Adresa == adresaAmbulante);

            if (amb == null)
                return BadRequest(new { message = $"Ambulanta sa adresom {adresaAmbulante} ne postoji." });

            if (amb.PreostalaMestaZaVakcinaciju < 1)
                return BadRequest(new { message = $"Sva mesta za vakcinaciju su popunjena u ovoj ambulanti." });

            amb.PreostalaMestaZaVakcinaciju--;
            Context.Gradjani.Add(g);
            await Context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        [Route("IzmeniPrijavu/{jmbg}")]
        public async Task<IActionResult> IzmeniIzabranuVakcinu(long jmbg, [FromBody] Vakcina vakcina)
        {
            Gradjanin g = await Context.Gradjani.FirstOrDefaultAsync(g => g.JMBG == jmbg);

            if (g == null)
                return BadRequest(new { message = $"Prijava sa JMBG-om {jmbg} nije pronadjena." });

            Vakcina v = g.IzabranaAmbulanta.DostupneVakcine.FirstOrDefault(v => v.Naziv == vakcina.Naziv);

            if (v == null)
                return BadRequest(new { message = $"Vakcina sa imenom {vakcina.Naziv} nije pronadjena." });

            g.IzabranaVakcina = v;
            await Context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("ObrisiPrijavu/{jmbg}")]
        public async Task<IActionResult> ObrisiPrijavu(long jmbg)
        {
            Gradjanin g = await Context.Gradjani.FirstOrDefaultAsync(g => g.JMBG == jmbg);

            if (g == null)
                return BadRequest(new { message = $"Prijava sa JMBG-om {jmbg} nije pronadjena." });

            if (g.IzabranaAmbulanta != null)
                g.IzabranaAmbulanta.PreostalaMestaZaVakcinaciju++;

            Context.Gradjani.Remove(g);
            await Context.SaveChangesAsync();
            return Ok();
        }
    }
}
