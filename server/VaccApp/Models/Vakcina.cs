using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VaccApp.Models
{
    [Table("Vakcine")]
    public class Vakcina
    {
        [Key]
        [Column("ID")]
        [DataType("int")]
        public int ID { get; set; }

        [Column("Naziv")]
        [DataType("nvarchar(50)")]
        public string Naziv { get; set; }
    }
}
