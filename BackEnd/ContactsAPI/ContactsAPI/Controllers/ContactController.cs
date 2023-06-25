using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ContactsAPI.Data;
using ContactsAPI.Dto;
using ContactsAPI.Models;
using ContactsAPI.QueryParam;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [Route("api/controller")]
    [ApiController]
    public class ContactController : Controller
    {
        readonly IContactsRepo _repo;
        readonly IMapper _mapper;
        public ContactController(IContactsRepo repo, IMapper mapper) {
            _repo = repo;
            _mapper = mapper;
        }
        // GET: api/<controller>
        [HttpGet]
        public async Task<IActionResult> GetContacts() {
            List<Contacts> contacts = _repo.GetContacts();
            List<ContactsDTO> result = _mapper.Map<List<ContactsDTO>>(contacts);
            return await Task.FromResult(Ok(result));
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetContactById(int id)
        {
            return await Task.FromResult(Ok(_repo.GetContactById(id)));
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<IActionResult> CreateContact(Contacts contact)
        {
            return await Task.FromResult(Ok(_repo.CreateContact(contact)));
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(Contacts contact)
        {
            return await Task.FromResult(Ok(_repo.UpdateContact(contact)));
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var result = _repo.DeleteContact(id);
            if(result) return await Task.FromResult(Ok());
            return NotFound();
        }
        [HttpPost("paginate")]
        public async Task<IActionResult> Paginate(QueryParams filter)
        {
            var totalRows = _repo.GetContacts().Count();
            return await Task.FromResult(Ok(
                new
                {
                    contacts = _repo.Paginate(filter),
                    totalRows = totalRows
                }
                )); ;
        }
        [HttpGet("query/{query}")]
        public async Task<IActionResult> SearchByName(string query)
        {
            var result = _repo.SearchByName(query);
            if (result == null) return NotFound();
            return await Task.FromResult(Ok(result));
        }
                
    }
}
