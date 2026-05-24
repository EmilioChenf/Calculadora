# ChenCalc Lab

Calculadora web simple hecha con React, TypeScript, Vite, Bun y Storybook. El laboratorio esta dividido por
componentes, tiene una estetica neo dashboard con glassmorphism y concentra la logica matematica en utilidades puras
para poder probarla con `bun test`.

## Tecnologias

- React + TypeScript
- Vite
- Bun como package manager
- Storybook
- ESLint
- Bun test
- Docker + Docker Compose

## Instalacion

```bash
bun install
```

## Scripts

```bash
bun run dev
bun run build
bun run preview
bun run test
bun run lint
bun run storybook
bun run build-storybook
```

## Docker

Construir y levantar el frontend:

```bash
docker compose up --build
```

La app queda disponible en:

```text
http://localhost:5173
```

Detener los contenedores:

```bash
docker compose down
```

Correr tests dentro del contenedor:

```bash
docker compose exec calculadora bun run test
```

Correr lint dentro del contenedor:

```bash
docker compose exec calculadora bun run lint
```

Correr Storybook dentro del contenedor:

```bash
docker compose exec calculadora bun run storybook -- --host 0.0.0.0
```

Storybook usa el puerto `6006`, expuesto por `docker-compose.yml`.

## Requisitos cumplidos

- Display con estado visual `READY`, `TYPING`, `RESULT` y `ERROR`.
- Teclado numerico hecho con botones HTML.
- Entrada unicamente por botones de la interfaz.
- Concatenacion de numeros a la derecha.
- Limite estricto de 9 caracteres en pantalla, salvo la palabra `ERROR`.
- Operaciones `+`, `-`, `*`, `/`, `%`, `.`, `+/-`, `=` y `AC`.
- Operaciones continuas con resultado parcial inmediato.
- Sin uso de `eval`.
- Division entre cero y resultados invalidos muestran `ERROR`.
- Storybook con calculadora, display en varios estados y keypad completo.
- ESLint configurado sin punto y coma y maximo 120 caracteres por linea.
- Docker configurado con Bun, Vite en `0.0.0.0`, hot reload y `node_modules` aislado.
- `.gitignore`, `.dockerignore`, favicon personalizado y title personalizado.

## Logica de la calculadora

La logica vive en `src/utils/calculatorChenin.ts`. El estado guarda `cheninDisplay`, `chencitoValue`,
`cheninOperator`, una bandera para limpiar el siguiente input y el estado visual. Cuando se presiona un operador, se
guarda el valor actual. Si ya habia una operacion pendiente, `resolveCheninResult` calcula el parcial y lo muestra de
inmediato. El boton `=` resuelve la operacion pendiente y deja el display listo para empezar otra entrada.

`formatChencitoNumber` valida cada resultado antes de mostrarlo: recorta decimales con seguridad para no superar 9
caracteres, elimina ceros innecesarios y bloquea valores fuera de rango.

## Casos de ERROR

La pantalla muestra `ERROR` cuando ocurre cualquiera de estos casos:

- Division entre cero.
- Modulo entre cero.
- Resultado negativo producido por una operacion.
- Resultado mayor a `999999999`.
- Resultado infinito, `NaN` o no representable dentro del limite visual.

## Estructura

```text
src/
  App.tsx
  components/
    CalculatorShell.tsx
    Display.tsx
    Keypad.tsx
    CalcButton.tsx
  hooks/
    useCheninCalculator.ts
  stories/
  tests/
  types/
    calculatorTypes.ts
  utils/
    calculatorChenin.ts
```
