import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CardType } from '../@types/types';
import { useContext, useEffect } from 'react';
import { AuthContext, useAuth } from '../contexts/AuthContext';
import './CreateCard.scss';
import dialogs from '../ui/dialogs';

const mapToAllowedFields = (card: CardType): SanitizedCardType => ({
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
                <input
                    className="create-card-input"
                    placeholder="Title"
                    {...register('title', { required: 'This field is mandatory' })}
                />
                {errors.title && <p className="error-text">{errors.title.message}</p>}
            </section>

            {/* Subtitle */}
            <section>
                <input
                    className="create-card-input"
                    placeholder="Subtitle"
                    {...register('subtitle')}
                />
            </section>

            {/* Description */}
            <section>
                <textarea
                    className="create-card-input"
                    placeholder="Description"
                    {...register('description')}
                />
            </section>

            {/* Phone */}
            <section>
                <input
                    className="create-card-input"
                    placeholder="Phone"
                    {...register('phone')}
                />
            </section>

            {/* Email */}
            <section>
                <input
                    className="create-card-input"
                    placeholder="Email"
                    {...register('email')}
                />
            </section>

            {/* Web */}
            <section>
                <input
                    className="create-card-input"
                    placeholder="Web"
                    {...register('web')}
                />
            </section>

            {/* Image URL */}
            <section>
                <input
                    className="create-card-input"
                    placeholder="Image URL"
                    {...register('image.url')}
                />
            </section>

            {/* Image Alt */}
            <section>
                <input
                    className="create-card-input"
                    placeholder="Image Alt"
                    {...register('image.alt')}
                />
            </section>

            {/* Address */}
            <section>
                <input
                    className="create-card-input"
                    placeholder="State"
                    {...register('address.state')}
                />
                <input
                    className="create-card-input"
                    placeholder="Country"
                    {...register('address.country')}
                />
                <input
                    className="create-card-input"
                    placeholder="City"
                    {...register('address.city')}
                />
                <input
                    className="create-card-input"
                    placeholder="Street"
                    {...register('address.street')}
                />
                <input
                    className="create-card-input"
                    placeholder="House Number"
                    {...register('address.houseNumber')}
                />
                <input
                    className="create-card-input"
                    placeholder="Zip"
                    {...register('address.zip')}
                />
            </section>

            <button type="submit" className="submit-button">Update Card</button>
        </form>
        </div>
    );
};

export default UpdateCard;
