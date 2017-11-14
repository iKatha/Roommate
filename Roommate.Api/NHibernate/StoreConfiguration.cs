using FluentNHibernate.Automapping;
using System;

namespace Roommate.Api.NHibernate
{
    public class StoreConfiguration : DefaultAutomappingConfiguration
    {
        public override bool ShouldMap(Type type)
        {
            return type.Namespace == "Roommate.Api.Entities";
        }
    }
}