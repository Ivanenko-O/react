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
        })
            .then((response) => response.json())
            .then(({ data}) => {
                this.setState(({ posts} ) => ({
                    posts: [data, ...posts],
                }))
            })

        if (response.status !== 200) {
            throw new Error( 'Failed to create new post ');
        }

        const { data } = await response.json();

        return data;
};
