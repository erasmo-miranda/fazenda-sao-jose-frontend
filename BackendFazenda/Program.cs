var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors();

app.MapPost("/api/login", (LoginRequest dados) =>
{
    if (dados.Usuario == "admin" && dados.Senha == "fazenda123")
    {
        return Results.Ok(new { mensagem = "Acesso autorizado", perfil = "Administrador" });
    }
    
    if (dados.Usuario == "dev" && dados.Senha == "dev123")
    {
        return Results.Ok(new { mensagem = "Acesso autorizado", perfil = "Desenvolvedor" });
    }

    return Results.Unauthorized();
});

app.Run();

// Tipos e declarações ficam ao final do arquivo
record LoginRequest(string Usuario, string Senha);