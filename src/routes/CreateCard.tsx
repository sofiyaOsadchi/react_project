import { useForm } from "react-hook-form";

import { BsEye, BsEyeSlashFill } from "react-icons/bs";
import { useState } from "react";
import axios from 'axios'; // Assuming axios is used for HTTP requests
import dialogs from "../ui/dialogs";
import { useNavigate } from "react-router-dom";
import { CardData } from "../@types/CardData";
import patterns from "../validation/patterns";
import "./CreateCard.scss";

const CreateCard = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<CardData>({
        // Remove defaultValues if not necessary or update them according to CardData type
    });

    const onSubmit = (data: CardData) => {
        // Replace 'auth.register' with your API request to create a card
        axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards', data, {
            headers: { 'x-auth-token': 'YourAuthTokenHere' } // Ensure this is dynamically set as needed
        })
            .then((res) => {
                dialogs.success("Success", "Card Created Successfully").then(() => {
                    navigate("/my-cards"); // Navigate to the My Cards page or wherever appropriate
                });
            })
            .catch((e) => {
                dialogs.error("Error", e.response.data);
            });
    };

    return (
        <div className="create-card-container">
            <h2>Create New Card</h2>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                {/* All form fields updated for card creation */}

                <section>
                    <input placeholder="Title" {...register("title", { required: "Title is required" })} />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                </section>

                <section>
                    <input placeholder="Subtitle" {...register("subtitle", { required: "Subtitle is required" })} />
                    {errors.subtitle && <p className="text-red-500">{errors.subtitle.message}</p>}
                </section>

                <section>
                    <input placeholder="Description" {...register("description", { required: "Description is required" })} />
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
