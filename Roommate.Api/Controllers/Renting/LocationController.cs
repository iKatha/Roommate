using NHibernate;
using NHibernate.Linq;
using Roommate.Api.Entities;
using Roommate.Api.NHibernate;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Roommate.Api.Controllers
{
    public class LocationController : ApiController
    {
        private ISessionFactory sessionFactory = DatabaseConfiguration.CreateSessionFactory();

        [HttpPost]
        [HttpGet]
        public IList <Location> GetLocationList()
        {
            using (var session = sessionFactory.OpenSession())
            {
                IList<Location> locations = session
                    .Query<Location>()
                    .ToList();

                locations = locations.OrderBy(l => l.Province).ToList();
                foreach(var province in locations)
                {
                    province.Cities = province.Cities.OrderBy(c => c.Name).ToList();
                    foreach (var city in province.Cities)
                        city.Districts = city.Districts.OrderBy(d => d).ToList();
                }
                return locations;
            }
        }
    }
}