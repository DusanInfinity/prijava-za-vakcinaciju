using Microsoft.EntityFrameworkCore.Migrations;

namespace VaccApp.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Gradovi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gradovi", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Ambulante",
                columns: table => new
                {
                    Adresa = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PreostalaMesta = table.Column<int>(type: "int", nullable: false),
                    GradID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ambulante", x => x.Adresa);
                    table.ForeignKey(
                        name: "FK_Ambulante_Gradovi_GradID",
                        column: x => x.GradID,
                        principalTable: "Gradovi",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Vakcine",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AmbulantaAdresa = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vakcine", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Vakcine_Ambulante_AmbulantaAdresa",
                        column: x => x.AmbulantaAdresa,
                        principalTable: "Ambulante",
                        principalColumn: "Adresa",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Gradjani",
                columns: table => new
                {
                    JMBG = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IzabranaVakcinaID = table.Column<int>(type: "int", nullable: true),
                    IzabranaAmbulantaAdresa = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gradjani", x => x.JMBG);
                    table.ForeignKey(
                        name: "FK_Gradjani_Ambulante_IzabranaAmbulantaAdresa",
                        column: x => x.IzabranaAmbulantaAdresa,
                        principalTable: "Ambulante",
                        principalColumn: "Adresa",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Gradjani_Vakcine_IzabranaVakcinaID",
                        column: x => x.IzabranaVakcinaID,
                        principalTable: "Vakcine",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ambulante_GradID",
                table: "Ambulante",
                column: "GradID");

            migrationBuilder.CreateIndex(
                name: "IX_Gradjani_IzabranaAmbulantaAdresa",
                table: "Gradjani",
                column: "IzabranaAmbulantaAdresa");

            migrationBuilder.CreateIndex(
                name: "IX_Gradjani_IzabranaVakcinaID",
                table: "Gradjani",
                column: "IzabranaVakcinaID");

            migrationBuilder.CreateIndex(
                name: "IX_Vakcine_AmbulantaAdresa",
                table: "Vakcine",
                column: "AmbulantaAdresa");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Gradjani");

            migrationBuilder.DropTable(
                name: "Vakcine");

            migrationBuilder.DropTable(
                name: "Ambulante");

            migrationBuilder.DropTable(
                name: "Gradovi");
        }
    }
}
