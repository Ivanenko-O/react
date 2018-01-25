export const createPost = async (comment, { api, token }) => {
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                comment
            })
        });
        if (response.status !== 200) {
            throw new Error( 'Failed to create new post ');
        }
        const { data } = await response.json();
        return data;
};

export const deletePost = async (id, { api, token }) => {
    const response = await fetch(`${api}/${id}`, {
        method: 'DELETE',
            headers: {
            'Authorization': token
        }
    });
    if (response.status !== 204) {
        throw new Error('post delete failed');
    }
};
