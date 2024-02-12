import ladridoPerro from "../ladridoPerro.mp3";
const reproduce = () => {
    const audio = new Audio(ladridoPerro);
    audio.play();
}
export {reproduce};