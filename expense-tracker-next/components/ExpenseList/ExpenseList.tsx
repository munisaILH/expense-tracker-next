'use client'  // NEW! Add this FIRST (component has onClick)

// src/components/ExpenseList/ExpenseList.tsx
import React, { useState } from 'react';
import ExpenseCard from '../ExpenseCard/ExpenseCard';
import type { ExpenseCardProps } from '../ExpenseCard/ExpenseCard';
//import './ExpenseList.css';
// Type for expense data (reusing interface from ExpenseCard)
type Expense = ExpenseCardProps;

type SortOption = 'date' | 'amount' | 'category';
type FilterOption = 'All' | ExpenseCategory;
type ExpenseCategory = 'Food' | 'Transportation' | 'Entertainment' | 'Other';

/**
 * Props interface for ExpenseList component
 * FIXED: expenses is now required (not optional initialExpenses)
 * @interface ExpenseListProps
 * @property {Expense[]} expenses - Current expense data from parent component (App.tsx)
 */
interface ExpenseListProps {
  expenses: Expense[];  // FIXED: Required prop, receives current state from App
  onDeleteExpense?: (id: number) => void; // Optional delete handler
}


/**
 * ExpenseList Component - FIXED VERSION
 * 
 * IMPORTANT CHANGE: This component no longer manages expense data in local state.
 * It receives expenses as props from App.tsx and only manages UI state (filtering).
 * 
 * This fixes the "duplicate state" bug where:
 * - App.tsx had expense state (updated by form)
 * - ExpenseList had separate expense state (never updated)
 * 
 * Now there's a SINGLE SOURCE OF TRUTH in App.tsx
 * 
 * @param {ExpenseListProps} props - Component props
 * @returns {JSX.Element} Rendered expense list with filtering controls
 */
const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense }) => {
  
// To this:                     //supposed to be <FilterOption>, not <string> but doesn't work:()
const [filterCategory, setFilterCategory] = useState<FilterOption>('All');
//Update (9/17): Does <FilterOption> work now??? I cannot tell on my ipad right now but I don't see an error so

  // Filter expenses from props (not local state)
  const filteredExpenses = filterCategory === 'All' 
    ? expenses  // Use expenses from props
    : expenses.filter(expense => expense.category === filterCategory);

  // Calculate total for the currently filtered expenses
  const filteredTotal = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  /**
   * Handles category filter change from select dropdown
   * @param {React.ChangeEvent<HTMLSelectElement>} event - Select change event
   */
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(event.target.value as FilterOption);
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border border-gray-200">
      <div className="expense-controls">
        <h2>Your Expenses</h2>
        
        <div className="filter-controls">
          <label htmlFor="category-filter">Filter by category:</label>
          <select 
            id="category-filter"
            value={filterCategory}
            onChange={handleCategoryChange}
            className="category-select"
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p>
          Total: ${filteredTotal.toFixed(2)} ({filteredExpenses.length} expenses)
        </p>
      </div>

      <div className="expense-items">
        {filteredExpenses.length === 0 ? (
          <p className="no-expenses">
            No expenses found. Add some expenses to get started!
          </p>
        ) : (
          filteredExpenses.map(expense => (
            <ExpenseCard
              key={expense.id}
              {...expense}
              onDelete={onDeleteExpense}  // Pass down delete
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;