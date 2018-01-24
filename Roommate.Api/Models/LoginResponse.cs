using Roommate.Api.Entities;
using System;
using System.Collections.Generic;

namespace Roommate.Api.Models
{
    public class LoginResponse
    {
        public IList <User> RoommatesWhoHaveBirthday { get; set; }
        public IList <Task> TasksToDoToday { get; set; }
        public string Message { get; set; }

        public LoginResponse()
        {
            RoommatesWhoHaveBirthday = new List<User>();
            TasksToDoToday = new List<Task>();
        }

        public void CheckForBirthday(User user)
        {
            var today = DateTime.Now.ToString("dd/MM/yyyy");
            if (user.Birthday.Equals(today))
                RoommatesWhoHaveBirthday.Add(user);
        }

        public void CheckForTask(IList <Task> tasks)
        {
            var today = DateTime.Now.Date;
            
            foreach(var task in tasks)
            {
                if (task.DateTime.Date == today && !task.IsCompleted)
                    TasksToDoToday.Add(task);
            }
        }
    }
}