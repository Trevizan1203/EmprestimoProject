package Aplicacao.CotacaoEmprestimos.doc;

import io.swagger.v3.oas.models.tags.Tag;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API REST")
                        .version("1.0")
                        .description("Requisicoes HTTP")
                        .license(new License().name("Apache 2.0")
                        )
                )
                .tags(
                        Arrays.asList(
                                new Tag().name("Clientes").description("Requisicoes de Clientes"),
                                new Tag().name("Emprestimo").description("Requisicoes de Emprestimos"),
                                new Tag().name("Cambio").description("Requisicoes de Cambio")
                        )
                );
    }
}
