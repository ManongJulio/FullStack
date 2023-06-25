using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;
namespace ContactsAPI.Data
{
    public class DataContext : DbContext
    {

        public DbSet<Contacts> Contacts { get; set; }

        public DataContext(DbContextOptions<DataContext> options) 
            : base(options) {
            //Database.SetCommandTimeout(2000);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contacts>().HasKey(a => a.ContactId);
            //modelBuilder.Entity<Contacts>().HasData(
            //    new { ContactsId = 1, Name = "Julius Inay", Address = "NF QC", Contact = "091732", Starred = 1 }
            //    );
        }

    }
}
