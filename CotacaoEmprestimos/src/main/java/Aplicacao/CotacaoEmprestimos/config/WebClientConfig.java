package Aplicacao.CotacaoEmprestimos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.http.HttpHeaders;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient webClient(WebClient.Builder builder) {
        return builder
                .baseUrl("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/")
                .build();
    }
}
