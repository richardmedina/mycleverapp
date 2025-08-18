using ContactApi.Contract.Contact;
using ContactApi.Services.Interfaces;

namespace ContactApi.Services;

public class ContactService : IContactService
{
    private List<ContactDto> _contacts;
    
    public ContactService()
    {
        _contacts = new();
    }

    public bool Delete(int id)
    {
        var target = GetById(id);
        if (target != null)
        {
            _contacts.Remove(target);
            return true;
        }
        return false;
    }

    public IEnumerable<ContactDto> GetAll()
    {
        return _contacts.ToArray();
    }

    public ContactDto? GetById(long id)
    {
        return _contacts.FirstOrDefault();
    }

    public ContactDto Create(ContactDto contactDto)
    {
        var created = new ContactDto
        {
            Id = _contacts.Count + 1,
            FirstName = contactDto.FirstName,
            LastName = contactDto.LastName,
            DateOfBirth = contactDto.DateOfBirth
        };

        _contacts.Add(created);

        return created;
    }

    public bool Update(ContactDto contactDto)
    {
        var target = GetById(contactDto.Id);
        if (target != null)
        {
            target.FirstName = contactDto.FirstName;
            target.LastName = contactDto.LastName;
            target.DateOfBirth = contactDto.DateOfBirth;
            return true;
        }
        return false;
    }
}