using Microsoft.EntityFrameworkCore.Migrations;

namespace VaccApp.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Gradjani_Ambulante_IzabranaAmbulantaAdresa",
                table: "Gradjani");

            migrationBuilder.DropForeignKey(
                name: "FK_Vakcine_Ambulante_AmbulantaAdresa",
                table: "Vakcine");

            migrationBuilder.DropIndex(
                name: "IX_Vakcine_AmbulantaAdresa",
                table: "Vakcine");

            migrationBuilder.DropIndex(
                name: "IX_Gradjani_IzabranaAmbulantaAdresa",
                table: "Gradjani");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ambulante",
                table: "Ambulante");

            migrationBuilder.DropColumn(
                name: "AmbulantaAdresa",
                table: "Vakcine");

            migrationBuilder.DropColumn(
                name: "IzabranaAmbulantaAdresa",
                table: "Gradjani");

            migrationBuilder.AddColumn<int>(
                name: "AmbulantaID",
                table: "Vakcine",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IzabranaAmbulantaID",
                table: "Gradjani",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Adresa",
                table: "Ambulante",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "ID",
                table: "Ambulante",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ambulante",
                table: "Ambulante",
                column: "ID");

            migrationBuilder.CreateIndex(
                name: "IX_Vakcine_AmbulantaID",
                table: "Vakcine",
                column: "AmbulantaID");

            migrationBuilder.CreateIndex(
                name: "IX_Gradjani_IzabranaAmbulantaID",
                table: "Gradjani",
                column: "IzabranaAmbulantaID");

            migrationBuilder.AddForeignKey(
                name: "FK_Gradjani_Ambulante_IzabranaAmbulantaID",
                table: "Gradjani",
                column: "IzabranaAmbulantaID",
                principalTable: "Ambulante",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Vakcine_Ambulante_AmbulantaID",
                table: "Vakcine",
                column: "AmbulantaID",
                principalTable: "Ambulante",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Gradjani_Ambulante_IzabranaAmbulantaID",
                table: "Gradjani");

            migrationBuilder.DropForeignKey(
                name: "FK_Vakcine_Ambulante_AmbulantaID",
                table: "Vakcine");

            migrationBuilder.DropIndex(
                name: "IX_Vakcine_AmbulantaID",
                table: "Vakcine");

            migrationBuilder.DropIndex(
                name: "IX_Gradjani_IzabranaAmbulantaID",
                table: "Gradjani");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ambulante",
                table: "Ambulante");

            migrationBuilder.DropColumn(
                name: "AmbulantaID",
                table: "Vakcine");

            migrationBuilder.DropColumn(
                name: "IzabranaAmbulantaID",
                table: "Gradjani");

            migrationBuilder.DropColumn(
                name: "ID",
                table: "Ambulante");

            migrationBuilder.AddColumn<string>(
                name: "AmbulantaAdresa",
                table: "Vakcine",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IzabranaAmbulantaAdresa",
                table: "Gradjani",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Adresa",
                table: "Ambulante",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ambulante",
                table: "Ambulante",
                column: "Adresa");

            migrationBuilder.CreateIndex(
                name: "IX_Vakcine_AmbulantaAdresa",
                table: "Vakcine",
                column: "AmbulantaAdresa");

            migrationBuilder.CreateIndex(
                name: "IX_Gradjani_IzabranaAmbulantaAdresa",
                table: "Gradjani",
                column: "IzabranaAmbulantaAdresa");

            migrationBuilder.AddForeignKey(
                name: "FK_Gradjani_Ambulante_IzabranaAmbulantaAdresa",
                table: "Gradjani",
                column: "IzabranaAmbulantaAdresa",
                principalTable: "Ambulante",
                principalColumn: "Adresa",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Vakcine_Ambulante_AmbulantaAdresa",
                table: "Vakcine",
                column: "AmbulantaAdresa",
                principalTable: "Ambulante",
                principalColumn: "Adresa",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
