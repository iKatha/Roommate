using System;
using System.Collections.Generic;

namespace Roommate.Api.Entities
{
    public class Task : Entity
    {
        public virtual Home Home { get; set; }
        public virtual User User { get; set; }
        public virtual DateTime DateTime { get; set; }
        public virtual string Date { get; set; }
        public virtual bool IsCompleted { get; set; }
        public virtual bool CanBeCompleted { get; set; }
        public virtual float AverageMark { get; set; }
        public virtual string Name { get; set; }
        public virtual string RoomName { get; set; }
        public virtual int MyMark { get; set; }

        public void SetTask(Home home,User user, DateTime date, string name, string roomName = null)
        {
            Home = home;
            User = user;
            DateTime = date;
            Date = date.ToString("dd/MM/yyyy");
            Name = name;
            RoomName = roomName;
        }

        public void CountAverageMark(List<Mark> allMarks)
        {
            float sum = 0;
            foreach (var mark in allMarks)
                sum += mark.Number;
            AverageMark = sum / allMarks.Count;
        }
    }
}