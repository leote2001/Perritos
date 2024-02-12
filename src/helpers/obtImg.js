import axios from "axios";
async function obtImg (index, razas) {
const imgId = razas[index].reference_image_id; 
const url = `https://api.thedogapi.com/v1/images/${imgId}`;
const response = await axios.get(url);
const imgUrl = response.data.url; 
return imgUrl;
}
export {obtImg};