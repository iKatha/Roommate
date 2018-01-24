namespace Roommate.Api.Entities
{
    public class Duty : Entity
    {
        public virtual bool IsChecked { get; set; }
        public virtual Days Days { get; set; }
    }

    public class Days : Entity
    {
        public virtual bool Monday { get; set; }
        public virtual bool Tuesday { get; set; }
        public virtual bool Wednesday { get; set; }
        public virtual bool Thursday { get; set; }
        public virtual bool Friday { get; set; }
        public virtual bool Saturday { get; set; }
        public virtual bool Sunday { get; set; }
    }
}
