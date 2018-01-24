namespace Roommate.Api.Entities
{
    public class ShoppingItem : Entity
    {
        public virtual string Name { get; set; }
        public virtual bool IsCompleted { get; set; }
        public virtual Home Home { get; set; }

        public void CreateItem(string name, Home home)
        {
            Name = name;
            Home = home;
        }

        public void ToggleIsCompleted()
        {
            IsCompleted = !IsCompleted;
        }
    }
}