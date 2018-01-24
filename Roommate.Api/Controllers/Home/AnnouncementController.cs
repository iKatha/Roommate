using NHibernate;
using NHibernate.Linq;
using Roommate.Api.Entities;
using Roommate.Api.NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Roommate.Api.Controllers.Home
{
    public class AnnouncementController : ApiController
    {
        private ISessionFactory sessionFactory = DatabaseConfiguration.CreateSessionFactory();

        [HttpGet]
        public Announcement AddAnnouncement(string message, string email)
        {
            User user;
            using (var session = sessionFactory.OpenSession())
            {
                user = session.Query<User>()
                    .Where(u => u.Email == email)
                    .SingleOrDefault();

                Announcement announcement = new Announcement();
                announcement.CreateAnnouncement(message, user);

                using (var transaction = session.BeginTransaction())
                {
                    session.SaveOrUpdate(announcement);
                    transaction.Commit();
                }
                return announcement;
            }
        }

        [HttpGet]
        public void DeleteAnnouncement(string id)
        {
            
            using (var session = sessionFactory.OpenSession())
            {
                var announcement = session.Load<Announcement>(Int32.Parse(id));
                using (var transaction = session.BeginTransaction())
                {
                    session.Delete(announcement);
                    transaction.Commit();
                }
            }
        }

        [HttpGet]
        public List<Announcement> GetAnnouncementList(string email)
        {
            using (var session = sessionFactory.OpenSession())
            {
                var user = session.Query<User>()
                    .Where(u => u.Email == email)
                    .SingleOrDefault();

                var announcements = session.Query<Announcement>()
                    .Where(a => a.Home == user.Home)
                    .OrderByDescending(a => a.Date)
                    .ToList();

                return announcements;
            }
        }
    }
}
