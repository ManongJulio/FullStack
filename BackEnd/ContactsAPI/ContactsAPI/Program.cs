using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using ContactsAPI.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ContactsAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
            //var builder = WebApplication.CreateBuilder(args);
            //builder.Services.AddControllersWithViews();
            //var connectionString = builder.Configuration
            //    .GetConnectionString(name: "DefaultConnection");

            ////builder.Services.AddEndpointsApiExplorer();
            ////builder.Services.AddSwaggerGen();
            //builder.Services.AddDbContext<DataContext>(options => {
            //    options.UseMySql(connectionString, 
            //        ServerVersion.AutoDetect(connectionString));
            //});
            //var app = builder.Build();

            //if (app.Environment.IsDevelopment()) {
            //    app.UseSwagger();
            //    app.UseSwaggerUI();
            //}
            //app.UseHttpsRedirection();


        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
