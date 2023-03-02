package com.project9900.recipe.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "comment_of_recipe")
public class Comment_create {
    @TableId
    private Integer rId;
    private Integer uId;
    private String content;
}
