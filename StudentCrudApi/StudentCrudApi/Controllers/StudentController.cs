using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentCrudApi.Data;
using StudentCrudApi.Models;

namespace StudentCrudApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StudentController(ApplicationDbContext context) { 
            _context = context;
        }

        [HttpGet]
        [Route("GetStudent")]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            return await _context.Students.ToListAsync();
        }

        [HttpPost]
        [Route("AddStudent")]
        public async Task<ActionResult<Student>> AddStudent(Student student)
        {
            _context.Students.Add(student);
            await _context.SaveChangesAsync();
            return student;
        }

        [HttpDelete]
        [Route("DeleteStudent/{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null) return NotFound();
            _context.Students.Remove(student);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
