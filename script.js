function calcularCredito() {
 
    const tipoCredito = document.getElementById("tipoCredito").value;
    const montoPrestamo = parseFloat(document.getElementById("montoPrestamo").value);
    const tasaInteres = parseFloat(document.getElementById("tasaInteres").value) / 100;
    const plazo = parseInt(document.getElementById("plazo").value) * 12; 
    const enganche = parseFloat(document.getElementById("enganche").value) || 0;
    const comisionApertura = parseFloat(document.getElementById("comisionApertura").value) / 100 || 0;

    
    const montoTotal = montoPrestamo - enganche;
    const comisionInicial = montoTotal * comisionApertura;
   


    const tasaMensual = tasaInteres / 12;
    const pagoMensual = montoTotal * (tasaMensual * Math.pow((1 + tasaMensual), plazo)) / (Math.pow((1 + tasaMensual), plazo) - 1);
    const interesesTotales = pagoMensual * plazo - montoTotal;

   
    const ivaMensual = pagoMensual * iva;

    const pagoMensualConIVA = pagoMensual + ivaMensual;

 
    const ivaIntereses = interesesTotales * iva;


    let resultadoHTML = `
    <h2>Resultados del Crédito</h2>
    <p>Tipo de Crédito: ${tipoCredito.charAt(0).toUpperCase() + tipoCredito.slice(1)}</p>
    <p>Monto del Préstamo: $${montoPrestamo.toFixed(2)}</p>
    <p>Tasa de Interés Anual: ${(tasaInteres * 100).toFixed(2)}%</p>
    <p>Plazo del Préstamo: ${plazo / 12} años (${plazo} meses)</p>
    <p>Enganche: $${enganche.toFixed(2)}</p>
    <p>Comisión por Apertura: $${comisionInicial.toFixed(2)}</p>
    <p>Pago Mensual Estimado (sin IVA): $${pagoMensual.toFixed(2)}</p>
    <p>Pago Mensual Estimado (con IVA): $${pagoMensualConIVA.toFixed(2)}</p>
    <p>Intereses Totales: $${interesesTotales.toFixed(2)}</p>
    <p>IVA sobre Intereses: $${ivaIntereses.toFixed(2)}</p>
    <h3>Tabla de Amortización</h3>
    <table>
        <thead>
            <tr>
                <th>Mes</th>
                <th>Pago</th>
                <th>Interés</th>
                <th>Capital</th>
                <th>Saldo</th>
            </tr>
        </thead>
        <tbody>`;

    let saldo = montoTotal;
    for (let i = 0; i < plazo; i++) {
        const interesMensual = saldo * (tasaInteres / 12);
        const capitalMensual = pagoMensual - interesMensual;
        saldo -= capitalMensual;
        resultadoHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>$${pagoMensualConIVA.toFixed(2)}</td>
            <td>$${interesMensual.toFixed(2)}</td>
            <td>$${capitalMensual.toFixed(2)}</td>
            <td>$${saldo.toFixed(2)}</td>
        </tr>`;
    }

    resultadoHTML += `</tbody></table>`;
    document.getElementById("resultados").innerHTML = resultadoHTML;
}
