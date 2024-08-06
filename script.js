function calcularCredito() {
   
    const tipoCredito = document.getElementById("tipoCredito").value;
    const montoPrestamo = parseFloat(document.getElementById("montoPrestamo").value);
    const tasaInteres = parseFloat(document.getElementById("tasaInteres").value) / 100;
    const plazoAnios = parseInt(document.getElementById("plazo").value);
    const enganche = parseFloat(document.getElementById("enganche").value) || 0;
    const comisionApertura = parseFloat(document.getElementById("comisionApertura").value) / 100 || 0;
    const tipoPeriodo = document.getElementById("tipoPeriodo").value;
    const iva = 0.16; 

    if (isNaN(montoPrestamo) || montoPrestamo <= 0) {
        alert("Por favor, ingresa un monto de préstamo válido y positivo.");
        return;
    }
    if (isNaN(tasaInteres) || tasaInteres <= 0) {
        alert("Por favor, ingresa una tasa de interés anual válida y positiva.");
        return;
    }
    if (isNaN(plazoAnios) || plazoAnios <= 0) {
        alert("Por favor, ingresa un plazo válido y positivo en años.");
        return;
    }
    if (enganche < 0) {
        alert("El enganche no puede ser negativo.");
        return;
    }
    if (comisionApertura < 0) {
        alert("La comisión por apertura no puede ser negativa.");
        return;
    }

   
    let plazo, tasaPeriodo;
    switch (tipoPeriodo) {
        case 'mensual':
            plazo = plazoAnios * 12;
            tasaPeriodo = tasaInteres / 12;
            break;
        case 'trimestral':
            plazo = plazoAnios * 4;
            tasaPeriodo = tasaInteres / 4;
            break;
        case 'semestral':
            plazo = plazoAnios * 2;
            tasaPeriodo = tasaInteres / 2;
            break;
        case 'anual':
            plazo = plazoAnios;
            tasaPeriodo = tasaInteres;
            break;
        default:
            alert("Por favor, selecciona un tipo de período válido.");
            return;
    }


    const montoTotal = montoPrestamo - enganche;
    if (montoTotal <= 0) {
        alert("El monto total del préstamo debe ser mayor que el enganche.");
        return;
    }

 
    const comisionInicial = montoTotal * comisionApertura;
    const pagoPeriodo = montoTotal * (tasaPeriodo * Math.pow((1 + tasaPeriodo), plazo)) / (Math.pow((1 + tasaPeriodo), plazo) - 1);
    const interesesTotales = pagoPeriodo * plazo - montoTotal;
    const ivaPeriodo = pagoPeriodo * iva;
    const pagoPeriodoConIVA = pagoPeriodo + ivaPeriodo;
    const ivaIntereses = interesesTotales * iva;

   
    let resultadoHTML = `
    <h2>Resultados del Crédito</h2>
    <p>Tipo de Crédito: ${tipoCredito.charAt(0).toUpperCase() + tipoCredito.slice(1)}</p>
    <p>Monto del Préstamo: $${montoPrestamo.toFixed(2)}</p>
    <p>Tasa de Interés Anual: ${(tasaInteres * 100).toFixed(2)}%</p>
    <p>Plazo del Préstamo: ${plazoAnios} años (${plazo} ${tipoPeriodo}(s))</p>
    <p>Enganche: $${enganche.toFixed(2)}</p>
    <p>Comisión por Apertura: $${comisionInicial.toFixed(2)}</p>
    <p>Pago ${tipoPeriodo.charAt(0).toUpperCase() + tipoPeriodo.slice(1)} Estimado (sin IVA): $${pagoPeriodo.toFixed(2)}</p>
    <p>Pago ${tipoPeriodo.charAt(0).toUpperCase() + tipoPeriodo.slice(1)} Estimado (con IVA): $${pagoPeriodoConIVA.toFixed(2)}</p>
    <p>Intereses Totales: $${interesesTotales.toFixed(2)}</p>
    <p>IVA sobre Intereses: $${ivaIntereses.toFixed(2)}</p>
    <h3>Tabla de Amortización</h3>
    <table>
        <thead>
            <tr>
                <th>Período</th>
                <th>Pago</th>
                <th>Interés</th>
                <th>Capital</th>
                <th>Saldo</th>
            </tr>
        </thead>
        <tbody>`;

   
    let saldo = montoTotal;
    for (let i = 0; i < plazo; i++) {
        const interesPeriodo = saldo * tasaPeriodo;
        const capitalPeriodo = pagoPeriodo - interesPeriodo;
        saldo -= capitalPeriodo;
        resultadoHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>$${pagoPeriodoConIVA.toFixed(2)}</td>
            <td>$${interesPeriodo.toFixed(2)}</td>
            <td>$${capitalPeriodo.toFixed(2)}</td>
            <td>$${saldo.toFixed(2)}</td>
        </tr>`;
    }

    resultadoHTML += `</tbody></table>`;
    document.getElementById("resultados").innerHTML = resultadoHTML;
}
