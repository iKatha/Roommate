using System.Net.Mail;

namespace Roommate.Api.Providers
{
    public static class RetrivePasswordProvider
    {
        public static void SendEmail(int id, string email, string retrivePasswordToken)
        {

            string appMail = System.Web.Configuration.WebConfigurationManager.AppSettings["email"];
            string pswd = System.Web.Configuration.WebConfigurationManager.AppSettings["emailPassword"];
            string link = string.Format(@"<a href='http://localhost:50682/api/Account/GetRetrivePasswordPage?id={0}&token={1}' > Odzyskaj dostęp do konta </a>", id, retrivePasswordToken);
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
            mail.IsBodyHtml = true;
            mail.From = new MailAddress(appMail);
            mail.To.Add(email);
            mail.Subject = "Roommate - odzyskiwanie dostępu do konta";
            mail.Body = string.Format(@"Witaj,<br />
            W celu odzyskania dostępu do konta kliknij w poniższy link. <br />
            {0} <br />
            Jeżeli to nie Ty dokonałeś próby odzyskania konta, zignoruj tą wiadomość.<br /><br />
            Pozdrawiamy, <br />
            Zespół Roommate", link);

            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential(appMail, pswd);
            SmtpServer.EnableSsl = true;

            SmtpServer.Send(mail);

        }
    }
}