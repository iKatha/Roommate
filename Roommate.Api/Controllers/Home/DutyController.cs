using NHibernate;
using NHibernate.Linq;
using Roommate.Api.Entities;
using Roommate.Api.Generators;
using Roommate.Api.Models;
using Roommate.Api.NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Roommate.Api.Controllers.Home
{
    public class DutyController : ApiController
    {
        private ISessionFactory sessionFactory = DatabaseConfiguration.CreateSessionFactory();

        [HttpGet]
        public Entities.Configuration FetchConfiguration(string email)
        {
            using (var session = sessionFactory.OpenSession())
            {
                var user = session.Query<User>()
                    .Where(u => u.Email == email)
                    .SingleOrDefault();

                var configuration = session.Query<Entities.Configuration>()
                    .Where(c => c.Home == user.Home)
                    .SingleOrDefault();

                return configuration;
            }
        }

        [HttpPost]
        public void SetConfiguration(ConfigurationForm form)
        {
            using (var session = sessionFactory.OpenSession())
            {
                var user = session.Query<User>()
                    .Where(u => u.Email == form.Email)
                    .SingleOrDefault();

                var configuration = session.Query<Entities.Configuration>()
                    .Where(c => c.Home == user.Home)
                    .SingleOrDefault();
                if(configuration == null)
                    configuration = new Entities.Configuration();

                configuration.Home = user.Home;
                configuration.SetCleaning(form.Configuration.Cleaning);
                configuration.SetDishWashing(form.Configuration.DishWashing);
                configuration.SetWateringPlants(form.Configuration.WateringPlants);
                using (var transaction = session.BeginTransaction())
                {
                    session.SaveOrUpdate(configuration.CleaningToilet.Days);
                    session.SaveOrUpdate(configuration.CleaningBathroom.Days);
                    session.SaveOrUpdate(configuration.CleaningKitchen.Days);
                    session.SaveOrUpdate(configuration.CleaningHall.Days);
                    session.SaveOrUpdate(configuration.CleaningSalon.Days);
                    session.SaveOrUpdate(configuration.WateringPlants.Days);
                    session.SaveOrUpdate(configuration.DishWashing.Days);

                    session.SaveOrUpdate(configuration.DishWashing);
                    session.SaveOrUpdate(configuration.CleaningToilet);
                    session.SaveOrUpdate(configuration.CleaningBathroom);
                    session.SaveOrUpdate(configuration.CleaningKitchen);
                    session.SaveOrUpdate(configuration.CleaningHall);
                    session.SaveOrUpdate(configuration.CleaningSalon);
                    session.SaveOrUpdate(configuration.WateringPlants);

                    session.SaveOrUpdate(configuration);
                    transaction.Commit();
                }
            }
        }

        [HttpGet]
        public void GenerateTasks(string email)
        {
            using (var session = sessionFactory.OpenSession())
            {
                var user = session.Query<User>()
                    .Where(u => u.Email == email)
                    .SingleOrDefault();

                var tasks = session.Query<Task>()
                    .Where(t => t.Home == user.Home)
                    .ToList();

                using (var transaction = session.BeginTransaction())
                {
                    DateTime tomorrow = DateTime.Now.AddDays(1);
                    foreach (var task in tasks)
                    {
                        if (task.DateTime.Date >= tomorrow.Date)
                            session.Delete(task);
                    }
                    transaction.Commit();
                }

                var configuration = session.Query<Entities.Configuration>()
                    .Where(c => c.Home == user.Home)
                    .SingleOrDefault();

                var users = session.Query<User>()
                    .Where(u => u.Home == user.Home)
                    .ToList();

                var newTasks = TaskGenerator.GenerateTasks(configuration, users);

                using (var transaction = session.BeginTransaction())
                {
                    foreach (var task in newTasks)
                    {
                        session.SaveOrUpdate(task);
                    }
                    transaction.Commit();
                }
            }
        }

        [HttpGet]
        public IList<Task> LoadTasks(string email)
        {
            using (var session = sessionFactory.OpenSession())
            {
                var user = session.Query<User>()
                    .Where(u => u.Email == email)
                    .SingleOrDefault();

                var thisMonth = DateTime.Today.Month;
                var thisYear = DateTime.Today.Year;
                var tasks = session.QueryOver<Task>()
                    .Where(t => t.Home == user.Home)
                    .And(t => t.DateTime.Month == thisMonth)
                    .And(t => t.DateTime.Year == thisYear)
                    .List();

                var today = DateTime.Now.Date;

                foreach(var task in tasks)
                {
                    if (task.DateTime.Date <= today)
                        task.CanBeCompleted = true;

                    var myMark = session.QueryOver<Mark>()
                        .Where(m => m.User == user)
                        .And(m => m.Task == task)
                        .SingleOrDefault();

                    if(myMark != null)
                        task.MyMark = myMark.Number;
                }

                return tasks;
            }
        }

        [HttpGet]
        public void CompleteTask(string id)
        {
            using (var session = sessionFactory.OpenSession())
            {
                var task = session.Query<Task>()
                    .Where(t => t.Id == Int32.Parse(id))
                    .SingleOrDefault();

                task.IsCompleted = true;

                task.User.AddPoints(2);
                task.User.AddToNumberOfCompletedTasks();

                using (var transaction = session.BeginTransaction())
                {
                    session.SaveOrUpdate(task);
                    session.SaveOrUpdate(task.User);
                    transaction.Commit();
                }
            }
        }

        [HttpPost]
        public double MarkTask(MarkForm form)
        {
            using (var session = sessionFactory.OpenSession())
            {
                var task = session.Query<Task>()
                    .Where(t => t.Id == form.TaskId)
                    .SingleOrDefault();

                var user = session.Query<User>()
                    .Where(u => u.Email == form.Email)
                    .SingleOrDefault();

                var mark = new Mark {
                    Number = form.Mark,
                    User = user,
                    Task = task
                };

                //add points to person who made the task
                task.User.AddPoints(mark.Number);

                //add points to person who marked the task
                user.AddPoints(1);

                using (var transaction = session.BeginTransaction())
                {
                    session.SaveOrUpdate(mark);
                    session.SaveOrUpdate(user);
                    session.SaveOrUpdate(task.User);
                    transaction.Commit();
                }

                var allMarks = session.Query<Mark>()
                    .Where(m => m.Task == task)
                    .ToList();

                task.CountAverageMark(allMarks);

                using (var transaction = session.BeginTransaction())
                {
                    session.SaveOrUpdate(task);
                    transaction.Commit();
                }

                return task.AverageMark;
            }
        }
    }
}
