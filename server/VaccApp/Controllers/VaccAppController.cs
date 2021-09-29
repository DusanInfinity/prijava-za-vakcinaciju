using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using VaccApp.Models;

namespace VaccApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VaccAppController : ControllerBase
    {
        [HttpGet]
        [Route("VratiGradove")]
        public IEnumerable<Grad> VratiGradove()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet]
        [Route("VratiAmbulanteZaGrad/{gradID}")]
        public IEnumerable<Ambulanta> VratiAmbulanteZaGrad(int gradID)
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet]
        [Route("VratiPrijavljenogGradjanina/{jmbg}")]
        public Gradjanin VratiPrijavljenogGradjanina(long jmbg)
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpPut]
        [Route("PrijaviGradjanina/{adresaAmbulante}")]
        public Gradjanin PrijaviGradjanina([FromBody] Gradjanin g, string adresaAmbulante)
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpPost]
        [Route("IzmeniPrijavu/{jmbg}/{vakcina}")]
        public Gradjanin IzmeniIzabranuVakcinu(long jmbg, string vakcina)
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpDelete]
        [Route("ObrisiPrijavu/{jmbg}")]
        public Gradjanin ObrisiPrijavu(long jmbg)
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
