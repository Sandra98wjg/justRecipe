package com.project9900.recipe.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.project9900.recipe.entity.Subscribe;
import com.project9900.recipe.exception.ServiceException;
import com.project9900.recipe.mapper.SubscribeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubscribeService extends ServiceImpl<SubscribeMapper, Subscribe> {
    @Autowired
    private SubscribeMapper subscribeMapper;

    public Integer updateSubscribe(Subscribe subscribe) {
        QueryWrapper<Subscribe> queryWrapper =  new QueryWrapper<>();
        queryWrapper.eq("followerId",subscribe.getFollowerId());
        queryWrapper.eq("contributorId",subscribe.getContributorId());
        Subscribe new_one;
        try {
            new_one = getOne(queryWrapper);
        } catch (Exception e){
            throw new ServiceException("sys error");
        }
        if (new_one == null) {
            return subscribeMapper.createNewSubscribe(subscribe);
        } else {
            return subscribeMapper.setOldSubscribe(subscribe);
        }
    }
}
