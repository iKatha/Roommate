using Roommate.Api.Models;

namespace Roommate.Api.Entities
{
    public class Configuration :Entity
    {
        public virtual Home Home { get; set; }
        public virtual Duty CleaningKitchen { get; set; }
        public virtual Duty CleaningHall { get; set; }
        public virtual Duty CleaningToilet { get; set; }
        public virtual Duty CleaningBathroom { get; set; }
        public virtual Duty CleaningSalon { get; set; }
        public virtual Duty DishWashing { get; set; }
        public virtual Duty WateringPlants { get; set; }

        public void SetCleaning(Cleaning form)
        {
            CleaningKitchen = form.CleaningKitchen;
            CleaningBathroom = form.CleaningBathroom;
            CleaningHall = form.CleaningHall;
            CleaningSalon = form.CleaningSalon;
            CleaningToilet = form.CleaningToilet;
        }

        public void SetDishWashing(Duty duty)
        {
            DishWashing = duty;
        }

        public void SetWateringPlants(Duty duty)
        {
            WateringPlants = duty;
        }
    }
}