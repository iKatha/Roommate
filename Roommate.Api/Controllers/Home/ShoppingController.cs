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
    public class ShoppingController : ApiController
    {
        private ISessionFactory sessionFactory = DatabaseConfiguration.CreateSessionFactory();

        [HttpGet]
        public ShoppingItem AddItem(string name, string email)
        {
            User user;
            using (var session = sessionFactory.OpenSession())
            {
                user = session.Query<User>()
                    .Where(u => u.Email == email)
                    .SingleOrDefault();

                ShoppingItem item = new ShoppingItem();
                item.CreateItem(name, user.Home);

                using (var transaction = session.BeginTransaction())
                {
                    session.SaveOrUpdate(item);
                    transaction.Commit();
                }
                return item;
            }
        }

        [HttpGet]
        public void ToggleIsCompleted(string id)
        {
            using (var session = sessionFactory.OpenSession())
            {
                var item = session.Query<ShoppingItem>()
                    .Where(i => i.Id == Int32.Parse(id))
                    .SingleOrDefault();

                item.ToggleIsCompleted();

                using (var transaction = session.BeginTransaction())
                {
                    session.SaveOrUpdate(item);
                    transaction.Commit();
                }
            }
        }

        [HttpGet]
        public List<ShoppingItem> GetShoppingList(string email)
        {
            using (var session = sessionFactory.OpenSession())
            {
                var user = session.Query<User>()
                    .Where(u => u.Email == email)
                    .SingleOrDefault();

                var items = session.Query<ShoppingItem>()
                    .Where(i => i.Home == user.Home)
                    .ToList();

                return items;
            }
        }

        [HttpGet]
        public void ClearList(string email)
        {
            using (var session = sessionFactory.OpenSession())
            {
                var user = session.Query<User>()
                    .Where(u => u.Email == email)
                    .SingleOrDefault();

                var items = session.Query<ShoppingItem>()
                    .Where(i => i.Home == user.Home)
                    .ToList();

                using (var transaction = session.BeginTransaction())
                {
                    foreach(var item in items)
                    {
                        session.Delete(item);

                    }
                   transaction.Commit();
                }
            }
        }
    }
}
