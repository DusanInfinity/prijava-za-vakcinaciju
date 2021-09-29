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
        [JsonIgnore] // TO-DO sta ovde za db?
        public virtual Vakcina IzabranaVakcina { get; set; }
        [JsonIgnore] // TO-DO sta ovde za db?
        public virtual Ambulanta IzabranaAmbulanta { get; set; }
    }
}
