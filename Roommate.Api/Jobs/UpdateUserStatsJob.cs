using NHibernate;
using Roommate.Api.Entities;
using Roommate.Api.NHibernate;
using System;

namespace Roommate.Api.Jobs
{
    public static class UpdateUserStatsJob
    {
        private static ISessionFactory sessionFactory = DatabaseConfiguration.CreateSessionFactory();

        public static void ResetCurrentMonthStats(User user)
        {
            using (var session = sessionFactory.OpenSession())
            {
                if (user.LastResetStatsDate.Month != DateTime.Now.Month)
                {
                    user.SetLastResetStatsDate();
                    user.ResetCurrentMonthStats();

                    using (var transaction = session.BeginTransaction())
                    {
                        session.SaveOrUpdate(user);
                        transaction.Commit();
                    }
                }
            }
        }

        public static void AddTaskNumber(User user)
        {
            using (var session = sessionFactory.OpenSession())
            {
                var tasks = session.QueryOver<Task>()
                    .Where(t => t.User == user)
                    .And(t => t.DateTime.Date <= DateTime.Now.Date)
                    .And(t => t.DateTime.Date > user.LastUpdateNumberOfTasksDate.Date)
                    .List();

                user.AddToNumberOfTasks(tasks.Count);
                user.SetLastUpdateNumberOfTasksDate();

                using (var transaction = session.BeginTransaction())
                {
                    session.Merge(user);
                    transaction.Commit();
                }
            }
        }
    }
}