// app.ts
import express from 'express';

class Estudiante {
    // Propiedades
    nombre: string;
    edad: number;
    cursos: string[];

    // Constructor
    constructor(nombre: string, edad: number, cursos: string[]) {
        this.nombre = nombre;
        this.edad = edad;
        this.cursos = cursos;
    }

    // Métodos
    saludar(): void {
        console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
    }

    inscribirseEnCurso(curso: string): void {
        this.cursos.push(curso);
        console.log(`${this.nombre} se ha inscrito en el curso de ${curso}.`);
    }
}

const app = express();
const port = 5500;

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
