using GoldPriceTracker.Api.Services;

const string AngularCorsPolicy = "Angular";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSingleton<IGoldPriceService, InMemoryGoldPriceService>();

// Allow the Angular app (ng serve on 4200, SSR build on 4000) to call this API.
builder.Services.AddCors(options => options.AddPolicy(AngularCorsPolicy, policy => policy
    .WithOrigins("http://localhost:4200", "http://localhost:4000")
    .AllowAnyHeader()
    .WithMethods("GET")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    var xmlFile = $"{typeof(Program).Assembly.GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFile));
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(AngularCorsPolicy);
app.MapControllers();

app.Run();
