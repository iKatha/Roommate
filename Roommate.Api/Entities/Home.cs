using System;

namespace Roommate.Api.Entities
{
    public class Home : Entity
    {
        public virtual string InvitationToken { get; set; }

        public void CreateInvitationToken()
        {
            InvitationToken = Guid.NewGuid().ToString(); 
        }

        public string CreateInvitationLink()
        {
            string link = string.Format("http://localhost:49226/zaproszenie?id={0}&token={1}", Id,InvitationToken);
            return link;
        }
    }
}
