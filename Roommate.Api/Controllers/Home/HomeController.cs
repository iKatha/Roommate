using NHibernate;
using NHibernate.Linq;
using Roommate.Api.Entities;
using Roommate.Api.Jobs;
using Roommate.Api.Models;
using Roommate.Api.NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Roommate.Api.Controllers.Home
{
    public class HomeController : ApiController
    {
        private ISessionFactory sessionFactory = DatabaseConfiguration.CreateSessionFactory();

        [HttpGet]
        public string CreateHome(string email)
        {
            User user;
            using (var session = sessionFactory.OpenSession())
            {
                user = session.Query<User>()
                    .Where(u => u.Email == email)
                    .SingleOrDefault();

                user.IsHomeAdmin = true;
                Entities.Home home = new Entities.Home();
                user.JoinHome(home);

                using (var transaction = session.BeginTransaction())
                {
                    session.SaveOrUpdate(home);
                    session.SaveOrUpdate(user);
                    transaction.Commit();
                }

                user = session.Query<User>()
                    .Where(u => u.Email == email)
                    .SingleOrDefault();
                return "Utworzono mieszkanie.";
            }
        }

        [HttpGet]
        public string CreateInvitationLink(string email)
        {
            User user;
            using (var session = sessionFactory.OpenSession())
            {
                user = session.Query<User>()
                    .Where(u => u.Email == email)
                    .SingleOrDefault();

                user.Home.CreateInvitationToken();
                string link = user.Home.CreateInvitationLink();

                using (var transaction = session.BeginTransaction())
                {
                    session.SaveOrUpdate(user.Home);
                    transaction.Commit();
                }
                return link;
            }
        }

        [HttpPost]
        public string JoinHome(JoinHomeForm form)
        {
            using (var session = sessionFactory.OpenSession())
            {
                var home = session.QueryOver<Entities.Home>()
                    .Where(h => h.Id == Int32.Parse(form.HomeId))
                    .And(h => h.InvitationToken == form.Token)
                    .SingleOrDefault();

                if (home == null)
                    return "Niepoprawne zaproszenie.";

                var user = session.Query<User>()
                    .Where(u => u.Email == form.Email)
                    .SingleOrDefault();

                if (user.Home !=null)
                    return "Posiadasz już mieszkanie.";

                user.JoinHome(home);

                using(var transaction = session.BeginTransaction())
                {
                    session.SaveOrUpdate(user);
                    transaction.Commit();
                    return "Dołączono do grupy.";
                }
            }
        }

        [HttpGet]
        public string LeaveHome(string email)
        {
            using (var session = sessionFactory.OpenSession())
            {
                var user = session.Query<User>()
                    .Where(u => u.Email == email)
                    .SingleOrDefault();

                var roommatesCount = session.Query<User>()
                    .Where(u => u.Home == user.Home)
                    .Count();

                if (user.IsHomeAdmin && roommatesCount > 1)
                    return "Aby opuścić grupę musisz przekazać admina innemu współlokatorowi.";

                user.LeaveHome();

                using (var transaction = session.BeginTransaction())
                {
                    session.SaveOrUpdate(user);
                    transaction.Commit();
                    return "Opuściłeś grupę mieszkania.";
                }

            }
        }

        [HttpGet]
        public void ChangeAdmin(string adminEmail, string newAdminEmail)
        {
            using (var session = sessionFactory.OpenSession())
            {
                var currentAdmin = session.Query<User>()
                    .Where(u => u.Email == adminEmail)
                    .SingleOrDefault();

                var newAdmin = session.Query<User>()
                    .Where(u => u.Email == newAdminEmail)
                    .SingleOrDefault();

                currentAdmin.IsHomeAdmin = false;
                newAdmin.IsHomeAdmin = true;

                using (var transaction = session.BeginTransaction())
                {
                    session.SaveOrUpdate(currentAdmin);
                    session.SaveOrUpdate(newAdmin);
                    transaction.Commit();
                }
            }
        }

        [HttpGet]
        public IList<User> GetRoommates(string email)
        {
            using (var session = sessionFactory.OpenSession())
            {
                var user = session.Query<User>()
                    .Where(u => u.Email == email)
                    .SingleOrDefault();

                var roommates = session.Query<User>()
                    .Where(u => u.Home == user.Home)
                    .ToList();

                return roommates;
            }
        }
    }
}
