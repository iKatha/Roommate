using System.Net.Mail;

namespace Roommate.Api.Providers
{
    public static class VerificationEmailProvider
    {
        public static void SendEmail(int id, string email, string activationToken)
        {
            
            string appMail= System.Web.Configuration.WebConfigurationManager.AppSettings["email"];
            string pswd = System.Web.Configuration.WebConfigurationManager.AppSettings["emailPassword"];
            string link = string.Format(@"<a href='http://localhost:50682/api/Account/Verify?id={0}&token={1}' > Link aktywacyjny </a>", id, activationToken);
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
            mail.IsBodyHtml = true;
            mail.From = new MailAddress(appMail);
            mail.To.Add(email);
            mail.Subject = "Roommate - link weryfikacyjny";
            mail.Body = string.Format(@"Witaj,<br />
            W celu ukończenia rejestracji kliknij w poniższy link. <br />
            {0} <br />
            Jeżeli to nie Ty dokonałeś próby rejestracji, zignoruj tą wiadomość.<br /><br />
            Pozdrawiamy, <br />
            Zespół Roommate", link);

            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential(appMail, pswd);
            SmtpServer.EnableSsl = true;

            SmtpServer.Send(mail);
            
        }
    }
}