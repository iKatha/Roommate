using System.Collections.Generic;

namespace Roommate.Api.Entities
{
    public class Location : Entity
    {
        public virtual string Province { get; set; }
        public virtual string City { get; set; }
        public virtual string District { get; set; }
        public virtual IList <RentingOffert> RentingOffers { get; protected set; }

        public Location()
        {
            RentingOffers = new List<RentingOffert>();
        }

        public virtual void AddRentingOffert(RentingOffert rentingOffert)
        {
            RentingOffers.Add(rentingOffert);
            rentingOffert.Location = this;
        }
    }
}
