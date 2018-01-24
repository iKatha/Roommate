using Roommate.Api.Models;
using System;

namespace Roommate.Api.Entities
{
    public class User : Entity
    {
        public virtual string Password { get; set; }
        public virtual string Salt { get; set; }
        public virtual string FirstName { get; set; }
        public virtual string LastName { get; set; }
        public virtual string Email { get; set; }
        public virtual int Phone { get; set; }
        public virtual string Birthday { get; set; }
        public virtual Home Home { get; set; }
        public virtual bool IsVerified { get; set; }
        public virtual string ActivationToken { get; set; }
        public virtual string RetrivePasswordToken { get; set; }
        public virtual string Picture { get; set; }
        public virtual bool IsHomeAdmin { get; set; }
        public virtual int TotalPoints { get; set; }
        public virtual int CurrentMonthPoints { get; set; }
        public virtual int TotalNumberOfTasks { get; set; }
        public virtual int TotalNumberOfCompletedTasks { get; set; }
        public virtual int CurrentMonthNumberOfTasks { get; set; }
        public virtual int CurrentMonthNumberOfCompletedTasks { get; set; }
        public virtual DateTime LastResetStatsDate { get; set; }
        public virtual DateTime LastUpdateNumberOfTasksDate { get; set; }

        public void Register(RegisterForm registerForm)
        {
            Salt = BCrypt.Net.BCrypt.GenerateSalt();
            Password = BCrypt.Net.BCrypt.HashPassword(registerForm.Password, Salt);
            FirstName = registerForm.FirstName;
            LastName = registerForm.LastName;
            Email = registerForm.Email;
            Phone = registerForm.Phone;
            Birthday = registerForm.Birthday;
            Picture = registerForm.Photo;
            IsVerified = false;
            ActivationToken = Guid.NewGuid().ToString();
            SetLastResetStatsDate();
            SetLastUpdateNumberOfTasksDate();
        }

        public void CreareRetriveToken()
        {
            RetrivePasswordToken = Guid.NewGuid().ToString();
        }

        public void ChangePassword(string password)
        {
            Salt = BCrypt.Net.BCrypt.GenerateSalt();
            Password = BCrypt.Net.BCrypt.HashPassword(password, Salt);
            ActivationToken = null;
        }

        public bool ChangePassword(string newPassword, string oldPassword)
        {
            if(newPassword != null && newPassword != Password)
            {
                oldPassword = BCrypt.Net.BCrypt.HashPassword(oldPassword, Salt);
                if (oldPassword != Password)
                    return false;
                Salt = BCrypt.Net.BCrypt.GenerateSalt();
                Password = BCrypt.Net.BCrypt.HashPassword(newPassword, Salt);
            }
            return true;
        }

        public void ChangePhone(int phone)
        {
            if (phone != 0 && phone != Phone)
                Phone = phone;
        }

        public void ChangePhoto(string photo)
        {
            if (photo != null && photo != Picture)
                Picture = photo;
        }

        public void JoinHome(Home home)
        {
            Home = home;
        }

        public void LeaveHome()
        {
            Home = null;
        }

        public void SetLastResetStatsDate()
        {
            LastResetStatsDate = DateTime.Now.Date;
        }

        public void SetLastUpdateNumberOfTasksDate()
        {
            LastUpdateNumberOfTasksDate = DateTime.Now.Date;
        }

        public void ResetCurrentMonthStats()
        {
            CurrentMonthPoints = 0;
            CurrentMonthNumberOfTasks = 0;
            CurrentMonthNumberOfCompletedTasks = 0;
        }

        public void AddPoints (int points)
        {
            CurrentMonthPoints += points;
            TotalPoints += points;
        }

        public void AddToNumberOfTasks (int number)
        {
            TotalNumberOfTasks += number;
            CurrentMonthNumberOfTasks += number;
        }

        public void AddToNumberOfCompletedTasks ()
        {
            TotalNumberOfCompletedTasks += 1;
            CurrentMonthNumberOfCompletedTasks += 1;
        }
    }
}
