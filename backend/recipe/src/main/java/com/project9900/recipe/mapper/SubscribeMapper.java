package com.project9900.recipe.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.project9900.recipe.entity.Subscribe;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface SubscribeMapper extends BaseMapper<Subscribe> {

    @Insert("INSERT INTO subscribe(followerId, contributorId, status) VALUES (#{followerId},#{contributorId}, #{status})")
    Integer createNewSubscribe(Subscribe subscribe);

    @Update("UPDATE subscribe SET status = #{status} WHERE followerId = #{followerId} AND contributorId = #{contributorId}")
    Integer setOldSubscribe(Subscribe subscribe);
}