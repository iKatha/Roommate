using NHibernate;
using NHibernate.Linq;
using Roommate.Api.Entities;
using Roommate.Api.Models;
using Roommate.Api.NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Roommate.Api.Controllers.Renting
{
    public class RentingOffertController : ApiController
    {
        private ISessionFactory sessionFactory = DatabaseConfiguration.CreateSessionFactory();

        [HttpPost]
        public IList <RentingOffert> GetOffertList(RentingFilter rentingFilter)
        {
            using (var session = sessionFactory.OpenSession())
            {
                bool areMediaIncluded = rentingFilter.OtherOptions.SingleOrDefault(x => x.Name == "Media w cenie").Value;
                bool allOtherOptions = rentingFilter.OtherOptions.SingleOrDefault(x => x.Name == "Wszystko").Value;
                bool arePetsAllowed = rentingFilter.OtherOptions.SingleOrDefault(x => x.Name == "Zwierzęta").Value;
                bool isEquipped = rentingFilter.OtherOptions.SingleOrDefault(x => x.Name == "Wyposażenie").Value;
                string roommateQuantity = rentingFilter.RoommateQuantity;

                IList<RentingOffert> offerts = session
                    .QueryOver<RentingOffert>()
                    .Where(o => !o.IsRemoved)
                    .AndRestrictionOn(o => o.SurfaceArea).IsBetween(rentingFilter.SurfaceAreaRange.Min).And(rentingFilter.SurfaceAreaRange.Max)
                    .AndRestrictionOn(o => o.Price).IsBetween(rentingFilter.PriceRange.Min).And(rentingFilter.PriceRange.Max)
                    .OrderBy(o => o.CreateDate).Asc
                    .List();

                if (areMediaIncluded)
                    offerts = offerts.Where(o => o.AreMediaIncluded).ToList();
                if (arePetsAllowed)
                    offerts = offerts.Where(o => o.ArePetsAllowed).ToList();
                if (isEquipped)
                    offerts = offerts.Where(o => o.IsEquipped).ToList();

                if (rentingFilter.CurrentLocation.Length == 3)
                    offerts = offerts.Where(o => o.Province == rentingFilter.CurrentLocation[2] && o.City == rentingFilter.CurrentLocation[1] && o.District == rentingFilter.CurrentLocation[0]).ToList();
                else if (rentingFilter.CurrentLocation.Length == 2)
                    offerts = offerts.Where(o => o.Province == rentingFilter.CurrentLocation[1] && o.City == rentingFilter.CurrentLocation[0]).ToList();
                else if (rentingFilter.CurrentLocation[0] != "Cała Polska" )
                    offerts = offerts.Where(o => o.Province == rentingFilter.CurrentLocation[0]).ToList();

                if(rentingFilter.RoomType == "Jednoosobowy")
                    offerts = offerts.Where(o => o.RoomType == 1).ToList();
                else if (rentingFilter.RoomType == "Dwuosobowy")
                    offerts = offerts.Where(o => o.RoomType == 2).ToList();
                else if (rentingFilter.RoomType == "Trzyosobowy i więcej")
                    offerts = offerts.Where(o => o.RoomType >=3).ToList();

                if (rentingFilter.RoommateQuantity != "Wszystko")
                    if (rentingFilter.RoomType == "5 i więcej")
                        offerts = offerts.Where(o => o.RoommateQuantity >= 5).ToList();
                    else
                        offerts = offerts.Where(o => o.RoommateQuantity == Int32.Parse(rentingFilter.RoommateQuantity)).ToList();

                return offerts;
            }
        }

        [HttpPost]
        public void AddOffert(OffertForm newOffert)
        {
            User user;
            using (var session = sessionFactory.OpenSession())
            {
                user = session
                    .Query<User>()
                    .Where(u => u.Email == newOffert.Login)
                    .SingleOrDefault();

                RentingOffert rentingOffert = new RentingOffert();
                rentingOffert.AsignUser(user);
                rentingOffert.SetValues(newOffert);
                using (var transaction = session.BeginTransaction())
                {
                    session.SaveOrUpdate(rentingOffert);
                    transaction.Commit();
                }
            }
        }

        [HttpGet]
        public RentingOffert GetChosenOffert(string id)
        {
            using (var session = sessionFactory.OpenSession())
            {
                var offert = session
                    .QueryOver<RentingOffert>()
                    .Where(o => o.Id == Int32.Parse(id))
                    .And(o => !o.IsRemoved)
                    .SingleOrDefault();

                return offert;
            }
        }

        [HttpGet]
        public IList<RentingOffert> GetMyOfferts(string email)
        {
            using (var session = sessionFactory.OpenSession())
            {
                var offert = session
                    .Query<RentingOffert>()
                    .Where(o => o.User.Email == email && !o.IsRemoved)
                    .ToList();

                return offert;
            }
        }

        [HttpGet]
        public void RemoveOffert(string id)
        {
            using (var session = sessionFactory.OpenSession())
            {
                var offert = session
                    .Query<RentingOffert>()
                    .Where(o => o.Id == Int32.Parse(id))
                    .SingleOrDefault();

                offert.IsRemoved = true;

                using (var transaction = session.BeginTransaction())
                {
                    session.SaveOrUpdate(offert);
                    transaction.Commit();
                }
            }
        }
    }
}
