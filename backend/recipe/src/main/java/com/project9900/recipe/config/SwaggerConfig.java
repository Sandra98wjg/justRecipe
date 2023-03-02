package com.project9900.recipe.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket restApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("Interface")
                .apiInfo(apiInfo("Recipe", "2.9.2"))
                .useDefaultResponseMessages(true)
                .forCodeGeneration(false)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.project9900.recipe.controller"))
                .paths(PathSelectors.any())
                .build();
    }


    private ApiInfo apiInfo(String title, String version) {
        return new ApiInfoBuilder()
                .title(title)
                .description("www.google.com")
                .termsOfServiceUrl("www.google.com")
                .contact(new Contact("Just do it", "www.google.com", "www.google.com"))
                .version(version)
                .build();
    }
}
