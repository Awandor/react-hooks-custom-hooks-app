# Aplicación con varios Hooks

Se ha generado con > `npx create-react-app hook-app`

Es mejor usar Chrome como navegador para desarrollo, Brave da problemas

## Preparación

En `src` borramos todo salvo el `index.js`

Creamos `src/HookApp.js` que va a ser un functional component

Instalamos Bootstrap


## useState Hook

Creamos `src/components/01-useState/CounterApp.js` es un functional component, snippet `rafc`

Agregamos un texto y un botón

Importamos `useState` y trabajamos con él, en vez de pasarle un valor como argumento le pasamos un objeto con varias propiedades

Usamos el operador spread para acceder y cambiar esas propiedades


## Custom Hook

Creamos un custom Hook en `src/components/01-useState/CounterWithCustomHook.js`

Vamos a centralizar la lógica del contador para poderla reutilizar, para ello se usan los custom Hooks

Creamos `hooks/useCounter.js` la palabra use es para identificar que es un Hook

Un custom Hook no es más que una simple función, dentro usamos `useState` y creamos 2 funciones para incrementar y disminuir valor

retornamos un arreglo

Ahora usamos nuestro custom Hook en el componente `CounterWithCustomHook.js`


## useEffect Hook

Creamos `src/components/02-useEffect/SimpleForm.js` es un functional component

El `useEffect` en un Hook que nos permite ejecutar algún efecto secundario cuando algo sucede en un componente

Creamos un pequeño formulario, para ello necesitamos manejar su estado con `useState`

`useEffect` se dispara cada vez que algo cambia, letra a letra cuando escribimos en el formulario, esto se restringe para que
se dispare cuando nosotros queramos. Si sólo queremos que se dispare una vez le pasamos como segundo argumento un arreglo vacío,
se dispara al renderizarse el componente

En general los Hooks no se pueden meter dentro de una condición, se considera mala práctica y React no lo va a aceptar y deben
estar siempre lo más al principio del código del componente.

### unmount - cleanup

Los Hooks retornan una función que se dispara cuando el componente se desmonta y deja de existir y ejecuta una limpieza si fuera
necesaria.

Creamos componente `src/components/02-useEffect/Message.js` y lo colocamos al final del retorno de `SimpleForm.js`

Cuando el nombre coincide con la condición se muestra el componente y se dispara `useEffect`, en cuanto el nombre no cumple con la
condición desaparece el componente y se dispara el proceso de cleanup de `useEffect`, aquí es donde podemos ejecutar lo que queramos,
entre otras cosas evitar fugas de memoria


## custom Hook en formulario

Vamos a extraer `useState` y `handleInputChange` del formulario y colocarlo en un custom Hook.

Así si voy a crear otro formulario puedo usar el mismo custom Hook

Creamos `src/components/02-useEffect/FormWithCustomHook.js` igual que el anterior formulario pero agregando un campo y quitando cosas

Ahora creamos un custom Hook `useForm.js` con `useState` y `handleInputChange` y lo usamos en `FormWithCustomHook.js`

Manejamos el posteo del formulario con onSubmit


## custom Hook para manejar fetch API

Vamos a usar la API `The Breaking Bad API` de `https://breakingbadapi.com/` vamos a `Documentation > Base URL`

Abrimos Postman y probamos `Get quote by id`

Creamos un custom Hook `useFetch.js` por defecto va a tener un estado `useState` recibe como argumento la url a la API realiza un fetch
y retorna los datos

Creamos `src/components/03-examples/MultipleCustomHooks.js`

Importamos `useFetch.js` y lo usamos para obtener datos, ahora pintamos los datos en pantalla

Ahora implementamos un botón que nos muestra la próxima cita de la serie, necesitamos un contador así que importamos el custom Hook
`useCounter`


## useRef Hook

Este es un Hook de React

Creamos `src/components/04-useRef/FocusScreen.js`

con `useRef` podemos crear referencias a elementos HMTL y acceder rápidamente a ellos.

En este ejercico vamos a disparar el foco en un input al hacer click en un botón

