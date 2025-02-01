using BouncingBall.Client.Pages;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.Services.AddScoped<Simulation>();
await builder.Build().RunAsync();
