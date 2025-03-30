let saldo = parseFloat(localStorage.getItem("saldo")) || 0;
let ingresos = parseFloat(localStorage.getItem("ingreso")) || 0;
let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

document.getElementById("saldo").textContent = saldo.toFixed(2);
document.getElementById("ingreso").value = ingresos;
mostrarGastos();

function actualizarSaldo() {
    document.getElementById("saldo").textContent = saldo.toFixed(2);
    localStorage.setItem("saldo", saldo);
}

function editarIngreso() {
    let ingreso = parseFloat(document.getElementById("ingreso").value);
    if (!isNaN(ingreso) && ingreso >= 0) {
        saldo = ingreso - totalGastos();
        ingresos = ingreso;
        localStorage.setItem("ingreso", ingresos);
        actualizarSaldo();
    } else {
        alert("Ingrese un monto válido.");
    }
}

function agregarGasto() {
    let titulo = document.getElementById("tituloGasto").value;
    let monto = parseFloat(document.getElementById("montoGasto").value);

    if (titulo.trim() !== "" && !isNaN(monto) && monto > 0) {
        gastos.push({ titulo, monto });
        saldo -= monto;
        localStorage.setItem("gastos", JSON.stringify(gastos));
        actualizarSaldo();
        mostrarGastos();
        document.getElementById("tituloGasto").value = "";
        document.getElementById("montoGasto").value = "";
    } else {
        alert("Ingrese un título y un monto válido.");
    }
}

function mostrarGastos() {
    let lista = document.getElementById("listaGastos");
    lista.innerHTML = "";
    gastos.forEach((gasto, index) => {
        let item = document.createElement("li");
        item.innerHTML = `${gasto.titulo}: -$${gasto.monto.toFixed(2)} 
                          <button class="delete-btn" onclick="eliminarGasto(${index})">X</button>`;
        lista.appendChild(item);
    });
}

function eliminarGasto(index) {
    saldo += gastos[index].monto;
    gastos.splice(index, 1);
    localStorage.setItem("gastos", JSON.stringify(gastos));
    actualizarSaldo();
    mostrarGastos();
}

function totalGastos() {
    return gastos.reduce((total, gasto) => total + gasto.monto, 0);
}
