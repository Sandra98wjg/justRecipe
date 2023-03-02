package com.project9900.recipe.entity;


import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "subscribe")
public class Subscribe {
    @TableId
    private Integer followerId;
    private Integer contributorId;
    private Integer status;
}
