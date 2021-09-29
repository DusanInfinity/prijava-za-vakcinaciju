using Microsoft.EntityFrameworkCore;

namespace VaccApp.Models
{
    public class VaccContext : DbContext
    {
        public DbSet<Grad> Gradovi { get; set; }
        public DbSet<Ambulanta> Ambulante { get; set; }
        public DbSet<Gradjanin> Gradjani { get; set; }
        public DbSet<Vakcina> Vakcine { get; set; }

        public VaccContext(DbContextOptions<VaccContext> options)
            : base(options)
        {

        }
    }
}
