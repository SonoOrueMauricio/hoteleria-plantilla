let habitacionSeleccionada = "";
let extrasSeleccionados = [];

const roomButtons = document.querySelectorAll(".btn-room");
roomButtons.forEach(button => {
    button.addEventListener("click", () => {
        habitacionSeleccionada = button.dataset.room;

        roomButtons.forEach(btn => {
            btn.classList.remove("selected-room");
        })
        button.classList.add("selected-room");
        actualizarResumen();
    })
});

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
        actualizarResumen();
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

function actualizarResumen() {
    const resumen = document.querySelector("#resumen-reserva");
    resumen.innerHTML = `
    <strong>Habitación: </strong>${habitacionSeleccionada || "Ninguna"}
    <br>
    <strong>Extras: </strong>${extrasSeleccionados.join(", ") ||"Ninguno"}`;
};
