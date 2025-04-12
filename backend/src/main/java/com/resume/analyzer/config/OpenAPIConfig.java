package com.resume.analyzer.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI openAPI() {
        Server localServer = new Server()
            .url("http://localhost:8080")
            .description("Local Development Server");

        Contact contact = new Contact()
            .name("Resume Analyzer Team")
            .email("contact@resumeanalyzer.com");

        License license = new License()
            .name("MIT License")
            .url("https://opensource.org/licenses/MIT");

        Info info = new Info()
            .title("Resume Analyzer API")
            .version("1.0.0")
            .contact(contact)
            .description("API documentation for Resume Analyzer application")
            .license(license);

        return new OpenAPI()
            .info(info)
            .servers(List.of(localServer));
    }
}