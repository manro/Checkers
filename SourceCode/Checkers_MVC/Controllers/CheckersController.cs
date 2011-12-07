using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Checkers_MVC.Models;

namespace Checkers_MVC.Controllers
{
    public class CheckersController : Controller
    {
        //
        // GET: /Checkers/
        public ViewResult Index()
        {
            if (Session["Board"] == null)
            {
                Session["Board"] =  new Board(8);
                //ViewData.Model = board;
            }
            return View();
        }

        public JsonResult GetBoard()
        {
            JsonResult json = new JsonResult();

            json.Data = (Board)Session["Board"];
            return Json(json,JsonRequestBehavior.AllowGet);
        }
    }
}
