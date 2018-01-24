using Roommate.Api.Models;
using System;

namespace Roommate.Api.Entities
{
    public class Payment : Entity
    {
        public virtual DateTime Date { get; set; }
        public virtual string ShownDate { get; set; }
        public virtual double TotalCost { get; set; }
        public virtual string Reason { get; set; }
        public virtual double IndividualCharge { get; set; }
        public virtual Home Home { get; set; }
        public virtual User User { get; set; }

        public void CreatePayment(PaymentForm form, User user, int roommatesCount)
        {
            Date = DateTime.Now;
            ShownDate = DateTime.Now.ToString("dd/MM/yyyy");
            TotalCost = form.TotalCost;
            Reason = form.Reason;
            IndividualCharge = DivideTotalCost(form.TotalCost, roommatesCount);
            User = user;
            Home = user.Home;
        }

        private double DivideTotalCost(double totalCost, int count)
        {
            return totalCost / count;
        }
    }
}