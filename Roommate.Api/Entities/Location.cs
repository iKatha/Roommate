using System.Collections.Generic;

namespace Roommate.Api.Entities
{
    public class Location : Entity
    {
        public virtual string Province { get; set; }
        public virtual IList <City> Cities { get; set; }

        public Location()
        {
            Cities = new List<City>();
        }
    }

    public class City : Entity
    {
        public virtual string Name { get; set; }
        public virtual IList <string> Districts { get; set; }

        public City()
        {
            Districts = new List<string>();
        }
    }
}
