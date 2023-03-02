package com.project9900.recipe.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.project9900.recipe.entity.Like;
import com.project9900.recipe.exception.ServiceException;
import com.project9900.recipe.mapper.LikeMapper;
import com.project9900.recipe.mapper.RecipeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeService extends ServiceImpl<LikeMapper, Like>{
    @Autowired
    private RecipeMapper recipeMapper;

    @Autowired
    private LikeMapper likeMapper;
    public boolean setLike(Like like) {
        QueryWrapper<Like> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("uId",like.getUId());
        queryWrapper.eq("rId",like.getRId());
        Like one;
        try{
            one = getOne(queryWrapper);
        } catch (Exception e){
            throw new ServiceException("like sys error");
        }
        if(one == null){
            try{
                if(like.getLikeStatus()==1){
                    save(like);
                    return recipeMapper.addLike(like.getRId());
                }else{
                    throw new ServiceException("like save sys error1");
                }
            }catch (Exception e){
                throw new ServiceException("like save sys error2");
            }
        }else{
            try{
                update(like, queryWrapper);
                if(one.getLikeStatus()==0 && like.getLikeStatus()==1){
                    return recipeMapper.addLike(like.getRId());
                } else if (one.getLikeStatus()==1 && like.getLikeStatus()==0) {
                    return recipeMapper.deleteLike(like.getRId());
                }else{
                    return false;
                }

            }catch (Exception e){
                throw new ServiceException("like update sys error");
            }
        }
    }
    public Integer getStatus(Integer uId, Integer rId) {
        try{
            Integer status = likeMapper.getStatus(uId, rId);
            if(status != null){
                return status;
            }else{
                return 0;
            }
        }catch (Exception e){
            throw new ServiceException("status error");
        }
    }
}
