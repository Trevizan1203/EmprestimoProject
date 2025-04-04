package Aplicacao.CotacaoEmprestimos.services;

import Aplicacao.CotacaoEmprestimos.api.DTOs.EmprestimoChartDTO;
import Aplicacao.CotacaoEmprestimos.api.DTOs.EmprestimoRequestDTO;
import Aplicacao.CotacaoEmprestimos.entities.Emprestimo;
import Aplicacao.CotacaoEmprestimos.repository.ClientesRepository;
import Aplicacao.CotacaoEmprestimos.repository.EmprestimosRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class EmprestimoService {

    private final ClientesRepository clientesRepository;
    private final EmprestimosRepository emprestimosRepository;
    private final CambioService cambioService;

    public EmprestimoService(ClientesRepository clientesRepository, EmprestimosRepository emprestimosRepository, CambioService cambioService) {
        this.clientesRepository = clientesRepository;
        this.emprestimosRepository = emprestimosRepository;
        this.cambioService = cambioService;
    }

    private Double calcularValorFinalComJuros(Double valor, Double taxaJuros, long meses) {
        return valor * Math.pow(1 + (taxaJuros/12)/100, meses);
    }

    private Double calcularTaxaConversao(Double valor, Double cotacao) {
        return valor * cotacao;
    }

    private static long calcularDiferencaMeses(LocalDate dataInicial, LocalDate dataFinal) {
        return ChronoUnit.MONTHS.between(dataInicial,dataFinal);
    }

    @Transactional
    public void createEmprestimo(@RequestBody EmprestimoRequestDTO dto) {
        var user = clientesRepository.findById(dto.clienteId());
        if (user.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado");

        Double cotacao = cambioService.obterTaxaCambio(dto.moeda(), LocalDate.parse(dto.dataEmprestimo())).get().cotacaoCompra();

        Double valorReais = calcularTaxaConversao(dto.valorObtido(), cotacao);

        Double valorFinal = calcularValorFinalComJuros(valorReais, 12.0, calcularDiferencaMeses(LocalDate.parse(dto.dataEmprestimo()), LocalDate.parse(dto.dataVencimento())));

        Emprestimo emprestimo = new Emprestimo();

        emprestimo.setValorFinal(valorFinal);
        emprestimo.setTaxaConversao(cotacao);
        emprestimo.setCliente(user.get());
        emprestimo.setMoeda(dto.moeda());
        emprestimo.setValorObtido(dto.valorObtido());
        emprestimo.setMeses(calcularDiferencaMeses(LocalDate.parse(dto.dataEmprestimo()), LocalDate.parse(dto.dataVencimento())));
        emprestimo.setDataEmprestimo(LocalDate.parse(dto.dataEmprestimo()));
        emprestimo.setDataVencimento(LocalDate.parse(dto.dataVencimento()));

        emprestimosRepository.save(emprestimo);
    }

    public Emprestimo getEmprestimoById(Long id) {
        return emprestimosRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Emprestimo nao encontrado"));
    }

    public List<Emprestimo> getAllEmprestimos() {
        return emprestimosRepository.findAll();
    }

    public List<EmprestimoChartDTO> getAllEmprestimoChart() {
        List<Emprestimo> emprestimos = getAllEmprestimos();
        List<EmprestimoChartDTO> emprestimosChart = new ArrayList<>();

        for (Emprestimo emprestimo : emprestimos) {
            EmprestimoChartDTO aux = new EmprestimoChartDTO(
                    emprestimo.getId(),
                    emprestimo.getStatus(),
                    emprestimo.getValorFinal()
            );
            emprestimosChart.add(aux);
        }
        return emprestimosChart;
    }

    @Transactional
    public void updateEmprestimo(Long id, @RequestBody EmprestimoRequestDTO dto) {
        Emprestimo emprestimo = getEmprestimoById(id);

        Double cotacao = cambioService.obterTaxaCambio(dto.moeda(), LocalDate.parse(dto.dataEmprestimo())).get().cotacaoCompra();

        Double valorReais = calcularTaxaConversao(dto.valorObtido(), cotacao);

        Double valorFinal = calcularValorFinalComJuros(valorReais, 12.0, calcularDiferencaMeses(LocalDate.parse(dto.dataEmprestimo()), LocalDate.parse(dto.dataVencimento())));

        emprestimo.setValorFinal(valorFinal);
        emprestimo.setTaxaConversao(cotacao);
        emprestimo.setMoeda(dto.moeda());
        emprestimo.setValorObtido(dto.valorObtido());
        emprestimo.setMeses(calcularDiferencaMeses(LocalDate.parse(dto.dataEmprestimo()), LocalDate.parse(dto.dataVencimento())));
        emprestimo.setDataEmprestimo(LocalDate.parse(dto.dataEmprestimo()));
        emprestimo.setDataVencimento(LocalDate.parse(dto.dataVencimento()));

        emprestimosRepository.save(emprestimo);
    }

    @Transactional
    public void deleteEmprestimoById(Long id) {
        if(!emprestimosRepository.existsById(id))
            throw new EntityNotFoundException("Emprestimo nao encontrado");
        emprestimosRepository.deleteById(id);
    }

    @Transactional
    public void pagarEmprestimo(Long id) {
        Emprestimo emprestimo = emprestimosRepository.getEmprestimoById(id);
        emprestimo.pagarEmprestimo();
    }
}
