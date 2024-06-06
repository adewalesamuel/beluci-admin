import { useState } from 'react';
import { Services } from '../services';

export const useEvent = () => {
    const [id, setId] = useState('');
	const [img_url, setImg_url] = useState('');
	const [name, setName] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [address, setAddress] = useState('');
	const [gps_location, setGps_location] = useState('');
	const [is_payed, setIs_payed] = useState('');
	const [price, setPrice] = useState('');
	const [features, setFeatures] = useState('');
	const [description, setDescription] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getEvent = (eventId, signal) => {        
        return Services.EventService.getById(eventId, signal)
        .then(response => {
            fillEvent(response.event);
            setIsDisabled(false);

            return response;
        });
    }

    const createEvent = signal => {
        const payload = {
            img_url,
		name,
		date,
		time,
		address,
		gps_location,
		is_payed,
		price,
		features,
		description,
		
        };

        return Services.EventService.create(
        JSON.stringify(payload), signal);
    }
    const updateEvent = (eventId, signal) => {
        const payload = {
            img_url,
		name,
		date,
		time,
		address,
		gps_location,
		is_payed,
		price,
		features,
		description,
		
        };

        return Services.EventService.update(
        	eventId, JSON.stringify(payload), signal);
    }
    const deleteEvent = (eventId, signal) => {
        return Services.EventService.destroy(eventId, signal);
    }
    const fillEvent = (event) => {
        setId(event.id);
        setImg_url(event.img_url ?? '');
		setName(event.name ?? '');
		setDate(event.date ?? '');
		setTime(event.time ?? '');
		setAddress(event.address ?? '');
		setGps_location(event.gps_location ?? '');
		setIs_payed(event.is_payed ?? '');
		setPrice(event.price ?? '');
		setFeatures(event.features ?? '');
		setDescription(event.description ?? '');
		
    }
    const emptyEvent = () => {
        setId('');
        setImg_url('');
		setName('');
		setDate('');
		setTime('');
		setAddress('');
		setGps_location('');
		setIs_payed('');
		setPrice('');
		setFeatures('');
		setDescription('');
		
    }

    return {
        id,
        img_url,
		name,
		date,
		time,
		address,
		gps_location,
		is_payed,
		price,
		features,
		description,
		
        errors,
        isDisabled,
        setImg_url,
		setName,
		setDate,
		setTime,
		setAddress,
		setGps_location,
		setIs_payed,
		setPrice,
		setFeatures,
		setDescription,
		
        setId,
        setErrors,
        setIsDisabled,
        getEvent,
        createEvent,
        updateEvent,
        deleteEvent,
        fillEvent,
        emptyEvent
    };
}