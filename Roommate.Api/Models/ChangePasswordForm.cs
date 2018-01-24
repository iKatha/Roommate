namespace Roommate.Api.Models
{
    public class ChangePasswordForm
    {
        public int Id { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
    }
}