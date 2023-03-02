package com.project9900.recipe.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.project9900.recipe.entity.Recipe;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;
@Mapper
public interface RecipeMapper extends BaseMapper<Recipe> {
    @Update("UPDATE myrecipe SET likeNum=likeNum+1 where rId=#{rId}")
    Boolean addLike(Integer rId);
    @Update("UPDATE myrecipe SET likeNum=likeNum-1 where rId=#{rId}")
    Boolean deleteLike(Integer rId);
}
