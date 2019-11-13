using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> List(CancellationToken ct) // example of cancellation token
        {
            var res = await _mediator.Send(new List.Query(), ct);
            return Ok(res);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Details(Guid id)
        {
            var res = await _mediator.Send(new Details.Query{Id = id});
            return Ok(res);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Create.Command command)
        {
            var res = await _mediator.Send(command);
            return Ok(res);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            var res = await _mediator.Send(command);
            return Ok(res);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var res = await _mediator.Send(new Delete.Command{Id = id});
            return Ok(res);
        }
    }
}