Vamos a ver un ejemplo más real de uso

Creamos `src/components/04-useRef/RealExampleRef.js` ponemos un botón que monta o desmonta el componente <MultipleCustomHooks />

Hemos ralentizado un poco el `useFetch`, si mientra está haciendo la petición fetch ocultamos <MultipleCustomHooks /> con el
botón nos sale un error de que no se puede actualizar el estado (setState) de un componente desmontado y produce fuga de memoria

`useRef` nos puede ayudar aquí, nos vamos a `useFetch` y lo aplicamos


## useLayoutEffect

Es igual que useEffect pero se dispara después de todas las mutaciones del DOM

Creamos `src/components/05-useLayoutEffect/LayoutEffect.js`

Con `useLayoutEffect` podemos medir divs y comprobar cosas del layout después de que se haya renderizado todo el HTML


## Función Memo de React

Creamos `src/components/06-memos/Memorize.js`

Creamos `src/components/06-memos/Small.js`

Utilizamos <Small /> dentro del retorno de `Memorize.js`

Cada vez que incrementamos el valor de counter llamamos al componente small

Ahora creamos un caso en que no deba llamarse con otro botón que pinta true o false

Cuando pinchamos en Show toggle la frase del botón cambia, react nota que ha habido un cambio en el state y pinta de
nuevo el componente `Memorize.js` y como éste contiene el componente <Small /> también vuelve a ejecutarlo

Queremos prevenir que <Small /> se ejecute de nuevo si sus properties son las mismas, para ello tenemos el método `memo`
que al envolver el cuerpo de la función del componente vigila si alguna property ha cambiado antes de ejecutar


## useMemo Hook

Creamos `src/components/06-memos/MemoHook.js`

Simulamos un proceso lento y pesado cuando se carga el componente y cada vez que incrementamos counter igual que en
el caso anterior el proceso lento se dispara en cuanto que cualquier cosa cambie el state

Queremos proteger el proceso pesado para que sólo se dispare si un valor determinado cambia, `useMemo`

Ahora vamos a extraer el proceso pesado y lo ponemos en `src/components/helpers/procesoPesado.js` y lo usamos igual


## useCallback Hook

Creamos `src/components/06-memos/CallbackHook.js`

Hay dos casos de uso de `useCallback`

1. Cuando queremos enviar una función a un componente hijo

Creamos el componente hijo `src/components/06-memos/ShowIncrement.js` que es un botón que ejecuta la función increment,
el componente recibe esta función como property

En el componente padre colocamos <ShowIncrement /> y le pasamos la función 

Tenemos el mismo problema, cada vez que pinchamos el botón se vuelve a ejecutar el componente hijo, no podemos usar `memo`
porque no protege porque el valor que vigila ahora es una función que en el fondo es un objeto y por tanto se almacena
como referencia en un espacio de memoria y cuando se comparan apuntan a espacios diferentes por lo que parecen diferentes
y `memo` no protege.

Para arreglar esto tenemos `useCallback` en `CallbackHook.js`

2. Cuando tenemos un `useEffect` cuya dependencia es una función, esa función tendría que definirse con useCallback


## Idea general de un Reducer

Creamos `src/components/08-useReducer/intro-reducer.js`


## useReducer Hook

Creamos `src/components/08-useReducer/TodoApp.js`

Vamos a usar `useReducer`, es una alternativa a `useState` con la diferencia de que si queremos manejar un state simple
con pocas cosas que van a cambiar usamos `useState`

Pero si ya es algo bastante grande o algo que tiene muchas acciones que van a estar cambiando o intercambiando con otros
componentes mediante properties usaremos `useReducer`

Esto es lo que vamos a hacer.

Creamos formulario con un input y un botón que dispara submit y que controlamos en el formulario con onSubmit que
dispara handleSubmit, éste lo envía al reducer `todoReducer.js` quien manipula ese estado y de esa manera agrega un nuevo
elemento a la lista de todos.

La función `useReducer` retorna por desestructuración `todos` y `dispatch`

