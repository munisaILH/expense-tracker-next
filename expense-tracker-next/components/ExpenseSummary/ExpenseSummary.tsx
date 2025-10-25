'use client'  // NEW! Add this FIRST (component has onClick)

// src/components/ExpenseSummary/ExpenseSummary.tsx
import React from 'react';
//import './ExpenseSummary.css';

/**
 * Displays summary statistics for expenses including total amount and count
 * @param {Object} props - Component props
 * @param {number} props.totalAmount - Sum of all expense amounts in dollars
 * @param {number} props.expenseCount - Total number of expense entries
 * @param {string} props.period - Time period being summarized (e.g., "This Month", "All Time")
 */
interface ExpenseSummaryProps {
  totalAmount: number;
  expenseCount: number;
  period?: string;
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ 
  totalAmount, 
  expenseCount, 
  period = "All Time" 
}) => {
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(totalAmount);

  return (
    <section className="bg-white
                        rounded-lg
                        p-6
                        mb-8
                        shadow-sm
                        border border-gray-200">
      <div className="flex 
                      justify-between 
                      items-center 
                      mb-5 
                      pb-4
                      border-b border-gray-200">
        <h2>Expense Summary</h2>
        <span className="bg-gray-100 
                        text-gray-500 
                        px-3 py-1.5
                        rounded-full
                        text-sm 
                        font-medium
                        ">{period}</span>
      </div>
      
      <div className="flex gap-8">
        <div className="flex flex-col items-center flex-1">
          <span className="text-sm font-medium text-gray-500 mb-2 text-center">Total Spent</span>
          <span className="text-3xl font-bold text-gray-900 text-center">{formattedTotal}</span>
        </div>
        
        <div className="flex flex-col items-center flex-1">
          <span className="text-sm font-medium text-gray-500 mb-2 text-center">Expenses</span>
          <span className="text-3xl font-bold text-gray-900 text-center">{expenseCount}</span>
        </div>
      </div>
    </section>
  );
};

export default ExpenseSummary;