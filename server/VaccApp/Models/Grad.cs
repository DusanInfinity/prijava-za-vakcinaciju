using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VaccApp.Models
{
    [Table("Gradovi")]
    public class Grad
    {
        [Key]
        [Column("ID")]
        [DataType("int")]
        public int ID { get; set; }

        [Column("Naziv")]
        [DataType("nvarchar(50)")]
        public string Naziv { get; set; }

        [JsonIgnore]
        public virtual List<Ambulanta> Ambulante { get; set; }

        public Grad()
        {
            Ambulante = new List<Ambulanta>();
        }
    }
}
