using Roommate.Api.Models;
using System;
using System.Collections.Generic;

namespace Roommate.Api.Entities
{
    public class RentingOffert : Entity
    {
        public virtual User User { get; set; }
        public virtual string Province { get; set; }
        public virtual string City { get; set; }
        public virtual string District { get; set; }
        public virtual string Street { get; set; }
        public virtual int BuildingNumber { get; set; }
        public virtual int ApartamentNumber { get; set; }
        public virtual int FloorNumber { get; set; }
        public virtual int RoommateQuantity { get; set; }
        public virtual int RoomType { get; set; }
        public virtual string Description { get; set; }
        public virtual string Tittle { get; set; }
        public virtual double Price { get; set; }
        public virtual bool ArePetsAllowed { get; set; }
        public virtual bool AreMediaIncluded { get; set; }
        public virtual bool IsEquipped { get; set; }
        public virtual double SurfaceArea { get; set; }
        public virtual bool IsRemoved { get; set; }
        public virtual DateTime CreateDate { get; set; }
        public virtual string ShownCreateDate { get; set; }
        public virtual IList<string> Images { get; set; }

        public RentingOffert()
        {
            Images = new List<string>();
        }

        public void AsignUser(User user)
        {
            User = user;
        }

        public void SetValues(OffertForm offertForm)
        {
            CreateDate = DateTime.Now;
            ShownCreateDate = DateTime.Now.ToString("dd/MM/yyyy HH:mm");
            Images = offertForm.Images;
            IsRemoved = false;
            SurfaceArea = offertForm.SurfaceArea;
            IsEquipped = offertForm.IsEquipped;
            AreMediaIncluded = offertForm.AreMediaIncluded;
            ArePetsAllowed = offertForm.ArePetsAllowed;
            Price = offertForm.Price;
            Province = offertForm.Province;
            City = offertForm.City;
            District = offertForm.District;
            Street = offertForm.Street;
            BuildingNumber = offertForm.BuildingNumber;
            ApartamentNumber = offertForm.ApartamentNumber;
            FloorNumber = offertForm.FloorNumber;
            RoommateQuantity = offertForm.RoommateQuantity;
            RoomType = offertForm.RoomType;
            Description = offertForm.Description;
            Tittle = offertForm.Tittle;
        }
    }
}
