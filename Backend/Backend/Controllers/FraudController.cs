using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/fraud")]
[Authorize]
public class FraudController : ControllerBase
{
    private readonly IHttpClientFactory _factory;

    public FraudController(IHttpClientFactory factory)
    {
        _factory = factory;
    }

    // SINGLE TRANSACTION
    [HttpPost("predict")]
    public async Task<IActionResult> Predict([FromBody] List<double> features)
    {
        var client = _factory.CreateClient("FastApiClient");

        var response = await client.PostAsJsonAsync(
            "/predict",
            new { features });

        if (!response.IsSuccessStatusCode)
            return StatusCode((int)response.StatusCode, "FastAPI error");

        var result = await response.Content.ReadAsStringAsync();
        return Ok(result);
    }

    // CSV UPLOAD
    [HttpPost("predict-csv")]
    public async Task<IActionResult> PredictCsv(IFormFile file)
    {
        var client = _factory.CreateClient("FastApiClient");

        var content = new MultipartFormDataContent();
        content.Add(new StreamContent(file.OpenReadStream()), "file", file.FileName);

        var response = await client.PostAsync("/predict-csv", content);

        if (!response.IsSuccessStatusCode)
            return StatusCode((int)response.StatusCode, "FastAPI error");

        var result = await response.Content.ReadAsStringAsync();
        return Ok(result);
    }
}
