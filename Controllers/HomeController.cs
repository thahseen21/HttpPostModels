using System.IO;
using HttpPostModels.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HttpPostModels.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class HomeController : ControllerBase
    {

        //Use Debugger to check the data in the models.

        //The data should be converted to json to hit this action and to set content type as application/json.
        //else the data will be sent in other content type and it will not catch here.
        [HttpPost]
        public IActionResult InsertType1(Type1 model)
        {
            return Ok();
        }

        //This post method accepts query params https://localhost:5001/home/insertType2?id=1&name=potato .
        [HttpPost]
        public IActionResult InsertType2(int id, string name)
        {
            return Ok();
        }

        //Form data are accepted using FromForm attribute.
        [HttpPost]
        public IActionResult InsertType3([FromForm] Type1 model)
        {
            return Ok();
        }

        //This method is not valid.

        // [HttpPost]
        // public IActionResult InsertType4([FromBody] Type1 model1, [FromForm] Type1 model2)
        // {
        //     return Ok();
        // }


        [HttpPost]
        public IActionResult InsertType5(IFormFile file)
        {
            return Ok();
        }

        //This is not valid because the while using FromForm attr the prop in the IFormFile becomes a input kinda of thing of contenttype,length,name,filename which are present inside the IFormFile rather than being a file input .
        // [HttpPost]
        // public IActionResult InsertType6([FromForm] IFormFile file)
        // {
        //     return Ok();
        // }

        //File and input values
        [HttpPost]
        public IActionResult InsertType7([FromForm] Type2 model)
        {
            return Ok();
        }

        //Not working
        [HttpPost]
        public IActionResult PauseFileUpload([FromForm] Type3 model)
        {
            try
            {
                if (model.File == null)
                {
                    return BadRequest();
                }

                //the path to save the incoming file
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), "Resources");

                //Checking whether the folder exist or else create a folder using the pathToSave variable
                if (!Directory.Exists(pathToSave))
                {
                    Directory.CreateDirectory(pathToSave);
                }

                //getting the file name from incoming file
                var fileName = model.File.FileName;

                //the final path where the file would save
                var fullPath = Path.Combine(pathToSave, fileName);

                // creates a stream for a file to read and write 
                var stream = new FileStream(fullPath, FileMode.Create);

                //writing the file to final directory
                model.File.CopyTo(stream);

                stream.Close();

                //The path of the incoming file is added with the employee entity

                return Ok();

            }
            catch (System.Exception ex)
            {
                // TODO
                return BadRequest();
            }
        }

    }
}

/// <summary>
/// 1.multipart/form-data is used while sending large binary files or larger files.

/// 2.Sometimes the data from client will sent but in the server the data will be null or undefined it is because the content-type has not been properly mentioned or there will some mismatch in the content-type.

/// 3.Multiple content-type is not allowed. InsertType4 is not a valid one.

///
///</summary>