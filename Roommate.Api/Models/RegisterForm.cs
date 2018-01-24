using System.Web;

namespace Roommate.Api.Models
{
    public class RegisterForm
    {
        public virtual string Password { get; set; }
        public virtual string FirstName { get; set; }
        public virtual string LastName { get; set; }
        public virtual string Email { get; set; }
        public virtual int Phone { get; set; }
        public virtual string Birthday { get; set; }
        public virtual string Photo { get; set; }
    }
}