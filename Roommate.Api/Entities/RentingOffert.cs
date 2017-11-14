namespace Roommate.Api.Entities
{
    public class RentingOffert : Entity
    {
        public virtual User User { get; set; }
        public virtual Location Location { get; set; }
        public virtual string Street { get; set; }
        public virtual int BuildingNumber { get; set; }
        public virtual int ApartamentNumber { get; set; }
        public virtual int FloorNumber { get; set; }
        public virtual int RoomQuantity { get; set; }
        public virtual bool IsShared { get; set; }
        public virtual string Description { get; set; }
        public virtual double Price { get; set; }
        public virtual bool ArePetsAllowed { get; set; }
        public virtual bool IsEquipped { get; set; }
        public virtual double SurfaceArea { get; set; }
        //public virtual IList <ImageSource> Images {get; protected set;}

    }
}
