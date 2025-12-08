import { $ } from "../utils/dom.js";
export function showAlert(message, type = "success"){

    const container = $("alertContainer");
    const el = document.createElement("div");
    el.className = 
    `px-4 py-2 rounded shadow text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
     }`;
    el.textContent = message;
    container.appendChild(el);
    setTimeout(() => el.remove(), 3000);

}