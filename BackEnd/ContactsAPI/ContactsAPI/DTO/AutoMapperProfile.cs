using AutoMapper;
using ContactsAPI.Dto;
using ContactsAPI.Models;

namespace ContactsAPI.DTO
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile(){
            CreateMap<Contacts, ContactsDTO>();
        }
    }
}
