package com.project9900.recipe.service;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.project9900.recipe.controller.dto.UserDTO;
import com.project9900.recipe.entity.*;
import com.project9900.recipe.exception.ServiceException;
import com.project9900.recipe.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;



@Service
public class UserService extends ServiceImpl<UserMapper, User> {
    
    @Autowired
    private UserMapper userMapper;


    public Integer login(User_login user_login) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",user_login.getUsername());
        queryWrapper.eq("password",user_login.getPassword());
        User one;
        try{
            one = getOne(queryWrapper);
        } catch (Exception e){
            throw new ServiceException("sys error");
        }
        if(one != null){
//            BeanUtil.copyProperties(one, userDTO,true);
            return one.getId();
        }else{
            throw new ServiceException("username/password error");
        }

    }

    public boolean saveUser(User user, Integer uId) {
//        if(user.getId() == null){
//            return save(user);
//        }else{
//            return ;
//        }
//        return saveOrUpdate(user);
        if(uId == null){
            throw new ServiceException("uId error");
        }

        if(uId == user.getId()){
            QueryWrapper<User> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("username",user.getUsername());
            User one;
            try{
                one = getOne(queryWrapper);
            } catch (Exception e){
                throw new ServiceException("sys error");
            }
            if(one == null){
                if(userMapper.update(user) == 0){
                    throw new ServiceException("update error");
                }else{
                    return true;
                }
            }else{
                throw new ServiceException("username exist");
            }
        }else{
            throw new ServiceException("id not matched");
        }

    }

    public User register(UserDTO userDTO) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",userDTO.getUsername());
        User one;
        try{
            one = getOne(queryWrapper);
        } catch (Exception e){
            throw new ServiceException("sys error");
        }
        if(one == null){
            one = new User();
            BeanUtil.copyProperties(userDTO, one);
            save(one);
        }else{
            throw new ServiceException("username exist");
        }
        QueryWrapper<User> queryWrapper_new = new QueryWrapper<>();
        queryWrapper_new.eq("username",userDTO.getUsername());
        User one_new = getOne(queryWrapper_new);
        return one_new;
    }
//    private User getUserInfo(UserDTO userDTO){
//        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
//        queryWrapper.eq("username",userDTO.getUsername());
//        queryWrapper.eq("password",userDTO.getPassword());
//        User one;
//        try{
//            one = getOne(queryWrapper);
//        } catch (Exception e){
//            throw new ServiceException();
//        }
//        return one;
//    }
    public Integer new_Recipe(Recipe_create recipe_create, Integer uId) {
        return  userMapper.new_Recipe(recipe_create, uId);
}

    public List<Map> getFollowInfoByUser(Integer uId) {
        List<Integer> followers = userMapper.getFollowIdByUser(uId);
        List<Map> result = new ArrayList<>();
        for (Integer uID : followers) {
            Map<String, Object> element = new LinkedHashMap<String, Object>() {{
                put("id", uID);
                put("name", userMapper.getNamebyUId(uID));
                put("email", userMapper.getEmailbyUId(uID));
            }};
            result.add(element);
        }
        return result;
    }

    public List<Map> getRecipeInfoByUser(Integer uId) {
        List<Recipe> recipes = userMapper.getRecipeByUser(uId);
        List<Map> result = new ArrayList<>();
        for (int i = 0; i < recipes.size(); i++) {
            Integer index = i;
            Map<String, Object> element = new LinkedHashMap<String, Object>() {{
                put("rid", recipes.get(index).getRId());
                put("username", userMapper.getNameByUId(recipes.get(index).getUId()));
                put("title", recipes.get(index).getName());
                put("img", recipes.get(index).getImgUrl());
                put("mealtype", recipes.get(index).getMealType());
            }};
            result.add(element);
        }
        return result;
    }

    public Integer newComment(Comment_create comment_create) {
        return userMapper.newComment(comment_create);
    }

    public int changeCost(String ingredient, String target)
    {
        int a = ingredient.length();
        int b = target.length();

        int[][] step = new int[a + 1][b + 1];
        for (int i = 1; i < a+1; i++) {
            step[i][0] = i;
        }
        for (int j = 1; j < b+1; j++) {
            step[0][j] = j;
        }

        int change;
        for (int i = 1; i < a+1; i++) {
            for (int j = 1; j < b+1; j++) {
                if(ingredient.charAt(i - 1) != target.charAt(j - 1)){
                    change = 1;
                }else{
                    change = 0;
                }
                int left_min = Integer.min(step[i - 1][j] + 1, step[i][j - 1] + 1);
                step[i][j] = Integer.min(left_min, step[i - 1][j - 1] + change);
            }
        }

        return step[a][b];
    }
    public double metric(String ingredient, String target) {
        if(ingredient != null && target != null){
            double max_len = Double.max(ingredient.length(), target.length());
            if(max_len > 0){
                return (max_len - changeCost(ingredient, target))/max_len;
            }else{
                return 0.0;
            }
        }else{
            return 0.0;
        }
    }
}
