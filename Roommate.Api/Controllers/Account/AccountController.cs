using NHibernate;
using NHibernate.Linq;
using Roommate.Api.Entities;
using Roommate.Api.Enums;
using Roommate.Api.Jobs;
using Roommate.Api.Models;
using Roommate.Api.NHibernate;
using Roommate.Api.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Results;

namespace Roommate.Api.Controllers.Account
{
    public class AccountController : ApiController
    {
        private ISessionFactory sessionFactory = DatabaseConfiguration.CreateSessionFactory();

        #region Login

        [HttpPost]
        public LoginResponse Login(LoginForm loginForm)
        {
            User user;
            IList<User> roommates = new List<User>();
            IList<Task> tasks = new List<Task>();
            var response = new LoginResponse();
            using (var session = sessionFactory.OpenSession())
            {
                user = session.Query<User>()
                    .Where(u => u.Email == loginForm.Login)
                    .SingleOrDefault();

                if (user == null)
                {
                    response.Message = "Błędny login lub hasło.";
                    return response;
                }
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(loginForm.Password, user.Salt);
                if (user.Password != hashedPassword)
                {
                    response.Message = "Błędny login lub hasło.";
                    return response;
                }
                if (!user.IsVerified)
                {
                    response.Message = "Konto niezweryfikowane.";
                    return response;
                }

                if (user.Home != null)
                {
                    roommates = session.Query<User>()
                        .Where(u => u.Home == user.Home)
                        .ToList();

                    tasks = session.Query<Task>()
                        .Where(t => t.User == user)
                        .ToList();

                    foreach (var roommate in roommates)
                    {
                        UpdateUserStatsJob.ResetCurrentMonthStats(roommate);
                        UpdateUserStatsJob.AddTaskNumber(roommate);

                        if (roommate != user)
                            response.CheckForBirthday(roommate);
                    }

                    response.CheckForTask(tasks);
                }

                if (user.IsHomeAdmin)
                {
                    response.Message = UserType.HomeAdmin.ToString();
                    return response;
                }

                if (user.Home != null)
                {
                    response.Message = UserType.HasHome.ToString();
                    return response;
                }

                response.Message = UserType.NoHome.ToString();
                return response;
            }
        }

        #endregion

        #region Register

        [HttpPost]
        public string Register(RegisterForm registerForm)
        {
           using (var session = sessionFactory.OpenSession())
            {
                bool emailExists = session
                    .QueryOver<User>()
                    .Where(u => u.Email == registerForm.Email)
                    .RowCount() > 0;
                if(emailExists) return "Podany e-mail już istnieje";
            }
            using (var session = sessionFactory.OpenSession())
            {
                bool phoneExists = session
                    .QueryOver<User>()
                    .Where(u => u.Phone == registerForm.Phone)
                    .RowCount() > 0;
                if (phoneExists) return "Podany numer telefonu już istnieje";
            }
            var user = new User();
            user.Register(registerForm);
            using (var session = sessionFactory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    session.SaveOrUpdate(user);
                    VerificationEmailProvider.SendEmail(user.Id, user.Email, user.ActivationToken);
                    transaction.Commit();
                }
            }
            return "Zarejestrowano";

        }

        [HttpGet]
        public RedirectResult Verify(string id, string token)
        {
            using (var session = sessionFactory.OpenSession())
            {
                var user = session.QueryOver<User>()
                    .Where(u => u.Id == Int32.Parse(id))
                    .And(u => u.ActivationToken == token)
                    .SingleOrDefault();
                user.IsVerified = true;
                using (var transaction = session.BeginTransaction())
                {
                    session.SaveOrUpdate(user);
                    transaction.Commit();
                    return Redirect("http://localhost:49226/logowanie");
                }
            }
        }

        #endregion

        #region RetrivePassword

        [HttpGet]
        public bool RetrivePassword(string login)
        {
            bool exists = false;
            User user;
            using (var session = sessionFactory.OpenSession())
            {
                user = session
                    .Query<User>()
                    .Where(u => u.Email == login)
                    .SingleOrDefault();
                if (user != null)
                {
                    using (var transaction = session.BeginTransaction())
                    {
                        user.CreareRetriveToken();
                        session.SaveOrUpdate(user);
                        RetrivePasswordProvider.SendEmail(user.Id, user.Email, user.RetrivePasswordToken);
                        transaction.Commit();
                    }
                    exists = true;
                }
            }
            return exists;
        }

        [HttpGet]
        public RedirectResult GetRetrivePasswordPage(string id, string token)
        {
            using (var session = sessionFactory.OpenSession())
            {
                var user = session.QueryOver<User>()
                    .Where(u => u.Id == Int32.Parse(id))
                    .And(u => u.RetrivePasswordToken == token)
                    .SingleOrDefault();
                if(user != null)
                    return Redirect(string.Format("http://localhost:49226/odzyskiwanie-hasla?id={0}&token={1}",id, token));
                else 
                    return Redirect("http://localhost:49226/odzyskiwanieHaslaBlad");
            }
        }

        [HttpPost]
        public bool SetNewPassword(ChangePasswordForm form)
        {
            bool isChanged = false;
            using (var session = sessionFactory.OpenSession())
            {
                var user = session.QueryOver<User>()
                    .Where(u => u.Id == form.Id)
                    .And(u => u.RetrivePasswordToken == form.Token)
                    .SingleOrDefault();
                if (user != null)
                {
                    using (var transaction = session.BeginTransaction())
                    {
                        user.ChangePassword(form.Password);
                        session.SaveOrUpdate(user);
                        transaction.Commit();
                    }
                    isChanged = true;
                }
            }

            return isChanged;
        }

        #endregion

        #region AccountInfo

        [HttpGet]
        public AccountInfo GetAccountInfo(string login)
        {
            User user;
            using (var session = sessionFactory.OpenSession())
            {
                user = session.Query<User>()
                    .Where(u => u.Email == login)
                    .SingleOrDefault();
            }

            var accountInfo = new AccountInfo
            {
                Phone = user.Phone,
                Photo = user.Picture
            };

            return accountInfo;
        }

        [HttpPost]
        public string ChangeAccountInfo(AccountForm accountForm)
        {
            User user;
            using (var session = sessionFactory.OpenSession())
            {
                user = session.Query<User>()
                    .Where(u => u.Email == accountForm.Email)
                    .SingleOrDefault();
            }
            var isPasswordValid = user.ChangePassword(accountForm.NewPassword, accountForm.Password);
            if(!isPasswordValid)
                return "Błędne stare hasło.";

            if(accountForm.Phone != 0 && accountForm.Phone != user.Phone)
                using (var session = sessionFactory.OpenSession())
                {
                    bool phoneExists = session
                   .QueryOver<User>()
                   .Where(u => u.Phone == accountForm.Phone)
                   .RowCount() > 0;
                    if (phoneExists) return "Podany numer telefonu już istnieje.s";
                }

            using (var session = sessionFactory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    user.ChangePhone(accountForm.Phone);
                    user.ChangePhoto(accountForm.Photo);
                    session.SaveOrUpdate(user);
                    transaction.Commit();
                }
            }
            return "Zmiany w koncie zostały zapisane.";
        }

        #endregion
    }
}