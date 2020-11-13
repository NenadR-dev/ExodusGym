using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ExodusGym_DAL.Migrations
{
    public partial class Meals : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MealDB_DietPlanDB_MealID",
                table: "MealDB");

            migrationBuilder.DropTable(
                name: "DietPlanDB");

            migrationBuilder.DropTable(
                name: "WorkoutDayDB");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MealDB",
                table: "MealDB");

            migrationBuilder.DropColumn(
                name: "MealID",
                table: "MealDB");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "MealDB",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "MealDB",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_MealDB",
                table: "MealDB",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MealDB",
                table: "MealDB");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "MealDB");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "MealDB");

            migrationBuilder.AddColumn<int>(
                name: "MealID",
                table: "MealDB",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MealDB",
                table: "MealDB",
                column: "MealID");

            migrationBuilder.CreateTable(
                name: "WorkoutDayDB",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkoutDayDB", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "DietPlanDB",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false),
                    TotalCalories = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DietPlanDB", x => x.ID);
                    table.ForeignKey(
                        name: "FK_DietPlanDB_WorkoutDayDB_ID",
                        column: x => x.ID,
                        principalTable: "WorkoutDayDB",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_MealDB_DietPlanDB_MealID",
                table: "MealDB",
                column: "MealID",
                principalTable: "DietPlanDB",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
