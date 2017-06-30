using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SampleApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Trace()
        {
            ViewData["Message"] = "Trace test.";

            // read a cookie
            string mykey = Request.Cookies["mykey"];

            // write a cookie
            CookieOptions options = new CookieOptions();
            options.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Append("mykey", "hello", options);
            
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
