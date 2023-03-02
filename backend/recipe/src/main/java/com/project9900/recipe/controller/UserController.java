package com.project9900.recipe.controller;

import cn.hutool.core.util.StrUtil;
import com.project9900.recipe.common.Result;
import com.project9900.recipe.controller.dto.UserDTO;
import com.project9900.recipe.entity.*;
import com.project9900.recipe.mapper.UserMapper;
import com.project9900.recipe.service.LikeService;
import com.project9900.recipe.service.SubscribeService;
import com.project9900.recipe.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
@CrossOrigin
public class UserController {
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private SubscribeService subscribeService;

    @Autowired
    private LikeService likeService;
    @PutMapping("/user/userUpdate/{uId}")
    public ResponseEntity<?> save(@PathVariable Integer uId,
                                  @RequestBody User user) {
        return ResponseEntity.ok().body(userService.saveUser(user, uId));
    }

    @PostMapping("/user/userLogin")
    public ResponseEntity<?> login(@RequestBody User_login user_login){
        String username = user_login.getUsername();
        String password = user_login.getPassword();
        if(StrUtil.isBlank(username) || StrUtil.isBlank(password)){
            return ResponseEntity.badRequest().body("error");
        }
        Integer uId = userService.login(user_login);
        return ResponseEntity.ok(Result.success(uId));
    }


