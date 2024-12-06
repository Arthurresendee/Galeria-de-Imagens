using Microsoft.EntityFrameworkCore;
using GaleriaDeImagens.Models;

namespace GaleriaDeImagens.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Imagem> Imagens { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlite("Data Source=imagens.db");
        }
    }
}
