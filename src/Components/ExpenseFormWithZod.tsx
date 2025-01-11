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

interface Props {
    categoryOptions: CategoryOption[];
    onSubmit: (data: FormData) => void;
}

const ExpenseFormWithZod = ({categoryOptions, onSubmit}: Props) => {
    const {register, handleSubmit, reset, formState: {errors, isValid}} = useForm<FormData>({
        resolver: zodResolver(schema), mode: "onChange",
    });
    const submitHandler = (data: FormData) => {
        onSubmit(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className={"mb-3"}>
                <label htmlFor={"description"} className={"form-label"}>Description</label>
                <input {...register('description')} id="description" type={"text"} className={"form-control"}></input>
                {errors.description && <p className="text-danger">{errors.description.message}</p>}
            </div>
            <div className={"mb-3"}>
                <label htmlFor={"amount"} className={"form-label"}>Amount</label>
                <input {...register('amount', {valueAsNumber: true})} id="amount" type={"number"}
                       className={"form-control"} min={0}></input>
                {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
            </div>
            <div className={"mb-3"}>
                <label htmlFor={"category"} className={"form-label"}>Category</label>
                <select {...register('category')} id="category"
                        className={"form-control dropdown"}>{categoryOptions.map((option) => (
                    <option className={"dropdown-item"} key={option.value}
                            value={option.value}>{option.label}</option>))})
                </select>
                {errors.category && <p className="text-danger">{errors.category.message}</p>}
            </div>
            <button disabled={!isValid} type={"submit"} className={"btn btn-primary"}>Submit</button>
        </form>
    );

}
export default ExpenseFormWithZod;