Dispatch es una función a la que le mandamos una acción y determina a qué reducer se envía y cuando cambia el state va a
redibujar lo que cambie

Ahora hacemos la lectura del input, se puede hacer de varias maneras, una es que tengamos un estado en el cual podemos manejar
este campo y cuando cambia hacer el handleInputChange. Ya lo tenemos montado en el custom Hook `useForm.js`, así que lo
importamos y usamos

Añadimos función reset del formulario a `useForm.js` y lo aplicamos a `TodoApp.js`

Vamos a guardar en el local Storage, en `TodoApp.js` tenemos useReducer a la que le podemos enviar como tercer argumento
la función `init` que se encarga de computar todo el estado inicial para que funcione más rápido el componente.
No se está ejecutando constantemente.

La función `init` va a retornar el mismo objeto que es la variable `initialState`

Usamos un efecto `useEffect` que dispara un callback que se dispara si los `todos` cambian, pero también se ejecuta al
inicio en el estado inicial. El callback guarda los datos en local Storage.

Ahora modificamos la función `init` para que retorne los `todos` de local Storage, manejamos la posibilidad de que el
retorno sea null, la ventaja que tenemos es que JSON.stringify(null) = null

Vamos a borrar `todos`, manejamos la opción en `todoReducer.js` e implementamos la lógica en `TodoApp.js`

Ahora de forma similar aplicamos la propiedad `done`


## Refactorizamos 

Refactorizamos `TodoApp.js`, lo dividimos en otros tres componentes `TodoList`, `TodoListItem` y `TodoAdd.js`


## useContext Hook

En vez de ir pasando propiedades de un padre a un hijo, a un nieto y a un bisnieto las podemos almacenar en algo llamado
contexto del que pueden nutrirse los descendientes. 

No es obligatorio usarlo pero hay casos en que no hay otra manera de resolverlo como en el caso de un Router, igualmente
hay casos en que no se puede resolver con useContext y hay que hacerlo pasando propiedades.

El context se sitúa a un nivel superior y permite la comunicación entre hermanos

Vamos a crear una pequeña app que tenga rutas

Necesitamos hacer unas instalaciones para poder trabajar con las rutas de React

Documentación: `https://reactrouter.com/web/api/NavLink`

Hay 3 maneras de trabajar con rutas: core, web, native. Vamos atrabajar con Web

> `npm install react-router-dom`

Creamos directorio `src/components/09-useContext` y dentro creamos archivos `HomePage.js`, `LoginPage.js`, `MainApp.js` y `AboutPage.js`

Colocamos en `index.js` `MainApp.js` porque va a ser el punto principal de entrada a la app

Vamos a configurar las rutas, creamos `src/components/09-useContext/AppRouter.js`

Una app puede tener más de un Router.

En la documentación nos vamos a `Quick Start` y copiamos del ejemplo y pegamos en `AppRouter.js`

Ahora colocamos <AppRouter /> en `MainApp.js`

Creamos `src/components/09-useContext/NavBar.js` ponemos 3 enlaces pero en vez de usar <a> usamos <Link> de React para que
la página no recargue

También tenemos <NavLink> que funciona igual pero con la opción `activeClassName` para aplicar una clase al link activo

Ahora vamos a pasar datos entre las páginas que son hermanos, necesitamos establecer esos datos en un nivel superior, otro
componente que llamaremos `UserContext.js` es un `Context` que básicamente es un componente, en él importamos el
método createContext y lo llamamos y exportamos como `UserContext.js`, que es un higher order component, un componente que contiene
otros componentes.

Vamos a `MainApp.js` y envolvemos <AppRouter /> en <UserContext /> de esta manera lo que se establezca de datos en `UserContext.js`
estará disponible en `AppRouter.js` y en todos sus hijos



# Pruebas Unitarias y de Integración

Las pruebas unitarias están enfocadas en pequeñas funcionalidades mientras las pruebas de integración están enfocadas en cómo reaccionan
varias piezas en conjunto, el proceso de las pruebas se conoce como **AAA**: Arrange, Act, Assert

