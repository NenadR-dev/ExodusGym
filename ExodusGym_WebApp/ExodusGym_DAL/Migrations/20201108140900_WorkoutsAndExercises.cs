using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ExodusGym_DAL.Migrations
{
    public partial class WorkoutsAndExercises : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WorkoutDb",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Intensity = table.Column<string>(nullable: true),
                    Duration = table.Column<string>(nullable: true),
                    Sets = table.Column<string>(nullable: true),
                    Type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkoutDb", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ExerciseDb",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Interval = table.Column<string>(nullable: true),
                    WorkoutID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseDb", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ExerciseDb_WorkoutDb_WorkoutID",
                        column: x => x.WorkoutID,
                        principalTable: "WorkoutDb",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WorkoutDatesDb",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(nullable: false),
                    WorkoutID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkoutDatesDb", x => x.ID);
                    table.ForeignKey(
                        name: "FK_WorkoutDatesDb_WorkoutDb_WorkoutID",
                        column: x => x.WorkoutID,
                        principalTable: "WorkoutDb",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseDb_WorkoutID",
                table: "ExerciseDb",
                column: "WorkoutID");

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutDatesDb_WorkoutID",
                table: "WorkoutDatesDb",
                column: "WorkoutID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExerciseDb");

            migrationBuilder.DropTable(
                name: "WorkoutDatesDb");

            migrationBuilder.DropTable(
                name: "WorkoutDb");
        }
    }
}
