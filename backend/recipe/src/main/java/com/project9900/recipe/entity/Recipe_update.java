package com.project9900.recipe.entity;

import lombok.Data;

@Data
public class Recipe_update {
    private String name;
    private String imgUrl;
    private String ingredient;
    private String mealType;
    private String method;
}
