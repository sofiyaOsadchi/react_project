import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CardType } from '../@types/types';
import { useContext, useEffect } from 'react';
import { AuthContext, useAuth } from '../contexts/AuthContext';
import './CreateCard.scss';
import dialogs from '../ui/dialogs';
import patterns from "../validation/patterns";

const mapToAllowedFields = (card: CardType)=> ({
    title: card.title,
    subtitle: card.subtitle,
    description: card.description,
    phone: card.phone,
    email: card.email,
    web: card.web,
    image: {
        url: card.image.url,
        alt: card.image.alt
    },
    address: {
        state: card.address.state,
        country: card.address.country,
        city: card.address.city,
        street: card.address.street,
        houseNumber: card.address.houseNumber,
        zip: card.address.zip
    }
});


const UpdateCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const url = `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CardType>();

    useEffect(() => {
        axios.get(url, {
            headers: { 'x-auth-token': token }
        }).then(res => {
            const data = res.data;
            // Populate form with existing card data
            for (const key in data) {
                setValue(key as keyof CardType, data[key]);
            }
        }).catch(err => {
            console.error('Error fetching card:', err);
        });
    }, [id, token, setValue]);

  
    const onUpdateCard = (card: CardType) => {
        const sanitizedCard = mapToAllowedFields(card);

        axios.put(url, sanitizedCard, {
            headers: { 'x-auth-token': token }
        })
            .then(() => {
                dialogs.success("Success", "Card was updated").then(() => {
                navigate('/my-cards');
            })})
            .catch(err => {
                console.error('Error updating card:', err);
                if (err.response) {
                    console.error('API Error Response:', err.response.data); 
                    dialogs.error("Update Failed", `Failed to update card: ${err.response.data.message || err.message}`)
                }
            });
    };



    return (
        <div className="create-card-container bg-purple-900  text-white dark:bg-slate-600">
        <form  noValidate onSubmit={handleSubmit(onUpdateCard)}>
            {/* Title */}
                <section>
                    <input placeholder="Title" {...register("title", {
                        required: "Title is required"
                        ,
                        minLength: { value: 2, message: "Too short" },
                        maxLength: { value: 255, message: "Too long" },
                    })} />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                </section>

                <section>
                    <input placeholder="Subtitle" {...register("subtitle", {
                        required: "Subtitle is required",
                        minLength: { value: 2, message: "Too short" },
                        maxLength: { value: 255, message: "Too long" },
                    })} />
                    {errors.subtitle && <p className="text-red-500">{errors.subtitle.message}</p>}
                </section>

                <section>
                    <input placeholder="Description" {...register("description", {
                        required: "Description is required",
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

            <button type="submit" className="submit-button">Update Card</button>
        </form>
        </div>
    );
};

export default UpdateCard;
