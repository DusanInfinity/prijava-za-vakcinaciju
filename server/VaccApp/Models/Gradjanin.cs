using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VaccApp.Models
{
    [Table("Gradjani")]
    public class Gradjanin
    {
        [Key]
        [Column("JMBG")]
        [DataType("bigint")]
        public long JMBG { get; set; }
        [Column("Ime")]
        [DataType("nvarchar(50)")]
        public string Ime { get; set; }
        [Column("Prezime")]
        [DataType("nvarchar(50)")]
        public string Prezime { get; set; }
        [Column("IzabranaVakcina")]
        [DataType("nvarchar(50)")]
        public string IzabranaVakcina { get; set; }
        [JsonIgnore] // TO-DO sta ovde za db?
        public Ambulanta IzabranaAmbulanta { get; set; }
    }
}
