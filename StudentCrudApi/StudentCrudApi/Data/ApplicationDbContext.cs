using System;
using Microsoft.EntityFrameworkCore;
using StudentCrudApi.Models;

namespace StudentCrudApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Student> Students { get; set; }
    }
}
