namespace Roommate.Api.Entities
{
    public class Mark : Entity
    {
        public virtual User User { get; set; }
        public virtual int Number { get; set; }
        public virtual Task Task { get; set; }
    }
}