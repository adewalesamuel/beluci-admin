import { useState } from 'react';
import { Services } from '../services';

export const useAdmin = () => {
    const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role_id, setRole_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getAdmin = (adminId, signal) => {        
        return Services.AdminService.getById(adminId, signal)
        .then(response => {
            fillAdmin(response.admin);
            setIsDisabled(false);

            return response;
        });
    }

    const createAdmin = signal => {
        const payload = {
            name,
		email,
		password,
		role_id,
		
        };

        return Services.AdminService.create(
        JSON.stringify(payload), signal);
    }
    const updateAdmin = (adminId, signal) => {
        const payload = {
            name,
		email,
		password,
		role_id,
		
        };

        return Services.AdminService.update(
        	adminId, JSON.stringify(payload), signal);
    }
    const deleteAdmin = (adminId, signal) => {
        return Services.AdminService.destroy(adminId, signal);
    }
    const fillAdmin = (admin) => {
        setId(admin.id);
        setName(admin.name ?? '');
		setEmail(admin.email ?? '');
		setPassword(admin.password ?? '');
		setRole_id(admin.role_id ?? '');
		
    }
    const emptyAdmin = () => {
        setId('');
        setName('');
		setEmail('');
		setPassword('');
		setRole_id('');
		
    }

    return {
        id,
        name,
		email,
		password,
		role_id,
		
        errors,
        isDisabled,
        setName,
		setEmail,
		setPassword,
		setRole_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getAdmin,
        createAdmin,
        updateAdmin,
        deleteAdmin,
        fillAdmin,
        emptyAdmin
    };
}