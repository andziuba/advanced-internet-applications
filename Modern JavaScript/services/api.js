export const fetchElixirs = async () => {
    try {
        const response = await fetch('https://wizard-world-api.herokuapp.com/Elixirs');
        if (!response.ok) {
            throw new Error('HTTP error! Status: ${response.status}')
        }
        return await response.json();
    } catch (error) {
        console.error('Fetching data failed:', error);
        throw error;
    }
};