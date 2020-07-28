using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ProductApplication.Models
{
    public class Products
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public Nullable<decimal> Price { get; set; }

        [Required]
        public string Category { get; set; }
    }
}