import { obtImg } from "../helpers/obtImg";
import {reproduce} from "../helpers/reproduce";
import { Cargando } from "./Cargando";
import { obtRandomBreedImg } from "../helpers/obtRandomBreedImg";
import React, { useState, useRef, useEffect } from "react";

function Card({ razas, arrayBredFor, setNewError}) {
    const [indice, setIndice] = useState(0);
    const selectRazasRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [razasFiltradas, setRazasFiltradas] = useState(razas);
    const [imgCdn, setImgCdn] = useState("");
    useEffect(() => {
        const actualizaImg = async () => {
            try {
                setLoading(true);
                const response = await obtImg(indice, razasFiltradas);
                setImgCdn(response);
                setLoading(false);
            } catch (err) {
                setNewError("No se pudo cargar la imagen. Error: "+err.message);
                setLoading(false);
            }
        }
        actualizaImg();
        // eslint-disable-next-line
    }, [indice, razasFiltradas]);
    const otraImg = (e, razaId) => {
        const getUrl = async () => {
            try {
                setLoading(true);
                const response = await obtRandomBreedImg(razaId);
                setImgCdn(response);
                reproduce();
                setLoading(false);
            } catch (err) {
                setNewError("No se pudo obtener la imagen. Error: "+err.message);
                setLoading(false);
            }
        }
        getUrl();
    }
    const filtraRazas = (e) => {
        let filtro;
        if (e.target.value !== "") {
            filtro = razas.filter(raza => raza.bred_for === e.target.value);
        } else {
            filtro = razas;
            selectRazasRef.current.value = 0;
        }
        setRazasFiltradas(filtro);
        if (indice >= filtro.length) {
            setIndice(filtro.length - 1);
        }
    }
    const actualiza = (e) => {
        setIndice(e.target.selectedIndex);
        reproduce();
    }
    return (
        <>
            <figure className="my-3 w-75">
                <img className="img-fluid" src={imgCdn} alt={razasFiltradas[indice].name} />
                <figcaption onClick={(e) => otraImg(e, razasFiltradas[indice].id)}>Dog, <b>click here</b></figcaption>
            </figure>
            {loading && <Cargando />}
            <h2>Filter</h2>
            <h3>Bred for</h3>
            <select onChange={filtraRazas}>
                <option value="">Select</option>
                {arrayBredFor.map((grupo, index) => (
                    <option key={index} value={grupo}>{grupo}</option>
                ))};
            </select>
            <h2>Breeds</h2>
            <select ref={selectRazasRef} onChange={actualiza}>
                {razasFiltradas.map((raza) =>
                    <option key={raza.id} value={raza.name}>{raza.name}</option>
                )};
            </select>)
            <h2>Info</h2>
            <ul className="lead list-unstyled">
                <li>Weight: {razasFiltradas[indice].weight.metric} kg</li>
                <li>Height: {razasFiltradas[indice].height.metric} cm</li>
                <li>temperament: {razasFiltradas[indice].temperament}</li>
                <li>Bred for: {razasFiltradas[indice].bred_for}</li>
                <li>Breed group: {razasFiltradas[indice].breed_group}</li>
                <li>Life span: {razasFiltradas[indice].life_span}</li>
                <li>Origin: {razasFiltradas[indice].origin}</li>
            </ul>
        </>
    );
}
export { Card };