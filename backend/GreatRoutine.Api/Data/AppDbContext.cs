using GreatRoutine.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GreatRoutine.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
    }
}