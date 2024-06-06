import { useState } from 'react';
import { Services } from '../services';

export const usePost = () => {
    const [id, setId] = useState('');
	const [display_url, setDisplay_url] = useState('');
	const [title, setTitle] = useState('');
	const [slug, setSlug] = useState('');
	const [content, setContent] = useState('');
	const [excerpt, setExcerpt] = useState('');
	const [author, setAuthor] = useState('');
	const [category_id, setCategory_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getPost = (postId, signal) => {        
        return Services.PostService.getById(postId, signal)
        .then(response => {
            fillPost(response.post);
            setIsDisabled(false);

            return response;
        });
    }

    const createPost = signal => {
        const payload = {
            display_url,
		title,
		slug,
		content,
		excerpt,
		author,
		category_id,
		
        };

        return Services.PostService.create(
        JSON.stringify(payload), signal);
    }
    const updatePost = (postId, signal) => {
        const payload = {
            display_url,
		title,
		slug,
		content,
		excerpt,
		author,
		category_id,
		
        };

        return Services.PostService.update(
        	postId, JSON.stringify(payload), signal);
    }
    const deletePost = (postId, signal) => {
        return Services.PostService.destroy(postId, signal);
    }
    const fillPost = (post) => {
        setId(post.id);
        setDisplay_url(post.display_url ?? '');
		setTitle(post.title ?? '');
		setSlug(post.slug ?? '');
		setContent(post.content ?? '');
		setExcerpt(post.excerpt ?? '');
		setAuthor(post.author ?? '');
		setCategory_id(post.category_id ?? '');
		
    }
    const emptyPost = () => {
        setId('');
        setDisplay_url('');
		setTitle('');
		setSlug('');
		setContent('');
		setExcerpt('');
		setAuthor('');
		setCategory_id('');
		
    }

    return {
        id,
        display_url,
		title,
		slug,
		content,
		excerpt,
		author,
		category_id,
		
        errors,
        isDisabled,
        setDisplay_url,
		setTitle,
		setSlug,
		setContent,
		setExcerpt,
		setAuthor,
		setCategory_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getPost,
        createPost,
        updatePost,
        deletePost,
        fillPost,
        emptyPost
    };
}