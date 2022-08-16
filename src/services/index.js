import options from "./config.js";

const searchByText = async (searchText) => {
    try {
        const url =
            "https://shazam.p.rapidapi.com/search?term=" + searchText +"&locale=en-US";
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const Services = {
    searchByText,
};

export default Services;