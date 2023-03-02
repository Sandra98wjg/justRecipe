package com.project9900.recipe.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "like_of_recipe")
public class Like {
    @TableId
    private Integer uId;
    private Integer rId;
    private Integer likeStatus;
}
