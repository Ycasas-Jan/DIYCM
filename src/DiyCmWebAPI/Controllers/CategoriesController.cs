using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using DiyCmDataModel.Construction;
using Microsoft.AspNet.Cors;

namespace DiyCmWebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/Categories")]
    [EnableCors("AllowAll")]
    public class CategoriesController : Controller
    {
        private DiyCmContext _context;

        public CategoriesController(DiyCmContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public IEnumerable<Category> GetCategories()
        {
            return _context.Categories;
        }


        [HttpGet]
        [Route("budgetClose")]
        // GET: api/Categories/budgetClose/5 (MUST KNOW THE PROJECT ID)
        /*
            A list of categories that is close to being over budget(1000 diffrence) 
            and categories that are over budget
        */
        public List<Category> budgetClose([FromRoute] int projectID)
        {
            List<Category> returnList = new List<Category>();

            var categoryList = _context.Categories;

            foreach(Category cat in categoryList)
            {
                if(cat.ProjectId == projectID && cat.VarianceAmount <= 1000)
                {
                    returnList.Add(cat);
                }
            }

            return returnList;
        }

        // GET: api/Categories/5
        [HttpGet("{id}", Name = "GetCategory")]
        public IActionResult GetCategory([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            Category category = _context.Categories.Single(m => m.CategoryId == id);

            if (category == null)
            {
                return HttpNotFound();
            }

            return Ok(category);
        }

        // PUT: api/Categories/5
        [HttpPut("{id}")]
        public IActionResult PutCategory(int id, [FromBody] Category category)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            if (id != category.CategoryId)
            {
                return HttpBadRequest();
            }

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return HttpNotFound();
                }
                else
                {
                    throw;
                }
            }

            return new HttpStatusCodeResult(StatusCodes.Status204NoContent);
        }

        // POST: api/Categories
        [HttpPost]
        public IActionResult PostCategory([FromBody] Category category)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            _context.Categories.Add(category);
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CategoryExists(category.CategoryId))
                {
                    return new HttpStatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("GetCategory", new { id = category.CategoryId }, category);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(int id)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            Category category = _context.Categories.Single(m => m.CategoryId == id);
            if (category == null)
            {
                return HttpNotFound();
            }

            _context.Categories.Remove(category);
            _context.SaveChanges();

            return Ok(category);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CategoryExists(int id)
        {
            return _context.Categories.Count(e => e.CategoryId == id) > 0;
        }
    }
}