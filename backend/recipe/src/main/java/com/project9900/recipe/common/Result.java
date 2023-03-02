package com.project9900.recipe.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {

    private Integer uId;
    public static Result success(Integer uId){
        return new Result(uId);
    }
}
