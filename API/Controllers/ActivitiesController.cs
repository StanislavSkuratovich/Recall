using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API.Controllers
{
  public class ActivitiesController : BaseApiController
  {
      [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken token)
    {
        var result =await Mediator.Send(new List.Query(), token);
        return result;
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        var result = await Mediator.Send(new Details.Query {Id = id});
        return result;
    }

    [HttpPost]
    public async Task<IActionResult> PostActivity([FromBody]Activity activity)
    {
        await Mediator.Send(new Create.Command {Activity = activity});
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditActivity(Guid id, Activity activity)
    {
        activity.id = id;
        await Mediator.Send(new Edit.Command {Activity = activity});
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
        await Mediator.Send(new Delete.Command() { Id = id});
        return Ok();
    }
    }
}