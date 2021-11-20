using Microsoft.AspNetCore.Http;

namespace HttpPostModels.ViewModels
{
    public class Type2
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public IFormFile File { get; set; }
    }
}