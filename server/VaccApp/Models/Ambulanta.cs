using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VaccApp.Models
{
    [Table("Ambulante")]
    public class Ambulanta
    {
        [Key]
        [Column("ID")]
        [DataType("int")]
        public int ID { get; set; }

        [Column("Adresa")]
        [DataType("nvarchar(100)")]
        public string Adresa { get; set; }

        [Column("PreostalaMesta")]
        [DataType("int")]
        public int PreostalaMestaZaVakcinaciju { get; set; }

        [JsonIgnore] // TO-DO sta ovde za db?
        public virtual List<Vakcina> DostupneVakcine { get; set; }
    }
}
