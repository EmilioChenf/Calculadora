# ChenCalc Lab

Calculadora web simple hecha con React, TypeScript, Vite, Bun y Storybook. El laboratorio está dividido por
componentes, tiene una estética neo dashboard con glassmorphism y concentra la lógica matemática en utilidades puras
para poder probarla con `bun test`.

## Tecnologías

- React + TypeScript
- Vite
- Bun como package manager
- Storybook
- ESLint
- Bun test

## Instalación

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

## Requisitos cumplidos

- Display con estado visual `READY`, `TYPING`, `RESULT` y `ERROR`.
- Teclado numérico hecho con botones HTML.
- Entrada únicamente por botones de la interfaz.
- Concatenación de números a la derecha.
- Límite estricto de 9 caracteres en pantalla, salvo la palabra `ERROR`.
- Operaciones `+`, `-`, `*`, `/`, `%`, `.`, `+/-`, `=` y `AC`.
- Operaciones continuas con resultado parcial inmediato.
- Sin uso de `eval`.
- División entre cero y resultados inválidos muestran `ERROR`.
- Storybook con calculadora, display en varios estados y keypad completo.
- ESLint configurado sin punto y coma y máximo 120 caracteres por línea.
- `.gitignore`, favicon personalizado y title personalizado.

## Lógica de la calculadora

La lógica vive en `src/utils/calculatorChenin.ts`. El estado guarda `cheninDisplay`, `chencitoValue`,
`cheninOperator`, una bandera para limpiar el siguiente input y el estado visual. Cuando se presiona un operador, se
guarda el valor actual. Si ya había una operación pendiente, `resolveCheninResult` calcula el parcial y lo muestra de
inmediato. El botón `=` resuelve la operación pendiente y deja el display listo para empezar otra entrada.

`formatChencitoNumber` valida cada resultado antes de mostrarlo: recorta decimales con seguridad para no superar 9
caracteres, elimina ceros innecesarios y bloquea valores fuera de rango.

## Casos de ERROR

La pantalla muestra `ERROR` cuando ocurre cualquiera de estos casos:

- División entre cero.
- Módulo entre cero.
- Resultado negativo producido por una operación.
- Resultado mayor a `999999999`.
- Resultado infinito, `NaN` o no representable dentro del límite visual.

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
