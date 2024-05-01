import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { CardType } from "../@types/types";
const UpdateCard = () => {
    const { id } = useParams();
    const url = `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`;
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CardType>({
        defaultValues: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        },
    });
    const onUpdateCard = (card: CardType) => {
        console.log(card);
    };
    return (
        <form noValidate onSubmit={handleSubmit(onUpdateCard)}>
            <section>
                <input
                    placeholder="Email"
                    type="text"
                    {...register("email", {
                        required: "This field is mandatory",
                        minLength: { value: 2, message: "Too short" },
                        maxLength: { value: 255, message: "Too long" },
                    })}
                />
                {errors.email && (
                    <p className="text-red-500">{errors.email?.message}</p>
                )}
            </section>
        </form>
    );
};
export default UpdateCard;