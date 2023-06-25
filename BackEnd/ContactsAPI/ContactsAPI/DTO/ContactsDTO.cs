using ContactsAPI.Models;
namespace ContactsAPI.Dto
{
    public class ContactsDTO
    {
         public int ContactId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public int? Contact { get; set; }

        public string Address { get; set; }

        public bool? Starred { get; set; }
    }
}
