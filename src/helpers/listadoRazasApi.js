import axios from "axios";
async function listadoRazasApi() {
    const url = "https://api.thedogapi.com/v1/breeds";
    const response = await axios.get(url);
    const todasRazas = response.data;
    return todasRazas;
}
export {listadoRazasApi};