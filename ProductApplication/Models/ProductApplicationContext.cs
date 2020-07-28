using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ProductApplication.Models
{
    public class ProductApplicationContext : DbContext
    {
       
    
        public ProductApplicationContext() : base("name=ProductApplicationContext")
        {
        }

        public System.Data.Entity.DbSet<ProductApplication.Models.Products> Products { get; set; }
    }
}