1. Arrange, es cuando preparamos el estado inicial: iniciamos variables, importaciones necesarias, preparamos el ambiente del sujeto a probar
2. Act, aplicamos acciones o estímulos sobre el sujeto a probar: llamamos métodos, simulamos clicks
3. Assert, observamos el comportamiento resultante y afirmamos que los resultados son los esperados


## Instalaciones de paquetes y configuración del entorno de pruebas

Creamos `src/setupTests.js`

### Enzyme

Enzyme es una utilidad para probar componentes de React, fue desarrollado por AirBnB y ahora es mantenido por Facebook

Documentación: `https://enzymejs.github.io/enzyme/`

A fecha de hoy no hay Enzyme para React 17 oficial, hay una versión no oficial en beta pero que nos va a servir: 
`https://github.com/wojtekmaj/enzyme-adapter-react-17`

La instalamos > `npm install --save-dev enzyme @wojtekmaj/enzyme-adapter-react-17`

Lo importamos en `setupTests.js` según la documentación

### Snapshot

Ahora vamos a trabajar con Snapshot que toma una fotografía de lo que renderiza el componente en forma de datos y que son
almacenados en una carpeta autogenerada `_snapshots_`

Pero para poder trabajar con esos datos en Jest necesitamos instalar el paquete enzyme-to-json: `https://www.npmjs.com/package/enzyme-to-json`

> `npm install --save-dev enzyme-to-json`

Ahora en `setupTests.js` importamos createSerializer según la documentación

### React Hooks testing

Librería para hacer pruebas de los Hooks de React `https://react-hooks-testing-library.com/`

La instalamos > `npm install --save-dev @testing-library/react-hooks`

Guardamos y hay que parar el servidor de test y levantarlo de nuevo `npm run test`


## Primera prueba unitaria: HookApp.js

Creamos la carpeta `tests` y archivo `HookApp.test.js` deben terminar con `.test.js`

En el archivo de prueba importamos el componente a probar `HookApp.js`
importamos `shallow` de `enzyme`
importamos `render` de `@testing-library/react`

Usamos el método `describe` de Jest, podemos usar el snippet `desc` y dentro esribimos `test` y hay un snippet que nos monta la estructura básica
usamos `shallow` y `toMatchSnapshot`

Abrimos el archivo `HookApp.test.js.snap` y comprobamos que aparece `Hola mundo`

Si el snapshot falla debemos tomar una nueva fotografía presionando `u` en la consola de test


## Prueba de custom Hook useCounter

Analizamos el custom Hook `useCounter`, es una función que retorna un número y tres funciones

Vamos a probar que cuando llamamos la primera vez a `useCounter` obtenemos ese retorno

Para probar que las funciones funcionan correctamente y ejecutarlas hay que importar y usar `act` de `@testing-library/react-hooks`


## Prueba de custom Hook useForm

Analizamos el custom Hook `useForm`, es una función que retorna un arreglo con un objeto y dos funciones

Vamos a probar que cuando llamamos la primera vez a `useForm` obtenemos ese retorno con el objeto vacío y dos funciones

Ahora vamos a probar que si le pasamos un objeto con datos obtenemos ese retorno con esos mismos datos

Vamos a probar las funciones, primero `handleInputChange` que cambie el nombre 

Ahora probamos que la función reset deja los valores iniciales después de haberlos cambiado


# Prueba de custom Hook useFetch

Analizamos el custom Hook `useFetch`, es una función que retorna el `state` que es un objeto

Vamos a probar que cuando llamamos la primera vez a `useFetch` obtenemos ese retorno con el objeto inicial


## Prueba con múltiples Hooks simultáneos

Analizamos el componente `MultipleCustomHooks.js`, es una función que retorna HTML de forma condicional y un botón

Hace uso de dos custom Hooks: `useCounter` y `useFetch`

Vamos a probar que el componente se muestra correctamente, usamos `shallow` y `toMatchSnapshot`

