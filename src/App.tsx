import './App.css'
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter.tsx";
import ExpenseList from "./expense-tracker/components/ExpenseList.tsx";
import ExpenseForm from "./expense-tracker/components/ExpenseForm.tsx";
import {useState} from "react";

function App() {
    /* const categoryOptions = [
         {value: "", label: "Select a category"},
         {value: "Groceries", label: "Groceries"},
         {value: "Utilities", label: "Utilities"},
         {value: "Entertainment", label: "Entertainment"},
     ];

     interface Item {
         description: string;
         amount: number;
         category: string;
     }

     const [items, setItems] = useState<Item[]>([])
     const handleAddItem = (item: Item) => {
         setItems([...items, item]);
     };

     const handleDeleteItem = (index: number) => {
         setItems(prevItems => prevItems.filter((_, i) => i !== index));
     };
     return (
         <div>
             <ExpenseFormWithZod categoryOptions={categoryOptions} onSubmit={handleAddItem}></ExpenseFormWithZod>
             <AllExpenseList categoryOptions={categoryOptions} items={items}
                             onDeleteItem={handleDeleteItem}></AllExpenseList>
         </div>
     )

 }*/
    const [selectedCategory, setSelectedCategory] = useState("");
    const [expenses, setExpenses] = useState([
        {id: 1, description: "aaa", amount: 10, category: "Utilities"},
        {id: 2, description: "bbb", amount: 20, category: "Utilities"},
        {id: 3, description: "ccc", amount: 30, category: "Utilities"},
        {id: 4, description: "ddd", amount: 40, category: "Utilities"}
    ])
    const visibleExpenses = selectedCategory ?
        expenses.filter((e) => e.category === selectedCategory) :
        expenses;
    return (
        <div>
            <div className={"mb-5"}>
                <ExpenseForm onSubmit={newExpense => setExpenses([...expenses, {
                    ...newExpense,
                    id: expenses.length + 1
                }])}>

                </ExpenseForm>
            </div>
            <div className={"mb-3"}>
                <ExpenseFilter onSelectCategory={(category) => setSelectedCategory(category)}></ExpenseFilter>
            </div>
            <ExpenseList expenses={visibleExpenses} onDelete={(id) => setExpenses(expenses.filter(
                (e) => e.id != id))}></ExpenseList>
        </div>
    );
}

export default App;