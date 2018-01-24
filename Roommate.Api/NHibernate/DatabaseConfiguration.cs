using FluentNHibernate.Automapping;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using FluentNHibernate.Conventions.Helpers;
using NHibernate;
using NHibernate.Tool.hbm2ddl;
using Roommate.Api.Entities;
using Roommate.Api.NHibernate.Mapping;

namespace Roommate.Api.NHibernate
{
    public static class DatabaseConfiguration
    {
        public static ISessionFactory CreateSessionFactory()
        {
            var cfg = new StoreConfiguration();
            var connectionString = "Server = localhost; Database = roommate; Uid = root; Pwd = root; CharSet=utf8";
            return Fluently.Configure()
                .Database(MySQLConfiguration.Standard.ConnectionString(connectionString))
                .Mappings(m =>
                    m.AutoMappings
                        .Add(AutoMap.AssemblyOf<Entity>(cfg)
                            .IgnoreBase<Entity>()
                            .UseOverridesFromAssemblyOf<CityMap>()
                            .Conventions.Add(DefaultLazy.Never())))
                .ExposeConfiguration(c => new SchemaUpdate(c).Execute(false, true))
                .BuildSessionFactory();
        }
    }
}
