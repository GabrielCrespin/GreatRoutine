using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GreatRoutine.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddUltimaConclusao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "UltimaConclusao",
                table: "Tarefas",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UltimaConclusao",
                table: "Tarefas");
        }
    }
}
