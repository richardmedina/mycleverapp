using ContactApi.Contract.Contact;
using ContactApi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ContactApi.Api.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;
    public ContactController(IContactService contactService)
    {
        _contactService = contactService;
    }

    [HttpGet("{id:long}")]
    public IActionResult GetById(long id)
    {
        var contact = _contactService.GetById(id);
        return contact == null
            ? Ok(contact)
            : NotFound();
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_contactService.GetAll());
    }

    [HttpPost]
    public IActionResult Create(ContactDto contact)
    {
        if (contact == null) return BadRequest();

        var created = _contactService.Create(contact);

        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut]
    public IActionResult Update(ContactDto contact)
    {
        bool result = _contactService.Update(contact);

        return result
            ? Ok()
            : NotFound();
    }
}