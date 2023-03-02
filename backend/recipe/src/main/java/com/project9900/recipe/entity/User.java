package com.project9900.recipe.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "sys_user")
public class User {
    @TableId
    private Integer id;
    private String username;
    private String password;
    private String email;
}
