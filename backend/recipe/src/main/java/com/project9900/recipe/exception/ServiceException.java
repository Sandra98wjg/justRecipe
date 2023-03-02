package com.project9900.recipe.exception;

import lombok.Getter;

@Getter
public class ServiceException extends RuntimeException{
    private String error;
    public ServiceException(String error){
        this.error = error;
    }
}
