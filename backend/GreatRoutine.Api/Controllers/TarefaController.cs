using GreatRoutine.Api.Data;
using GreatRoutine.Api.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using GreatRoutine.Api.Models;

namespace GreatRoutine.Api.Controllers
{
    [ApiController]
    [Route("api/tarefas")]
    [Authorize]
    public class TarefaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TarefaController(AppDbContext context)
        {
            _context = context;
        }

        // Pega o ID do usuário logado pelo TOKEN
        private int GetUserId()
        {
            return int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );
        }

        // Listar tarefas do Usuario
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            int userId = GetUserId();
            var hoje = DateTime.UtcNow.Date;

            var tarefas = await _context.Tarefas
                .Where(t => t.UsuarioId == userId)
                .OrderBy(t => t.Horario)
                .ToListAsync();

            bool precisaSalvar = false;

            foreach (var tarefa in tarefas)
            {
                if (tarefa.UltimaConclusao == null ||
                    tarefa.UltimaConclusao.Value.Date < hoje
                )
                {
                    if (tarefa.Concluida)
                    {
                        tarefa.Concluida = false;
                        precisaSalvar = true;
                    }
                }
            }

            if (precisaSalvar)
                await _context.SaveChangesAsync();

            return Ok(tarefas.OrderBy(t => t.Horario));
        }

        // Criar Tarefas
        [HttpPost]
        public async Task<IActionResult> Create(TarefaCreateDto dto)
        {
            int userId = GetUserId();

            var tarefa = new Tarefa
            {
                Titulo = dto.Titulo,
                Descricao = dto.Descricao,
                Horario = dto.Horario,
                UsuarioId = userId
            };

            _context.Tarefas.Add(tarefa);
            await _context.SaveChangesAsync();

            return Ok(tarefa);
        }

        // Atualizar Tarefa
        [HttpPut]
        public async Task<IActionResult> Update(int id, TarefaUpdateDto dto)
        {
            int userId = GetUserId();

            var tarefa = await _context.Tarefas
                .FirstOrDefaultAsync(t => t.Id == id && t.UsuarioId == userId);

            if (tarefa == null)
                return NotFound();

            if (dto.Titulo != null) tarefa.Titulo = dto.Titulo;
            if (dto.Descricao != null) tarefa.Descricao = dto.Descricao;
            if (dto.Horario.HasValue) tarefa.Horario = dto.Horario.Value;
            if (dto.Concluida.HasValue)
            {
                tarefa.Concluida = dto.Concluida.Value;
                if(dto.Concluida.Value)
                    tarefa.UltimaConclusao = DateTime.UtcNow;
            }
            await _context.SaveChangesAsync();
            return Ok(tarefa);
        }

        //Deletar Tarefa
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            int userId = GetUserId();

            var tarefa = await _context.Tarefas
                .FirstOrDefaultAsync(t => t.Id == id && t.UsuarioId == userId);

            if (tarefa == null)
                return NotFound();

            _context.Tarefas.Remove(tarefa);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}