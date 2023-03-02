package com.project9900.recipe.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.project9900.recipe.entity.*;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper extends BaseMapper<User> {


    @Insert("INSERT INTO sys_user(username, password, email) VALUES (#{username},#{password},#{email})")
    int insert(User user);

    int update(User user);

    @Insert("INSERT into myrecipe(uId, name, imgUrl, ingredient, mealType, method) VALUES (#{uId}, #{recipe_create.name}, #{recipe_create.imgUrl}, #{recipe_create.ingredient}, #{recipe_create.mealType}, #{recipe_create.method})")
    Integer new_Recipe(Recipe_create recipe_create, Integer uId);

    @Select("SELECT * FROM myrecipe WHERE rId = #{rId}")
    Recipe getRecipeById(Integer rId);

    @Select("SELECT a.username, b.content FROM sys_user a, comment_of_recipe b WHERE a.id=b.uId AND b.rId=#{rId}")
    List<Comment> getComment(Integer rId);

    @Select("SELECT * FROM myrecipe WHERE uId = #{uId}")
    List<Recipe> getRecipeByUser(Integer uId);

    @Select("SELECT username FROM sys_user WHERE id = #{uId}")
    String getNamebyUId(Integer uId);

    @Select("SELECT email FROM sys_user WHERE id = #{uId}")
    String getEmailbyUId(Integer uId);

    @Select("SELECT contributorId FROM subscribe WHERE followerId = #{uId} and status = 1")
    List<Integer> getFollowIdByUser(Integer uId);

    @Insert("INSERT into comment_of_recipe(rId, uId, content) VALUES (#{comment_create.rId}, #{comment_create.uId}, #{comment_create.content})")
    Integer newComment(@Param("comment_create") Comment_create comment_create);

    @Select("SELECT username from sys_user where id = #{uId}")
    String getNameByUId(Integer uId);

    @Select("SELECT * FROM myrecipe WHERE name LIKE #{vague_aa}")
    List<Recipe> searchRecipeByRecipeTitle(String vague_aa);

    @Select("SELECT * FROM myrecipe WHERE uId IN (SELECT id FROM sys_user WHERE username LIKE #{vague_aa})")
    List<Recipe> searchRecipeByProviderName(String vague_aa);

    @Select("SELECT * FROM myrecipe WHERE ingredient LIKE #{vague_aa}")
    List<Recipe> searchRecipeByIngredient(String vague_aa);
    @Select("SELECT * FROM myrecipe WHERE method LIKE #{vague_aa}")
    List<Recipe> searchRecipeByMethod(String vague_aa);
    @Select("SELECT * FROM myrecipe WHERE ingredient LIKE #{vague_aa} or `name` LIKE #{vague_aa} or ingredient LIKE #{vague_aa} or uId IN (SELECT id FROM sys_user WHERE username LIKE #{vague_aa})")
    List<Recipe> searchRecipeByAll(String vague_aa);

    @Delete("DELETE FROM myrecipe WHERE rId = #{rId}")
    Integer deleteRecipe(Integer rId);

    int updateRecipe(String name, String imgUrl, String ingredient, String mealType, String method,  Integer rId);
    @Select("SELECT uId, rId, name, imgUrl, ingredient, mealType FROM myrecipe WHERE rId != #{rId} AND ingredient REGEXP #{ingredient}")
    List<Recipe_recommend> similarRecipe(String ingredient, Integer rId);

    @Select("SELECT * FROM myrecipe ORDER BY likeNUM DESC, createTime DESC")
    List<Recipe> whatshot();

    @Select("SELECT * FROM myrecipe WHERE uId IN (SELECT contributorId FROM subscribe WHERE followerId = #{uId} and status = 1) ORDER BY createTime DESC,likeNUM DESC")
    List<Recipe> newsFeed(Integer uId);

    @Delete("DELETE FROM sys_user WHERE id = #{uId}")
    Integer deleteUser(Integer uId);

    @Select("SELECT content FROM notebook WHERE rId = #{rId} AND uId = #{uId}")
    String getNotebook(Integer uId, Integer rId);
    @Insert("INSERT into notebook(rId, uId, content) VALUES (#{rId}, #{uId}, #{notebook.content})")
    Integer createNotebook(Integer uId, Integer rId, Notebook notebook);

    @Update("UPDATE notebook SET content = #{notebook.content} WHERE uId = #{uId} AND rId = #{rId}")
    Integer updateNotebook(Integer uId, Integer rId, Notebook notebook);

    @Delete("DELETE FROM notebook WHERE uId = #{uId} AND rId = #{rId}")
    Integer deleteNotebook(Integer uId, Integer rId);

    @Select("SELECT status FROM subscribe WHERE followerId = #{current_uId} and contributorId = #{uId} and status = 1")
    Integer getStatus(Integer current_uId, Integer uId);
}
