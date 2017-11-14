using System.Collections.Generic;

namespace Roommate.Api.Entities
{
    public class User : Entity
    {
        public virtual string Surname { get; set; }
        public virtual string Name { get; set; }
        public virtual string Email { get; set; }
        public virtual int PhoneNumber { get; set; }
        public virtual string BirthdayDay { get; set; }
        public virtual IList <RentingOffert> RentingOffers { get; protected set; }
        public virtual Home Home { get; set; }
        //public virtual IList <Duty> Duties { get; protected set; }
        public virtual bool IsVerified { get; set; }
        public virtual string VeryfingCode { get; set; }
        public virtual bool IsLogged { get; set; }
        //public virtual Date LastDateLoggedIn { get; set; }

        public User()
        {
            RentingOffers = new List<RentingOffert>();
        }
    }
}
