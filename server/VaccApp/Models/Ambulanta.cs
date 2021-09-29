using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VaccApp.Models
{
    [Table("Ambulante")]
    public class Ambulanta
    {
        [Key]
        [Column("Adresa")]
        [DataType("nvarchar(100)")]
        public string Adresa { get; set; }

        [Column("DostupneVakcine")] // TO-DO datatype?
        public List<string> DostupneVakcine { get; set; }

        [Column("PreostalaMesta")]
        [DataType("int")]
        public int PreostalaMestaZaVakcinaciju { get; set; }
    }
}
