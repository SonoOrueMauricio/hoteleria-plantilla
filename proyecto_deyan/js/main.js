let habitacionSeleccionada = "";
let extrasSeleccionados = [];
const roomButtons = document.querySelectorAll(".btn-room");
roomButtons.forEach(button => {
    button.addEventListener("click", () => {
        habitacionSeleccionada = button.dataset.room;
    })
})
const extrasButtons = document.querySelectorAll(".btn-extra");
extrasButtons.forEach(button => {
    button.addEventListener("click", () => {
        const extra = button.dataset.extra;
        const existe = extrasSeleccionados.includes(extra);
        if(existe){
            extrasSeleccionados = extrasSeleccionados.filter(item => item !==extra);
            button.classList.remove("selected");
        } else {
            extrasSeleccionados.push(extra);
            button.classList.add("selected");
        }
    });
});
const whatsappButton = document.querySelector("#btn-whatsapp");
whatsappButton.addEventListener("click", (e) => {
    e.preventDefault();
    const numero = "51961009820";
    let mensaje = `Hola, deseo realizar una reserva.
    Habitación: 
    ${habitacionSeleccionada || "No seleccionada."}
    Extras:
    ${extrasSeleccionados.join(", ") || "Ninguno."}`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
});