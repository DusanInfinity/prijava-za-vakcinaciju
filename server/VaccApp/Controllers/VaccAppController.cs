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
        public async Task<IActionResult> VratiAmbulanteZaGrad(int gradID)
        {
            Grad grad = await Context.Gradovi.Include(g => g.Ambulante).FirstOrDefaultAsync(g => g.ID == gradID);

            if (grad == null)
                return BadRequest(new { message = $"Grad sa ID-em {gradID} ne postoji." });

            if (grad.Ambulante == null || grad.Ambulante.Count < 1)
                return BadRequest(new { message = $"Trenutno ne postoji nijedna dostupna ambulanta za izabrani grad!" });

            return Ok(grad.Ambulante.ToList());
        }

        [HttpGet]
        [Route("VratiVakcineZaAmbulantu/{ambulantaID}")]
        public async Task<IActionResult> VratiVakcineZaAmbulantu(int ambulantaID)
        {
            Ambulanta amb = await Context.Ambulante.Include(a => a.DostupneVakcine).FirstOrDefaultAsync(a => a.ID == ambulantaID);

            if (amb == null)
                return BadRequest(new { message = $"Ambulanta sa ID-em {ambulantaID} ne postoji." });

            if (amb.DostupneVakcine == null || amb.DostupneVakcine.Count < 1)
                return BadRequest(new { message = $"Trenutno ne postoji nijedna dostupna vakcina u izabranoj ambulanti!" });

            return Ok(amb.DostupneVakcine.ToList());
        }

        [HttpGet]
        [Route("VratiPrijavljenogGradjanina/{jmbg}")]
        public async Task<IActionResult> VratiPrijavljenogGradjanina(long jmbg)
        {
            Gradjanin g = await Context.Gradjani.FirstOrDefaultAsync(g => g.JMBG == jmbg);

            if (g == null)
                return BadRequest(new { message = $"Prijava sa JMBG-om {jmbg} nije pronadjena." });

            return Ok(g);
        }

        [HttpPost]
        [Route("PrijaviGradjanina/{ambulantaID}/{vakcinaID}")]
        public async Task<IActionResult> PrijaviGradjanina([FromBody] Gradjanin g, int ambulantaID, int vakcinaID)
        {
            if (await Context.Gradjani.FirstOrDefaultAsync(n => n.JMBG == g.JMBG) != null)
                return BadRequest(new { message = $"JMBG {g.JMBG} je već prijavljen za vakcinaciju!" });


            Ambulanta amb = await Context.Ambulante.Include(a => a.DostupneVakcine).FirstOrDefaultAsync(a => a.ID == ambulantaID);

            if (amb == null)
                return BadRequest(new { message = $"Ambulanta sa IDem {ambulantaID} ne postoji." });

            if (amb.PreostalaMestaZaVakcinaciju < 1)
                return BadRequest(new { message = $"Sva mesta za vakcinaciju su popunjena u ovoj ambulanti." });

            Vakcina v = await Context.Vakcine.FirstOrDefaultAsync(v => v.ID == vakcinaID);

            if (v == null || amb.DostupneVakcine?.FirstOrDefault(v => v.ID == vakcinaID) == null)
                return BadRequest(new { message = $"Izabrana vakcina trenutno nije dostupna." });

            amb.PreostalaMestaZaVakcinaciju--;
            g.IzabranaAmbulanta = amb;
            g.IzabranaVakcina = v;
            Context.Gradjani.Add(g);
            await Context.SaveChangesAsync();
            return Ok(g);
        }

        [HttpPut]
        [Route("IzmeniPrijavu/{jmbg}/{vakcinaIme}")]
        public async Task<IActionResult> IzmeniIzabranuVakcinu(long jmbg, string vakcinaIme)
        {
            Gradjanin g = await Context.Gradjani.Include(g => g.IzabranaAmbulanta).FirstOrDefaultAsync(g => g.JMBG == jmbg);

            if (g == null)
                return BadRequest(new { message = $"Prijava sa JMBG-om {jmbg} nije pronadjena." });

            Ambulanta amb = await Context.Ambulante.Include(a => a.DostupneVakcine).FirstOrDefaultAsync(a => a.ID == g.IzabranaAmbulanta.ID);
            Vakcina v = await Context.Vakcine.FirstOrDefaultAsync(v => v.Naziv == vakcinaIme);

            if (v == null || amb.DostupneVakcine?.FirstOrDefault(v => v.Naziv == vakcinaIme) == null)
                return BadRequest(new { message = $"Vakcina sa imenom {vakcinaIme} nije pronadjena." });

            g.IzabranaVakcina = v;
            await Context.SaveChangesAsync();
            return Ok(g);
        }

        [HttpDelete]
        [Route("ObrisiPrijavu/{jmbg}")]
        public async Task<IActionResult> ObrisiPrijavu(long jmbg)
        {
            Gradjanin g = await Context.Gradjani.Include(g => g.IzabranaAmbulanta).FirstOrDefaultAsync(g => g.JMBG == jmbg);

            if (g == null)
                return BadRequest(new { message = $"Prijava sa JMBG-om {jmbg} nije pronadjena." });

            if (g.IzabranaAmbulanta != null)
                g.IzabranaAmbulanta.PreostalaMestaZaVakcinaciju++;

            Context.Gradjani.Remove(g);
            await Context.SaveChangesAsync();
            return Ok(g);
        }
    }
}
