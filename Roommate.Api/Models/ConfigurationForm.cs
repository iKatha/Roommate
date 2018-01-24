using Roommate.Api.Entities;

namespace Roommate.Api.Models
{
    public class ConfigurationForm
    {
        public string Email { get; set; }
        public Configuration Configuration { get; set; }
    }

    public class Configuration
    {
        public Cleaning Cleaning { get; set; }
        public Duty DishWashing { get; set; }
        public Duty WateringPlants { get; set; }
    }

    public class Cleaning
    {
        public Duty CleaningKitchen { get; set; }
        public Duty CleaningHall { get; set; }
        public Duty CleaningToilet { get; set; }
        public Duty CleaningBathroom { get; set; }
        public Duty CleaningSalon { get; set; }
    }
}