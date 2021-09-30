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
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long JMBG { get; set; }

        [Column("Ime")]
        [DataType("nvarchar(50)")]
        public string Ime { get; set; }

        [Column("Prezime")]
        [DataType("nvarchar(50)")]
        public string Prezime { get; set; }

        [JsonIgnore]
        public virtual Vakcina IzabranaVakcina { get; set; }
        [JsonIgnore]
        public virtual Ambulanta IzabranaAmbulanta { get; set; }
    }
}
