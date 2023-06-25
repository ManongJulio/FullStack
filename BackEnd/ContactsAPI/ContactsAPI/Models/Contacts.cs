using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Models
{
    public class Contacts 
    {
        
        public int ContactId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public int? Contact { get; set; }

        public string Address { get; set; }

        public bool? Starred { get; set; }
    
    }
}
