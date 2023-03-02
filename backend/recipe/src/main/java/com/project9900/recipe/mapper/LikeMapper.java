package com.project9900.recipe.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.project9900.recipe.entity.Like;
import org.apache.ibatis.annotations.Select;
import org.mapstruct.Mapper;

@Mapper
public interface LikeMapper extends BaseMapper<Like> {

    @Select("SELECT likeStatus FROM like_of_recipe WHERE uId=#{uId} AND rId=#{rId}")
    Integer getStatus(Integer uId, Integer rId);

}
