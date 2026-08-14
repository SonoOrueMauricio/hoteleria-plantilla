// Calculadora de Escritorio en JavaScript

const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora de Escritorio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .calculadora {
            background: #2d3436;
            border-radius: 20px;
            padding: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            width: 320px;
        }

        .titulo {
            text-align: center;
            color: #fff;
            margin-bottom: 20px;
            font-size: 24px;
            font-weight: bold;
        }

        .pantalla {
            background: #1e272e;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            text-align: right;
            border: 2px solid #667eea;
        }

        .resultado {
            font-size: 28px;
            color: #667eea;
            font-weight: bold;
            word-break: break-all;
            min-height: 40px;
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
        }

        .operacion {
            font-size: 16px;
            color: #95a5a6;
            min-height: 20px;
            margin-bottom: 10px;
        }

        .botones {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
        }

        button {
            padding: 15px;
            border: none;
            border-radius: 8px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #fff;
        }

        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        button:active {
            transform: translateY(0);
        }

        .numero {
            background: #34495e;
        }

        .numero:hover {
            background: #3d5466;
        }

        .operador {
            background: #667eea;
        }

        .operador:hover {
            background: #7c8ff1;
        }

        .igual {
            background: #00b894;
            grid-column: span 2;
        }

        .igual:hover {
            background: #1dd1a1;
        }

        .limpiar {
            background: #d63031;
            grid-column: span 2;
        }

        .limpiar:hover {
            background: #e17055;
        }

        .backspace {
            background: #f39c12;
        }

        .backspace:hover {
            background: #f5a623;
        }
    </style>
</head>
<body>
    <div class="calculadora">
        <div class="titulo">Calculadora</div>
        <div class="pantalla">
            <div class="operacion" id="operacion"></div>
            <div class="resultado" id="resultado">0</div>
        </div>
        <div class="botones">
            <button class="limpiar" onclick="limpiar()">C</button>
            <button class="backspace" onclick="retroceder()">⌫</button>
            <button class="operador" onclick="agregarOperador('/')">÷</button>
            
            <button class="numero" onclick="agregarNumero('7')">7</button>
            <button class="numero" onclick="agregarNumero('8')">8</button>
            <button class="numero" onclick="agregarNumero('9')">9</button>
            <button class="operador" onclick="agregarOperador('*')">×</button>
            
            <button class="numero" onclick="agregarNumero('4')">4</button>
            <button class="numero" onclick="agregarNumero('5')">5</button>
            <button class="numero" onclick="agregarNumero('6')">6</button>
            <button class="operador" onclick="agregarOperador('-')">−</button>
            
            <button class="numero" onclick="agregarNumero('1')">1</button>
            <button class="numero" onclick="agregarNumero('2')">2</button>
            <button class="numero" onclick="agregarNumero('3')">3</button>
            <button class="operador" onclick="agregarOperador('+')">+</button>
            
            <button class="numero" onclick="agregarNumero('0')">0</button>
            <button class="numero" onclick="agregarNumero('.')">.</button>
            <button class="igual" onclick="calcular()">=</button>
        </div>
    </div>

    <script>
        let pantalla = '0';
        let operacionAnterior = '';
        let nuevoNumero = true;

        function actualizarPantalla() {
            document.getElementById('resultado').innerText = pantalla;
        }

        function agregarNumero(numero) {
            if (pantalla === '0' && numero !== '.') {
                pantalla = numero;
            } else if (numero === '.' && pantalla.includes('.')) {
                return;
            } else {
                pantalla += numero;
            }
            nuevoNumero = false;
            actualizarPantalla();
        }

        function agregarOperador(operador) {
            if (nuevoNumero) return;
            
            operacionAnterior = pantalla + ' ' + operador + ' ';
            document.getElementById('operacion').innerText = operacionAnterior;
            pantalla = '0';
            nuevoNumero = true;
        }

        function calcular() {
            if (!operacionAnterior || nuevoNumero) return;
            
            try {
                const operacion = operacionAnterior.replace('÷', '/').replace('×', '*').replace('−', '-') + pantalla;
                const resultado = eval(operacion);
                document.getElementById('operacion').innerText = operacion + ' =';
                pantalla = resultado.toString();
                nuevoNumero = true;
                actualizarPantalla();
                operacionAnterior = '';
            } catch (e) {
                pantalla = 'Error';
                actualizarPantalla();
            }
        }

        function limpiar() {
            pantalla = '0';
            operacionAnterior = '';
            document.getElementById('operacion').innerText = '';
            nuevoNumero = true;
            actualizarPantalla();
        }

        function retroceder() {
            if (pantalla.length > 1) {
                pantalla = pantalla.slice(0, -1);
            } else {
                pantalla = '0';
            }
            actualizarPantalla();
        }

        // Soporte para teclado
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') agregarNumero(e.key);
            if (e.key === '.') agregarNumero('.');
            if (e.key === '+') agregarOperador('+');
            if (e.key === '-') agregarOperador('-');
            if (e.key === '*') agregarOperador('*');
            if (e.key === '/') { e.preventDefault(); agregarOperador('/'); }
            if (e.key === 'Enter' || e.key === '=') calcular();
            if (e.key === 'Backspace') retroceder();
            if (e.key === 'Escape') limpiar();
        });
    </script>
</body>
</html>
`;

// Crear un servidor simple para servir la calculadora
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🔢 Calculadora ejecutándose en http://localhost:${PORT}`);
    console.log(`Presiona Ctrl+C para detener el servidor`);
});
