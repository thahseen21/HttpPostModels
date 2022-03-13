using Microsoft.AspNetCore.Http;

namespace HttpPostModels.ViewModels
{
    public class Type3
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public IFormFile File { get; set; }

        public bool IsContinue { get; set; }
        
        
    }
}