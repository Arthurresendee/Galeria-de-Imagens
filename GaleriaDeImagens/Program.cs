using GaleriaDeImagens.Data;
using System;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Adicionar o DbContext
builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();
app.UseCors("AllowAll");

// Mapear os endpoints
app.MapControllers();

app.Run();
