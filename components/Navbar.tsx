"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode, setThemeColors } from '@/lib/features/darkMode/darkModeSlice';
import { RootState } from '@/lib/store';
import { fetchBrandMetadata } from '@/lib/api';


type BrandMetadata = {
  merchantLogo?: string;
  merchantName?: string;
  theme?: any; 
};



const Navbar: React.FC = () => {
  const [brandMetadata, setBrandMetadata] = useState<BrandMetadata | null>(null);
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const themeColors = useSelector((state: RootState) => state.darkMode.themeColors);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(themeColors);
    const fetchData = async () => {
      try {
        const data = await fetchBrandMetadata();
        setBrandMetadata(data);
        dispatch(setThemeColors(data.theme));
      } catch (error) {
        console.error('Failed to fetch brand metadata:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div>
      <nav className="flex justify-between items-center bg-gray-800 text-white p-4 shadow-lg">
        <div className="flex items-center gap-4">
          <img src={brandMetadata?.merchantLogo} alt={brandMetadata?.merchantName} className="h-10 rounded-full" />
          <span className="text-xl font-semibold">{brandMetadata?.merchantName}</span>
        </div>
        <div>
          <button
            onClick={handleToggleDarkMode}
            className="rounded-md px-4 py-2 bg-gray-700 hover:bg-gray-600"
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
