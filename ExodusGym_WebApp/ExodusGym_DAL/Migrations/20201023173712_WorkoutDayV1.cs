using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ExodusGym_DAL.Migrations
{
    public partial class WorkoutDayV1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WorkoutDayDB",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkoutDayDB", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "DietPlanDB",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false),
                    TotalCalories = table.Column<int>(nullable: false)
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

            migrationBuilder.CreateTable(
                name: "MealDB",
                columns: table => new
                {
                    MealID = table.Column<int>(nullable: false),
                    Calories = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    MealType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealDB", x => x.MealID);
                    table.ForeignKey(
                        name: "FK_MealDB_DietPlanDB_MealID",
                        column: x => x.MealID,
                        principalTable: "DietPlanDB",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MealDB");

            migrationBuilder.DropTable(
                name: "DietPlanDB");

            migrationBuilder.DropTable(
                name: "WorkoutDayDB");
        }
    }
}
