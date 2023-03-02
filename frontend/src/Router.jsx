import React from 'react';
import {
    Routes,
    Route,
} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Publish from './pages/Publish';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ProfileModificaton from './pages/ProfileModification';
import ProfileFollower from './pages/ProfileFollower';
import RecipeDetail from './pages/RecipeDetail';
import RecipeEdit from './pages/RecipeEdit';
import SearchPage from './pages/SearchPage';
import WhatsHot from './pages/WhatsHot';
import NewsFeed from './pages/NewsFeed';
import RandomRecipe from './pages/RandomRecipe';


const Router = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/publish" element={<Publish />} />
            <Route path='/profile/:uid' element={<Profile/>}/>
            <Route path='/profile/modification' element={<ProfileModificaton/>}/>
            <Route path='/profile/follower/:uid' element={<ProfileFollower/>}/>
            <Route path= '/recipes/:id' element={<RecipeDetail/>}/>
            <Route path='/recipeEdit/:rid' element={<RecipeEdit />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/whatshot' element={<WhatsHot />} />
            <Route path='/newsfeed' element={<NewsFeed/>}/>
            <Route path='/randomRecipe/:type' element={<RandomRecipe />}/>
        </Routes>
    );
}

export default Router;