    @PutMapping("/user/userRegister")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO){
        String username = userDTO.getUsername();
        String password = userDTO.getPassword();
        if(StrUtil.isBlank(username) || StrUtil.isBlank(password)){
            return ResponseEntity.badRequest().body("error");
        }
        User one = userService.register(userDTO);
        Integer uId = one.getId();
        return ResponseEntity.ok(Result.success(uId));
    }
    @PostMapping("/recipe/createRecipe/{uId}")
    public ResponseEntity<?> new_Recipe(@PathVariable Integer uId,
                                        @RequestBody Recipe_create recipe_create) {
        return ResponseEntity.ok(userService.new_Recipe(recipe_create, uId));
    }
    @GetMapping("/recipe/getRecipe/{rId}/{uId}")
    public ResponseEntity<?> getDetail(@PathVariable Integer rId, @PathVariable Integer uId) {
        String ingredient = userMapper.getRecipeById(rId).getIngredient();
        List<Recipe_recommend> recipes;
        if(ingredient != null && ingredient.length() != 0){
            ingredient=ingredient.replaceAll( "[^\\s^a-z^A-Z]", "");
            recipes = userMapper.similarRecipe("["+ingredient+"]", rId);
            for (int i = 0; i < recipes.size(); i++) {
                recipes.get(i).setUserName(userMapper.getNamebyUId(recipes.get(i).getUId()));
            }
            for (int i = 0; i < recipes.size()-1; i++) {
                for (int j = 0; j < recipes.size()-1-i; j++){
                    if(userService.metric(recipes.get(j).getIngredient(), ingredient) < userService.metric(recipes.get(j+1).getIngredient(), ingredient)){
                        Collections.swap(recipes, j, j+1);
                    }
                }
            }
        }else{
            recipes = new ArrayList<>();
        }
        List<Recipe_recommend> newRecipes;
        if(recipes.size() > 9){
            newRecipes = recipes.subList(0, 9);
        }else{
            newRecipes = recipes;
        }
        Recipe recipe_now = userMapper.getRecipeById(rId);
        LinkedHashMap<String, Object> recipe = new LinkedHashMap<String, Object> () {{
            put("rid", recipe_now.getRId());
            put("uid", recipe_now.getUId());
            put("author", userMapper.getNameByUId(recipe_now.getUId()));
            put("name", recipe_now.getName());
            put("imgurl", recipe_now.getImgUrl());
            put("ingredient", recipe_now.getIngredient());
            put("mealtype", recipe_now.getMealType());
            put("likenum", recipe_now.getLikeNum());
            put("likestatus", likeService.getStatus(uId, rId));
            put("createtime", recipe_now.getCreateTime());
            put("method", recipe_now.getMethod());
            put("comment", userMapper.getComment(rId));
            put("similar", newRecipes);
            put("notebook", userMapper.getNotebook(uId, rId));
        }};

        return ResponseEntity.ok(recipe);
    }

    @GetMapping("/user/getProfile/{uId}/{current_uId}")
    public  ResponseEntity<?> getProfile(@PathVariable Integer uId, @PathVariable Integer current_uId) {
        if(uId == current_uId){
            LinkedHashMap<String, Object> profile = new LinkedHashMap<String, Object> () {{
                put("name", userMapper.getNamebyUId(uId));
                put("email", userMapper.getEmailbyUId(uId));
                put("recipes", userService.getRecipeInfoByUser(uId));
                put("follows", userService.getFollowInfoByUser(uId));
            }};
            return ResponseEntity.ok(profile);
        }else{
            LinkedHashMap<String, Object> profile = new LinkedHashMap<String, Object> () {{
                put("name", userMapper.getNamebyUId(uId));
                put("email", userMapper.getEmailbyUId(uId));
                put("recipes", userService.getRecipeInfoByUser(uId));
                put("status", userMapper.getStatus(current_uId, uId));
                put("follows", userService.getFollowInfoByUser(uId));
            }};
            return ResponseEntity.ok(profile);
        }
    }
    @PostMapping("/comment/newComment")
    public ResponseEntity<?> newComment(@RequestBody Comment_create comment_create){
        return ResponseEntity.ok(userService.newComment(comment_create));
    }
    @PostMapping("/like/setLike")
    public ResponseEntity<?> setLike(@RequestBody Like like){
        return ResponseEntity.ok(likeService.setLike(like));
    }
    @GetMapping("/searchRecipe/RecipeTitle/{aa}")
    public  ResponseEntity<?> getRecipeByRecipeTitle(@PathVariable String aa) {
        String vague_aa = '%'+ aa +'%';
        List<Recipe> recipe = userMapper.searchRecipeByRecipeTitle(vague_aa);

        for (int i = 0; i < recipe.size(); i++) {
            Integer index = i;
            recipe.get(index).setUserName(userMapper.getNamebyUId(recipe.get(index).getUId()));
        }

        LinkedHashMap<String, Object> result = new LinkedHashMap<String, Object> () {{
            put("recipes", recipe);
        }};
        return ResponseEntity.ok(result);
    }

    @GetMapping("/searchRecipe/ProviderName/{aa}")
    public  ResponseEntity<?> getRecipeByProviderName(@PathVariable String aa) {
        String vague_aa = '%'+ aa +'%';
        List<Recipe> recipe = userMapper.searchRecipeByProviderName(vague_aa);

        for (int i = 0; i < recipe.size(); i++) {
            Integer index = i;
            recipe.get(index).setUserName(userMapper.getNamebyUId(recipe.get(index).getUId()));
        }
        LinkedHashMap<String, Object> result = new LinkedHashMap<String, Object> () {{
            put("recipes", recipe);
        }};
        return ResponseEntity.ok(result);

    }

    @GetMapping("/searchRecipe/Ingredient/{aa}")
    public  ResponseEntity<?> getRecipeByIngredient(@PathVariable String aa) {
        String vague_aa = '%'+ aa +'%';
        List<Recipe> recipe = userMapper.searchRecipeByIngredient(vague_aa);

        for (int i = 0; i < recipe.size(); i++) {
            Integer index = i;
            recipe.get(index).setUserName(userMapper.getNamebyUId(recipe.get(index).getUId()));
        }
        LinkedHashMap<String, Object> result = new LinkedHashMap<String, Object> () {{
            put("recipes", recipe);
        }};
        return ResponseEntity.ok(result);
    }
    @GetMapping("/searchRecipe/Method/{aa}")
    public  ResponseEntity<?> getRecipeByMethod(@PathVariable String aa) {
        String vague_aa = '%'+ aa +'%';
        List<Recipe> recipe = userMapper.searchRecipeByMethod(vague_aa);

        for (int i = 0; i < recipe.size(); i++) {
            Integer index = i;
            recipe.get(index).setUserName(userMapper.getNamebyUId(recipe.get(index).getUId()));
        }
        LinkedHashMap<String, Object> result = new LinkedHashMap<String, Object> () {{
            put("recipes", recipe);
        }};
        return ResponseEntity.ok(result);
    }

    @GetMapping("/searchRecipe/All/{aa}")
    public  ResponseEntity<?> getRecipeByAll(@PathVariable String aa) {
        String vague_aa = '%'+ aa +'%';

        List<Recipe> recipe = userMapper.searchRecipeByAll(vague_aa);
        for (int i = 0; i < recipe.size(); i++) {
            Integer index = i;
            recipe.get(index).setUserName(userMapper.getNamebyUId(recipe.get(index).getUId()));
        }
        LinkedHashMap<String, Object> result = new LinkedHashMap<String, Object> () {{
            put("recipes", recipe);
        }};
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/deleteRecipe/{rId}")
    public  ResponseEntity<?> deleteRecipe(@PathVariable Integer rId) {
        Integer result = userMapper.deleteRecipe(rId);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/updateRecipe/{rId}")
    public ResponseEntity<?> save(@PathVariable Integer rId,
                                  @RequestBody Recipe_update recipe_update) {
        return ResponseEntity.ok().body(userMapper.updateRecipe(recipe_update.getName(), recipe_update.getImgUrl(), recipe_update.getIngredient(), recipe_update.getMealType(), recipe_update.getMethod(), rId));
    }

    @GetMapping("/mainPage/whatshot")
    public ResponseEntity<?> whatshot() {
        List<Recipe> recipe = userMapper.whatshot();

        for (int i = 0; i < recipe.size(); i++) {
            Integer index = i;
            recipe.get(index).setUserName(userMapper.getNamebyUId(recipe.get(index).getUId()));
        }
        LinkedHashMap<String, Object> result = new LinkedHashMap<String, Object> () {{
            put("recipes", recipe);
        }};
        return ResponseEntity.ok(result);
    }

    @GetMapping("/mainPage/newsFeed/{uId}")
    public ResponseEntity<?> newsFeed(@PathVariable Integer uId) {
        List<Recipe> recipe = userMapper.newsFeed(uId);

        for (int i = 0; i < recipe.size(); i++) {
            Integer index = i;
            recipe.get(index).setUserName(userMapper.getNamebyUId(recipe.get(index).getUId()));
        }
        LinkedHashMap<String, Object> result = new LinkedHashMap<String, Object> () {{
            put("recipes", recipe);
        }};
        return ResponseEntity.ok(result);
    }

    @PostMapping("/user/subscribe")
    public ResponseEntity<?> subscribe(@RequestBody Subscribe subscribe) {
        Integer result = subscribeService.updateSubscribe(subscribe);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/admin/deleteUser/{uId}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer uId){
        return ResponseEntity.ok(userMapper.deleteUser(uId));
    }

    @PostMapping("/user/createNotebook/{uId}/{rId}")
    public ResponseEntity<?> createNotebook(@PathVariable Integer uId, @PathVariable Integer rId, @RequestBody Notebook notebook) {
        return ResponseEntity.ok(userMapper.createNotebook(uId, rId, notebook));
    }

    @PutMapping("/user/updateNotebook/{uId}/{rId}")
    public ResponseEntity<?> updateNotebook(@PathVariable Integer uId, @PathVariable Integer rId, @RequestBody Notebook notebook) {
        return ResponseEntity.ok(userMapper.updateNotebook(uId, rId, notebook));
    }

    @DeleteMapping("/user/deleteNotebook/{uId}/{rId}")
    public ResponseEntity<?> deleteNotebook(@PathVariable Integer uId, @PathVariable Integer rId) {
        return ResponseEntity.ok(userMapper.deleteNotebook(uId, rId));
    }
}
