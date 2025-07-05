import { useState, useEffect } from 'react';
import { PortfolioData } from '../types/portfolio';
import { defaultPortfolioData } from '../data/portfolioData';

const STORAGE_KEY = 'portfolio-data';

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setData(parsedData);
      } catch (error) {
        console.error('Failed to parse saved data:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const updateData = (newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  return { data, updateData, isLoading };
};