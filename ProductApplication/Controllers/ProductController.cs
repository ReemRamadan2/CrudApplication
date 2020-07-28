using Newtonsoft.Json;
using ProductApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ProductApplication.Controllers
{
    public class ProductController : Controller
    {
        // GET: Product
        public async Task<ActionResult> Index()
        {
            List<Products> productList = new List<Products>();
            HttpResponseMessage responseMessage = GlobalVariables.webApiClient.GetAsync("Product").Result;
            if (responseMessage.IsSuccessStatusCode)
            {
                var responseData = responseMessage.Content.ReadAsStringAsync().Result;
                productList = JsonConvert.DeserializeObject<List<Products>>(responseData);

            }
            return View(productList);
        }


       

    }
}