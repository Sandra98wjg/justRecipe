package com.project9900.recipe.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.sql.Timestamp;

@Data
@TableName(value = "myrecipe")
public class Recipe {
    @TableId
    private Integer rId;
    private Integer uId;
    private String name;
    private String imgUrl;
    private String ingredient;
    private String mealType;
    private Timestamp createTime;
    private Integer likeNum;
    private String userName;
    private String method;
}