namespace Roommate.Api.Models
{
    public class AccountForm
    {
        public string Email { get; set; }
        public int Phone { get; set; }
        public string Photo { get; set; }
        public string Password { get; set; }
        public string NewPassword { get; set; }
    }
}