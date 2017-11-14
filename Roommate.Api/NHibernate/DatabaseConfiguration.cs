using FluentNHibernate.Automapping;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Tool.hbm2ddl;
using Roommate.Api.Entities;

namespace Roommate.Api.NHibernate
{
    public static class DatabaseConfiguration
    {
        public static ISessionFactory CreateSessionFactory()
        {
            var cfg = new StoreConfiguration();
            var connectionString = "Server = localhost; Database = roommate; Uid = root; Pwd = root";
            return Fluently.Configure()
                .Database(MySQLConfiguration.Standard.ConnectionString(connectionString))
                .Mappings(m =>
                    m.AutoMappings
                        .Add(AutoMap.AssemblyOf<Entity>(cfg)
                            .IgnoreBase<Entity>()))
                .ExposeConfiguration(c => new SchemaUpdate(c).Execute(false, true))
                .BuildSessionFactory();
        }
    }
}
