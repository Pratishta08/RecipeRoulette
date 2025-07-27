import React from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import AllRecipes from './AllRecipes';


const Dashboard = ({ user, onSwitchToLogin, onSwitchToAddRecipe, onSearch, currentSearchQuery, refreshRecipes}) => {
    const navigate = useNavigate();

    const handleAddRecipeClick = () => {
        navigate('/addRecipe'); 
    };

    const handleLogoutClick = () => {
        onSwitchToLogin(); 
        navigate('/login', {replace: true}); 
    };
    return (
      <>
      <Navbar
        user={user}
        onSwitchToLogin={handleLogoutClick}
        Recipe={true}
        onSwitchToAddRecipe={handleAddRecipeClick} 
        onSearch={onSearch}
      />
      <AllRecipes searchQuery={currentSearchQuery} refreshRecipes={refreshRecipes} />
      
    </>
    );


};
        

            

export default Dashboard;