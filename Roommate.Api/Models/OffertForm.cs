using System.Collections.Generic;

namespace Roommate.Api.Models
{
    public class OffertForm
    {
        public string Login { get; set; }
        public string Province { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string Street { get; set; }
        public int BuildingNumber { get; set; }
        public int ApartamentNumber { get; set; }
        public int FloorNumber { get; set; }
        public int RoommateQuantity { get; set; }
        public int RoomType { get; set; }
        public string Description { get; set; }
        public string Tittle { get; set; }
        public double Price { get; set; }
        public bool ArePetsAllowed { get; set; }
        public bool AreMediaIncluded { get; set; }
        public bool IsEquipped { get; set; }
        public double SurfaceArea { get; set; }
        public bool IsRemoved { get; set; }
        public IList<string> Images { get; protected set; }

        public OffertForm()
        {
            Images = new List<string>();
        }
    }
}