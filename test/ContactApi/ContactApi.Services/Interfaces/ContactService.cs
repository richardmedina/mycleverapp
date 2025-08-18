using ContactApi.Contract.Contact;

namespace ContactApi.Services.Interfaces;


public interface IContactService
{
    public ContactDto? GetById(long id);
    public IEnumerable<ContactDto> GetAll();
    ContactDto Create(ContactDto contactDto);
    public bool Update(ContactDto contactDto);
    public bool Delete(int id);
}