Abrimos el archivo `MultipleCustomHooks.test.js.snap` y comprobamos que aparece el HTML correcto

Si el snapshot falla debemos tomar una nueva fotografía presionando `u` en la consola de test

Ahora probamos que enviando datos de un mock recibimos los datos en elementos HTML


## Prueba del Hook useState

Analizamos el componente `RealExampleRef.js`, retorna HTML con un botón que cambia el state de show y dependiendo de
si es true o false muestra u oculta el componente <MultipleCustomHooks />

Vamos a probar que el componente se muestra correctamente, usamos `shallow` y `toMatchSnapshot`

Ahora simularemos el click del botón y comprobamos si muestra u oculta el componente correctamente


## Prueba de Reducer

Analizamos el Reducer `todoReducer.js`, todos los Reducer retornan un estado

Creamos un estado inicial en la prueba a modo de mock


## Prueba del componente TodoListItem

Analizamos el componente `TodoListItem.js`, es una función que recibe 4 argumentos y retorna HTML con un item con un toggle y un botón
de borrar

Usamos jest.fn() para simular funciones y saber si ha sido llamada, cuántas veces, con qué argumentos, etc.


## Prueba del componente TodoList

Analizamos el componente `TodoList.js`, es una función que recibe 3 argumentos y retorna HTML con una lista de items dependiendo
del arreglo que recibe como argumento

Vamos a probar que el componente se muestra correctamente, muestra dos items y que cada item tiene una propiedad que es una función


## Prueba del componente TodoAdd

Analizamos el componente `TodoAdd.js`, es una función que recibe un argumento que es una función y retorna HTML, un formulario con un campo de texto
y un botón de submit


## Prueba del componente TodoApp

Analizamos el componente `TodoApp.js`, es una función que contiene métodos y retorna los componentes TodoList y TodoAdd
Hacemos pruebas envolviendo con act y usando mount en vez de shallow


## Prueba del componente HomePage

Usamos un context que es un higher order component que envuelve el componente HomePage y por lo tanto no podemos usar shallow
sino mount para acceder al contenido de HomePage


## Prueba del componente LoginPage

Usamos un context que es un higher order component que envuelve el componente HomePage y por lo tanto no podemos usar shallow
sino mount para acceder al contenido de LoginPage


## Prueba de AppRouter

Nuevamente tenemos que usar mount pues el componente se encuentra dentro de un higher order component que es <Router>

También necesitamos el context para obtener el user porque AppRouter se inicia renderizando HomePage que imprime el user

No vamos a probar si las rutas funcionan, eso está probado por React ya








## Pruebas de componentes con Enzyme

Enzyme es una utilidad para probar componentes de React, fue desarrollado por AirBnB y ahora es mantenido por Facebook

Documentación: `https://enzymejs.github.io/enzyme/`

A fecha de hoy no hay Enzyme para React 17 oficial, hay una versión no oficial en beta pero que nos va a servir: 
`https://github.com/wojtekmaj/enzyme-adapter-react-17`

La instalamos > `npm install --save-dev enzyme @wojtekmaj/enzyme-adapter-react-17`

Lo importamos en `setupTests.js` según la documentación

Guardamos y hay que parar el servidor de test y levantarlo de nuevo `npm run test`

En el test de `<PrimeraApp />` importamos shallow de Enzyme

Ahora vamos a trabajar con Snapshot que toma una fotografía de lo que renderiza el componente en forma de datos y que son
almacenados en una carpeta autogenerada `_snapshots_`

Pero para poder trabajar con esos datos en Jest necesitamos instalar el paquete enzyme-to-json: `https://www.npmjs.com/package/enzyme-to-json`

> `npm install --save-dev enzyme-to-json`

Ahora en `setupTests.js` importamos createSerializer según la documentación

Guardamos y hay que parar el servidor de test y levantarlo de nuevo `npm run test`

Si el snapshot falla debemos tomar una nueva fotografía presionando `u` en la consola de test


## Prueba de elementos dentro de componentes con Enzyme

Podemos revisar elementos aplicando traversing muy parecido a jQuery


