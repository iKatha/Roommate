using Roommate.Api.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Roommate.Api.Generators
{
    public static class TaskGenerator
    {
        public static List<Task> GenerateTasks(Configuration configuration,IList<User> roommates)
        {
            var tasks = new List<Task>();
            DateTime startDate = DateTime.Now.AddDays(1);
            DateTime endDate = new DateTime(startDate.Year, startDate.Month, DateTime.DaysInMonth(startDate.Year, startDate.Month));

            var roommatesKitchen = new List<User>(roommates);
            var roommatesToilet = new List<User>(roommates);
            var roommatesBathroom = new List<User>(roommates);
            var roommatesHall = new List<User>(roommates);
            var roommatesSalon = new List<User>(roommates);
            var roommatesDish = new List<User>(roommates);
            var roommatesPlants = new List<User>(roommates);

            while (startDate <= endDate)
            {
                GenerateTask(startDate, tasks, configuration.CleaningKitchen, roommatesKitchen,"sprzątanie", "kuchnia");
                GenerateTask(startDate, tasks, configuration.CleaningToilet, roommatesToilet, "sprzątanie", "toaleta");
                GenerateTask(startDate, tasks, configuration.CleaningBathroom, roommatesBathroom, "sprzątanie", "łazienka");
                GenerateTask(startDate, tasks, configuration.CleaningHall, roommatesHall, "sprzątanie", "przedpokuj");
                GenerateTask(startDate, tasks, configuration.CleaningSalon, roommatesSalon, "sprzątanie", "salon");
                GenerateTask(startDate, tasks, configuration.DishWashing, roommatesDish, "mycie naczyń");
                GenerateTask(startDate, tasks, configuration.WateringPlants, roommatesPlants, "podlewanie kwiatków");

                startDate = startDate.AddDays(1);
            }

            return tasks;
        }

        private static void GenerateTask(DateTime date, IList<Task> tasks, Duty duty, IList<User> users, string name, string roomName = null)
        {
            if (!duty.IsChecked)
                return;
            if (duty.Days.Monday && date.DayOfWeek == DayOfWeek.Monday)
            {
                AddTask(users, tasks, date, name, roomName);
            }

            else if (duty.Days.Tuesday && date.DayOfWeek == DayOfWeek.Tuesday)
            {
                AddTask(users, tasks, date, name, roomName);
            }

            else if (duty.Days.Wednesday && date.DayOfWeek == DayOfWeek.Wednesday)
            {
                AddTask(users, tasks, date, name, roomName);
            }

            else if (duty.Days.Thursday && date.DayOfWeek == DayOfWeek.Thursday)
            {
                AddTask(users, tasks, date, name, roomName);
            }

            else if (duty.Days.Friday && date.DayOfWeek == DayOfWeek.Friday)
            {
                AddTask(users, tasks, date, name, roomName);
            }

            else if (duty.Days.Saturday && date.DayOfWeek == DayOfWeek.Saturday)
            {
                AddTask(users, tasks, date, name, roomName);
            }

            else if (duty.Days.Sunday && date.DayOfWeek == DayOfWeek.Sunday)
            {
                AddTask(users, tasks, date, name, roomName);
            }
        }

        private static void AddTask(IList<User> users, IList<Task> tasks, DateTime date, string name, string roomName)
        {
            var task = new Task();
            var user = users.First();
            users.Remove(user);
            users.Add(user);
            task.SetTask(user.Home, user, date, name, roomName);
            tasks.Add(task);
        }

    }
}