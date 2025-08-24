

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class TimezoneController : ControllerBase
{

    [HttpPost]
    public IActionResult ChangeTimeZone([FromBody] ChangeTimezoneRequest request)
    {
        var response = new
        {
            Utc = request.dateTime.ToUniversalTime(),
            Est = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(request.dateTime, "Eastern Standard Time"),
        };
        
        return Ok();
    }

}