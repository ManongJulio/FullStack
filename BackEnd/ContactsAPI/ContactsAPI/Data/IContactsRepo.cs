using ContactsAPI.Models;
using ContactsAPI.QueryParam;
using System.Collections.Generic;
using System.Linq;

namespace ContactsAPI.Data
{
    public interface IContactsRepo
    {
        public List<Contacts> GetContacts();
        public Contacts GetContactById(int id);
        public Contacts UpdateContact(Contacts contact);
        public Contacts CreateContact(Contacts contact);
        public bool DeleteContact(int id);
        public List<Contacts> Paginate(QueryParams filter);
        public List<Contacts> SearchByName(string query);

    }
}
