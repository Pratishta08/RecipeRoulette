
  import React, { useState, useCallback, useEffect } from 'react';
import './index.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddRecipe from './components/AddRecipe';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import RecipeDetail from './components/RecipeDetail';

function App() {
  const [user, setUser] = useState(() => {
    try{
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }catch(error){
      console.log('Failed to get user from local storage:', error);
      return null;
    }
  });

  const [searchQuery, setSearchQuery] = useState(''); // NEW: State for search query
    const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() =>{
    const token = localStorage.getItem('token');
    if(token && !user){

    }
  }, [user])
  const handleLogin = (loggedInUser, token) => {
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user')
    localStorage.removeItem('token');
    setSearchQuery('')
    setRefreshTrigger(prev => prev+1)
  };
  const handleRecipeAdded = (newRecipe) => {
    console.log('New Recipe Added: ', newRecipe)
    setSearchQuery('');
    setRefreshTrigger(prev => prev+1)
  };
  const handleSearch = useCallback((query) => {
        setSearchQuery(query);
    }, []);
    
    const forceRefreshRecipes = useCallback(() => {
        setRefreshTrigger(prev => prev + 1);
    }, []);

    const PrivateRoute = ({ children }) => {
        return user ? children : <navigate to="/login" replace />;
    };

  return (
    <Router>
    <div className="min-h-screen bg-gradient-to-br from-purple-300 to-pink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleLogin} />} />
          <Route path="/dashboard" 
            element={
              <PrivateRoute>
              <Dashboard user={user} onSwitchToLogin={handleLogout}
              onSearch={handleSearch}
              currentSearchQuery={searchQuery} 
              refreshRecipes={refreshTrigger}
              />
              </PrivateRoute>
          }
            />
                <Route path="/addRecipe"
                element={
                  <PrivateRoute>
                  <AddRecipe
                    onAddRecipe={handleRecipeAdded}
                    onCancelAddRecipe={() => {}} // Navigation handled by Router
                  />
                  </PrivateRoute>
                }
            />

            <Route path="/recipes/:id" element={
              <PrivateRoute><RecipeDetail /></PrivateRoute>} />

            <Route path='/' element={<Dashboard
              user={user}
              onSwitchToLogin={handleLogout}
              onSwitchToAddRecipe={() => {}}
              onSearch={handleSearch}
              currentSearchQuery={searchQuery}
              refreshRecipes={refreshTrigger}/>
            }
            />
            <Route path='*' element={<Dashboard
              user={user}
              onSwitchToLogin={handleLogout}
              onSwitchToAddRecipe={() => {}}
              onSearch={handleSearch}
              currentSearchQuery={searchQuery}
              refreshRecipes={refreshTrigger}/>}
            />
            
          (
            <Route path='*' element={<Login onLogin={handleLogin}/>}/>
          )
        </Routes>
      </div>
      
    </div>
    </Router>
  );
}

export default App;

