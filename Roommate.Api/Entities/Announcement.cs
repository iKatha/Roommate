using System;

namespace Roommate.Api.Entities
{
    public class Announcement : Entity
    {
        public virtual Home Home { get; set; }
        public virtual User User { get; set; }
        public virtual DateTime Date { get; set; }
        public virtual string ShownDate { get; set; }
        public virtual string Message { get; set; }

        public void CreateAnnouncement(string message, User user)
        {
            Message = message;
            User = user;
            Home = user.Home;
            Date = DateTime.Now;
            ShownDate = Date.ToString("dd/MM/yyyy HH:mm");
        }
    }
}