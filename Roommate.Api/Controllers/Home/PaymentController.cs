using NHibernate;
using NHibernate.Linq;
using Roommate.Api.Entities;
using Roommate.Api.Models;
using Roommate.Api.NHibernate;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Roommate.Api.Controllers.Home
{
    public class PaymentController : ApiController
    {
        private ISessionFactory sessionFactory = DatabaseConfiguration.CreateSessionFactory();

        [HttpPost]
        public Payment AddPayment(PaymentForm form)
        {
            User user;
            using (var session = sessionFactory.OpenSession())
            {
                user = session.Query<User>()
                    .Where(u => u.Email == form.Email)
                    .SingleOrDefault();

                var roommatesCount = session.Query<User>()
                    .Where(u => u.Home == user.Home)
                    .Count();

                Payment payment = new Payment();
                payment.CreatePayment(form, user, roommatesCount);

                using (var transaction = session.BeginTransaction())
                {
                    session.SaveOrUpdate(payment);
                    transaction.Commit();
                }
                return payment;
            }
        }

        [HttpGet]
        public List<Payment> GetPaymentList(string email)
        {
            using (var session = sessionFactory.OpenSession())
            {
                var user = session.Query<User>()
                    .Where(u => u.Email == email)
                    .SingleOrDefault();

                var payments = session.Query<Payment>()
                    .Where(p => p.Home == user.Home)
                    .OrderByDescending(p => p.Date)
                    .ToList();

                return payments;
            }
        }
    }
}
