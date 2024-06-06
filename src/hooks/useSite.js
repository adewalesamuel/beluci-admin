import { useState } from 'react';
import { Services } from '../services';

export const useSite = () => {
    const [id, setId] = useState('');
	const [logo_url, setLogo_url] = useState('');
	const [favicon_url, setFavicon_url] = useState('');
	const [name, setName] = useState('');
	const [slogan, setSlogan] = useState('');
	const [phone_number, setPhone_number] = useState('');
	const [primary_color, setPrimary_color] = useState('');
	const [secondary_color, setSecondary_color] = useState('');
	const [copyright_text, setCopyright_text] = useState('');
	const [footer_logo_url, setFooter_logo_url] = useState('');
	const [is_up, setIs_up] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getSite = (siteId, signal) => {        
        return Services.SiteService.getById(siteId, signal)
        .then(response => {
            fillSite(response.site);
            setIsDisabled(false);

            return response;
        });
    }

    const createSite = signal => {
        const payload = {
            logo_url,
		favicon_url,
		name,
		slogan,
		phone_number,
		primary_color,
		secondary_color,
		copyright_text,
		footer_logo_url,
		is_up,
		
        };

        return Services.SiteService.create(
        JSON.stringify(payload), signal);
    }
    const updateSite = (siteId, signal) => {
        const payload = {
            logo_url,
		favicon_url,
		name,
		slogan,
		phone_number,
		primary_color,
		secondary_color,
		copyright_text,
		footer_logo_url,
		is_up,
		
        };

        return Services.SiteService.update(
        	siteId, JSON.stringify(payload), signal);
    }
    const deleteSite = (siteId, signal) => {
        return Services.SiteService.destroy(siteId, signal);
    }
    const fillSite = (site) => {
        setId(site.id);
        setLogo_url(site.logo_url ?? '');
		setFavicon_url(site.favicon_url ?? '');
		setName(site.name ?? '');
		setSlogan(site.slogan ?? '');
		setPhone_number(site.phone_number ?? '');
		setPrimary_color(site.primary_color ?? '');
		setSecondary_color(site.secondary_color ?? '');
		setCopyright_text(site.copyright_text ?? '');
		setFooter_logo_url(site.footer_logo_url ?? '');
		setIs_up(site.is_up ?? '');
		
    }
    const emptySite = () => {
        setId('');
        setLogo_url('');
		setFavicon_url('');
		setName('');
		setSlogan('');
		setPhone_number('');
		setPrimary_color('');
		setSecondary_color('');
		setCopyright_text('');
		setFooter_logo_url('');
		setIs_up('');
		
    }

    return {
        id,
        logo_url,
		favicon_url,
		name,
		slogan,
		phone_number,
		primary_color,
		secondary_color,
		copyright_text,
		footer_logo_url,
		is_up,
		
        errors,
        isDisabled,
        setLogo_url,
		setFavicon_url,
		setName,
		setSlogan,
		setPhone_number,
		setPrimary_color,
		setSecondary_color,
		setCopyright_text,
		setFooter_logo_url,
		setIs_up,
		
        setId,
        setErrors,
        setIsDisabled,
        getSite,
        createSite,
        updateSite,
        deleteSite,
        fillSite,
        emptySite
    };
}