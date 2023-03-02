package com.project9900.recipe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class RecipeApplication {

    public static void main(String[] args) {
        SpringApplication.run(RecipeApplication.class, args);
    }

}
