import React, {useState} from "react";

const Navbar = ({ user, onSwitchToLogin, Recipe, onSwitchToAddRecipe, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchClick = () => {
        if (onSearch) {
            onSearch(searchQuery); // Pass the current search query to the parent
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    };

    return(
  <nav className="bg-gray-800 w-full">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="flex h-10 items-center justify-between w-full">
        <div className="flex items-center">
          {/* <img className="h-6 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Logo" /> */}
          <span className="text-white ml-2 font-semibold text-sm">Recipe Roulette</span>
        </div>
        <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Search recipe..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="px-15 py-1 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                            type="button"
                            onClick={handleSearchClick}
                            className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Search
                        </button>
                    </div>
        <div className="flex flex-row items-center space-x-2">
        {Recipe && (
            <button 
            type="button"
            onClick={onSwitchToAddRecipe} 
            className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-xs">Add Recipe</button>
          )}
          <a href="#" className="rounded-md px-2 py-1 text-xs font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Profile</a>
          {user && (
            <span className="text-gray-200 text-xs ml-2">Hi, {user.username || user.name}</span>
          )}
          {user && (
            <button 
            type="button"
            onClick={onSwitchToLogin} 
            className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-xs">Logout</button>
          )}
        </div>
      </div>
    </div>
  </nav>
);
};

export default Navbar;
