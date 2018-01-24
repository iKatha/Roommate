namespace Roommate.Api.Models
{
    public class RentingFilter
    {
        public virtual OtherOption [] OtherOptions { get; set; }
        public virtual string RoomType { get; set; }
        public virtual string RoommateQuantity { get; set; }
        public virtual string [] CurrentLocation { get; set; }
        public virtual Price PriceRange { get; set; }
        public virtual SurfaceArea SurfaceAreaRange { get; set; }
    }

    public class OtherOption
    {
        public virtual string Name { get; set; }
        public virtual bool Value { get; set; }
    }

    public class Price
    {
        public virtual float Min { get; set; }
        public virtual float Max { get; set; }
    }

    public class SurfaceArea
    {
        public virtual int Min { get; set; }
        public virtual int Max { get; set; }
    }
}