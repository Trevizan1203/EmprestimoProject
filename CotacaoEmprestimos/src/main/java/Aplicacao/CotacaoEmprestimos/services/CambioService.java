package Aplicacao.CotacaoEmprestimos.services;

import Aplicacao.CotacaoEmprestimos.api.DTOs.CotacaoDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class CambioService {

    private final WebClient webClient;

    public CambioService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Optional<CotacaoDTO> obterTaxaCambio (String moeda, LocalDate dataEmprestimo) {
        String data = dataEmprestimo.format(DateTimeFormatter.ofPattern("MM-dd-yyyy"));
        String url = "CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='" + moeda + "'&@dataCotacao='" + data + "'&$format=json";

        try {
            String response = webClient.get().uri(url).retrieve().bodyToMono(String.class).block();
            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonNode = mapper.readTree(response);
            JsonNode valores = jsonNode.get("value");
            if(valores.size() == 0)
                return obterTaxaCambio(moeda, dataEmprestimo.minusDays(1));

            if (valores != null && valores.isArray() && valores.size() > 0) {
                JsonNode cotacao = valores.get(valores.size() - 1);
                CotacaoDTO cotacaoMoeda = new CotacaoDTO(
                        moeda,
                        cotacao.get("cotacaoCompra").asDouble(),
                        cotacao.get("cotacaoVenda").asDouble(),
                        cotacao.get("paridadeCompra").asDouble(),
                        cotacao.get("paridadeVenda").asDouble()
                );
                return Optional.of(cotacaoMoeda);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Optional.empty();
    }
}