## Jest

Framework de pruebas para js, documentación: `https://jestjs.io/`

Generalmente empezamos con la función `expect` de jest

Disponemos de muchos métodos de prueba, vamos a buscar uno para comparar dos cosas.

Implementamos `.toBe(value)` a `demo.test.js`

Agrupamos las pruebas dentro de un contenedor `describe` que es una función


## Pruebas en 

Creamos carpeta `base` dentro de `tests` y creamos archivo `02-template-string.test.js`

Un consejo es importar `@testing-library/jest-dom` en el archivo y así tenemos acceso a todos los métodos en las sugerencias de vs code
al poner un punto después de `exepct`

El `npm run test` corre todas las pruebas del proyecto nada más hacer un cambio en el código, podemos limitar las pruebas,
en la consola en Watch Usage presionamos w y nos salen opciones, presionamos p y empezamos a escribir el nombre del archivo
del test que queremos y de las sugerencias seleccionamos y enter.

Si escribimos mensajes de consola en el test los vemos en la consola del test

Hay que tener cuidado con los logs de las páginas de la app pues aparecen en la consola del test y pueden ensuciar la vista


## Pruebas con tareas asíncronas

Todas las pruebas de peticiones http son de naturaleza asíncrona

El problema es que las pruebas se ejecutan de manera síncrona y si metemos una tarea asíncrona en el test, Jest no se va a detener a
esperar a que la tarea asíncrona se resuelva.

Podemos pasar un parámetro al callback del test, es done que es una función que al ejecutarla le decimos a Jest que el test ha terminado


## Pruebas de componentes de React

Vamos a hacer la prueba de `<PrimeraApp />`

Necesitamos renderizar lo que pinta el componente, importamos en el test `render`

Como no hemos iniciado el proyecto de React con tests necesitamos crear `archivo src/setupTests.js` en este archivo importamos
`@testing-library/jest-dom/extend-expect` que le da unas funcionalidades extra al expect de Jest

Guardamos y hay que parar el servidor de test y levantarlo de nuevo `npm run test`


# GIT

En nuestra cuenta de github creamos un repositorio

Si no tenemos repositorio git local lo creamos > `git init`

Si no tenemos archivo `.gitignore` lo creamos, especialmente para evitar `node_modules`

Añadimos los cambios a GIT> `git add .`
Commit > `git commit -m "Primer commit"`

Si en este punto borro accidentalmente algo puedo recuperarlo con > `git checkout -- .`

Que nos recontruye los archivos tal y como estaban en el último commit.

Enlazamos el repositorio local con un repositorio externo en GitHub donde tenemos cuenta y hemos creado un repositorio
`git remote add origin https://github.com/Awandor/gif-expert-react-app.git`

Situarnos en la rama master > `git branch -M master`

Subir todos los cambios a la rama master remota > `git push -u origin master`

Para reconstruir en local el código de GitHub nos bajamos el código y ejecutamos `npm install` que instala todas las dependencias


## Tags y Releases

Crear un tag en Github y un Release

> `git tag -a v1.0.0 -m "Versión 1 - Lista para producción"`

> `git tag` muestra los tags

> `git push --tags` > sube los tags al repositorio remoto

En github vamos a Tags > Add release notes


## Desplegar aplicación en GitHub Pages

Tenemos que hacer un pequeño cambio en las rutas de `index.html` del build, en vez de apuntar a la raíz del servidor deben de apuntar
al directorio que contiene `index.html` simplemente con `./`

Vamos github y creamos un nuevo repositorio, podemos hacer 2 cosas:
1. Crear un proyecto aparte sólo con el contenido de build y subirlo a github
2. Renombrar el directorio build a docs, así no será ignorado por `.gitignore` y GitHub Pages lo va a detectar como posible entrada a la app
y subimos toda la app a github

Ahora vamos acceder al repositorio como si fuera una página web

Vamos a Settings > GitHub Pages > Source > master branch > Save

La app es ahora accesible desde `https://awandor.github.io/...`












# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
