using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistance;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var act = await _context.Activities.FindAsync(request.Id);
                if(act == null) throw new Exception("Could not find activity");
                
                _context.Activities.Remove(act);
                
                var success = await _context.SaveChangesAsync(cancellationToken) > 0;
                if(success) return Unit.Value;
                
                throw new Exception("Problem saving changes");
            }
        }
    }
}