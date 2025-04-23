using System.ComponentModel.DataAnnotations;

namespace StudentCrudApi.Models
{
    public class Student
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; } 
        public string LastName { get; set; }
        public string RollNumber { get; set; }
        public string Gender { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
