import axios from "axios";
const obtRandomBreedImg = async (raza_id) => {
    const url = `https://api.thedogapi.com/v1/images/search?breed_ids=${raza_id}`;
    try {
        const response = await axios.get(url);
        const imgUrl = response.data[0].url;
        return imgUrl;
    } catch (err) {
        console.log(err.message);
    }
}
export { obtRandomBreedImg };