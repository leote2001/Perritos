const bredFor = (razas) => {
    const arrayBredFor = [];
    razas.forEach(raza => {
        // eslint-disable-next-line
        if (!arrayBredFor.includes(raza.bred_for) && raza.bred_for != "" || raza.bred_for != undefined) {
            arrayBredFor.push(raza.bred_for);
        }
    });
    return arrayBredFor;
}
export { bredFor};