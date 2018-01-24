using FluentNHibernate.Automapping;
using FluentNHibernate.Automapping.Alterations;
using Roommate.Api.Entities;

namespace Roommate.Api.NHibernate.Mapping
{
    public class CityMap : IAutoMappingOverride<City>
    {
        public void Override(AutoMapping<City> mapping)
        {
            mapping.HasMany(x => x.Districts).Element("DistrictName");
        }
    }
}