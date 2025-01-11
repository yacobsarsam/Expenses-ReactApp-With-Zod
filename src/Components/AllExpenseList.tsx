import {useForm} from "react-hook-form";
import {number, string, z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";

const schema = z.object({
    description: string().min(3, 'This must be at least 3 characters'),
    amount: number({invalid_type_error: 'This field is required'}).positive("Amount must be a positive number"),
    category: string().min(1, "Please select a category")
});
type FormData = z.infer<typeof schema>

interface CategoryOption {
    value: string;
    label: string;
}

interface Item {
    description: string;
    amount: number;
    category: string;
}

interface Props {
    categoryOptions: CategoryOption[];
    items: Item[];
    onDeleteItem: (index: number) => void;

}

const AllExpenseList = ({categoryOptions, items, onDeleteItem}: Props) => {


    const {register, watch} = useForm<FormData>({
        resolver: zodResolver(schema), mode: "onChange",
    });
    //const onDelete = (index: number) => void;
    const selectedCategory = watch("category", "");

    const displayedItems = selectedCategory
        ? items.filter((item) => item.category === selectedCategory)
        : items;
    const totalAmount = displayedItems.reduce((sum, item) => sum + item.amount, 0).toFixed(2);

    return (
        <form>
            <div className={"mb-3"}>
                <label htmlFor={"category"} className={"form-label"}>Category</label>
                <select {...register('category')} id="category"
                        className={"form-control dropdown"}>
                    <option className={"dropdown-item"} value="">
                        All Categories
                    </option>
                    {categoryOptions.slice(1).map((option) => (
                        <option className={"dropdown-item"} key={option.value}
                                value={option.value}>{option.label}
                        </option>))}
                </select>

            </div>
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayedItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.description}</td>
                            <td>${item.amount.toFixed(2)}</td>
                            <td>{item.category}</td>
                            <td>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    onDeleteItem(index);
                                }} className="btn btn-danger">Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td>Total</td>
                        <td>${totalAmount}</td>
                        <td>{}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </form>
    );

}
export default AllExpenseList;
