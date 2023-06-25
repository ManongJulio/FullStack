using ContactsAPI.Models;
using ContactsAPI.QueryParam;
using HotChocolate.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity.SqlServer;
using System.Linq;

namespace ContactsAPI.Data
{

    public class ContactsRepo : IContactsRepo {

        readonly DataContext _context;

        public ContactsRepo(DataContext context) {
            _context = context;
        }
        [UseFiltering]
        [UseSorting]
        public List<Contacts> GetContacts()
            {
            return _context.Contacts.ToList();
            }
        public Contacts GetContactById(int id)
            {
            return _context.Contacts.Where(a => a.ContactId == id).FirstOrDefault();
            }

         public Contacts UpdateContact(Contacts contact)
            {
            _context.Update(contact);
            _context.SaveChanges();
            return contact;
            }
         public Contacts CreateContact(Contacts contact)
            {
                _context.Update(contact);
                _context.SaveChanges();
                return contact;
            }
        public bool DeleteContact(int id)
        {
            var contact = GetContactById(id);
            if (contact == null) return false;
            _context.Remove(contact);
            _context.SaveChanges();
            return true;
        }
        public List<Contacts> Paginate(QueryParams filter) {
            var totalRows = GetContacts().Count();
            var pageCount = totalRows / filter.Page;

            if (filter.Starred == 1)
            {
                return _context.Contacts.Where(a => a.Starred == true).Skip((filter.CurrentPage - 1) * (int)filter.Page)
                .Take((int)filter.Page).OrderBy(a => a.Name).ToList();
            }
            else if (filter.Starred == 2)
            {
                return _context.Contacts.Skip((filter.CurrentPage - 1) * (int)filter.Page)
              .Take((int)filter.Page).OrderBy(a => a.Name).ToList();

            }
            else {
                return _context.Contacts.Where(a => a.Starred == false).Skip((filter.CurrentPage - 1) * (int)filter.Page)
                       .Take((int)filter.Page).OrderBy(a => a.Name).ToList();
            }

        }
        public List<Contacts> SearchByName(string query) {
            return _context.Contacts.Where(a => a.Name.Contains(query)).ToList();
            
        }
    }

   
}
