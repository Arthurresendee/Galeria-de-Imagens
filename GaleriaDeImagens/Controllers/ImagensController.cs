using Microsoft.AspNetCore.Mvc;
using GaleriaDeImagens.Data;
using GaleriaDeImagens.Models;
using System.IO;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class ImagensController : ControllerBase
{
    private readonly AppDbContext _context;

    public ImagensController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("upload")]
    public async Task<IActionResult> UploadImagem([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("Arquivo inválido!");

        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);

        var imagem = new Imagem
        {
            Nome = file.FileName,
            Tipo = file.ContentType,
            ImagemBytes = memoryStream.ToArray()
        };

        _context.Imagens.Add(imagem);
        await _context.SaveChangesAsync();

        return Ok("Imagem salva com sucesso!");
    }

    [HttpGet]
    public IActionResult GetImagens()
    {
        var imagens = _context.Imagens;
        return Ok(imagens);
    }
}
