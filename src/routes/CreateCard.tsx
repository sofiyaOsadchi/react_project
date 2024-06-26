import { useForm } from "react-hook-form";
import axios from 'axios'; // Assuming axios is used for HTTP requests
import dialogs from "../ui/dialogs";
import { useNavigate } from "react-router-dom";
import { CardData } from "../@types/CardData";
import patterns from "../validation/patterns";
import "./CreateCard.scss";
import { useAuth } from "../contexts/AuthContext";

const CreateCard = () => {
    const { token } = useAuth(); // Get the token from the context
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<CardData>();

    const onSubmit = async (data: CardData) => {
        if (!token) {
            dialogs.error("Error", "No authentication token found.");
            return;
        }

        try {
            await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards', data, {
                headers: { 'x-auth-token': token }
            });
            dialogs.success("Success", "Card Created Successfully").then(() => {
                navigate("/my-cards");
            });
        } catch (error) {
            dialogs.error("Error", error.response.data);
        }
    };


    return (
        <div className="create-card-container bg-purple-900  text-white dark:bg-slate-600">
            <h2>Create New Card</h2>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <section>
                    <input placeholder="Title" {...register("title", { required: "Title is required"
                        ,
                        minLength: { value: 2, message: "Too short" },
                        maxLength: { value: 255, message: "Too long" },
                     })} />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                </section>

                <section>
                    <input placeholder="Subtitle" {...register("subtitle", { required: "Subtitle is required",
                        minLength: { value: 2, message: "Too short" },
                        maxLength: { value: 255, message: "Too long" },
                     })} />
                    {errors.subtitle && <p className="text-red-500">{errors.subtitle.message}</p>}
                </section>

                <section>
                    <input placeholder="Description" {...register("description", { required: "Description is required",
                        minLength: { value: 2, message: "Too short" },
                        maxLength: { value: 1024, message: "Too long" },
                     })} />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </section>
                
               
                {/* phone */}
                <section>
                    <input
                        placeholder="Phone"
                        type="tel"
                        {...register("phone", {
                            required: "This field is mandatory",
                            minLength: { value: 9, message: "Too short" },
                            maxLength: { value: 14, message: "Too long" },
                        })}
                    />
                    {errors.phone && (
                        <p className="text-red-500">{errors.phone?.message}</p>
                    )}
                </section>

                {/* email */}
                <section>
                    <input
                        placeholder="Email"
                        type="email"
                        {...register("email", {
                            required: "This field is mandatory",
                            pattern: {
                                value: patterns.email,
                                message: "Invalid email",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email?.message}</p>
                    )}
                </section>


                <section>
                    <input
                        placeholder="Website URL"
                        type="url"
                        {...register("web", {
                            pattern: {
                                value: patterns.url,
                                message: "Invalid URL format"
                            }
                        })}
                    />
                    {errors.web && <p className="text-red-500">{errors.web.message}</p>}
                </section>

                {/* image.url */}
                <section>
                    <input
                        placeholder="Image URL"
                        type="url"
                        {...register("image.url", {
                            required: "This field is mandatory",
                            pattern: {
                                value: patterns.url,
                                message: "Invalid image URL",
                            },
                        })}
                    />
                    {errors.image?.url && (
                        <p className="text-red-500">{errors.image?.url?.message}</p>
                    )}
                </section>

                {/* image.alt */}
                <section>
                    <input
                        placeholder="Image Description"
                        type="text"
                        {...register("image.alt", {
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.image?.alt && (
                        <p className="text-red-500">{errors.image?.alt?.message}</p>
                    )}
                </section>

                {/* address.state */}
                <section>
                    <input
                        placeholder="State"
                        type="text"
                        {...register("address.state", {
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.address?.state && (
                        <p className="text-red-500">{errors.address?.state?.message}</p>
                    )}
                </section>

                {/* address.country */}
                <section>
                    <input
                        placeholder="Country"
                        type="text"
                        {...register("address.country", {
                            required: "This field is mandatory",
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.address?.country && (
                        <p className="text-red-500">{errors.address?.country?.message}</p>
                    )}
                </section>

                {/* address.city */}
                <section>
                    <input
                        placeholder="City"
                        type="text"
                        {...register("address.city", {
                            required: "This field is mandatory",
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.address?.city && (
                        <p className="text-red-500">{errors.address?.city?.message}</p>
                    )}
                </section>

                {/* address.street */}
                <section>
                    <input
                        placeholder="Street"
                        type="text"
                        {...register("address.street", {
                            required: "This field is mandatory",
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.address?.street && (
                        <p className="text-red-500">{errors.address?.street?.message}</p>
                    )}
                </section>

                {/* address.houseNumber */}
                <section>
                    <input
                        placeholder="House Number"
                        type="number"
                        {...register("address.houseNumber", {
                            required: "This field is mandatory",
                            min: { value: 2, message: "Too small" },
                            max: { value: 256, message: "Too big" },
                        })}
                    />
                    {errors.address?.houseNumber && (
                        <p className="text-red-500">
                            {errors.address?.houseNumber?.message}
                        </p>
                    )}
                </section>

                {/* address.zip */}
                <section>
                    <input
                        placeholder="Zip"
                        type="number"
                        {...register("address.zip", {
                            required: "This field is mandatory",
                            min: { value: 2, message: "Too small" },
                            max: { value: 256, message: "Too big" },
                        })}
                    />
                    {errors.address?.zip && (
                        <p className="text-red-500">{errors.address?.zip?.message}</p>
                    )}
                </section>


                <button type="submit">Create Card</button>
            </form>
        </div>
    );
};

export default CreateCard;
