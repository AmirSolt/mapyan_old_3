



export const load = async ({params}) => {
    const {key} = params;

    return{
        searchTerm: key,
    }
};