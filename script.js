//EJERCICIO: Tienda de productos
//! 1 - Hacer fetch de productos https://fakestoreapi.com/products
//! 2 - Generar en el DOM una lista UL/LI con el titulo de cada elemento
//! 7 - Modificar la función que muestra en el DOM las etiquetas <li> (punto 2), para que nuestra aplicación muestre la información completa de cada producto en una tarjeta como las que podemos encontrar en una tienda online.
fetch('https://fakestoreapi.com/products/')
    //TODO: Como podemos hacer para no llamar a la API todo el rato para restear el primer fetch (Local Storage)
    .then(res => res.json())
    .then(payload => {
        let ul = document.createElement("ul")
        payload.length > 0
            ? (payload.map((product) => {
                ul.setAttribute("id", "list")
                let productLi = document.createElement("li")
                productLi.innerHTML = product.title
                ul.appendChild(productLi)
            }))
            : (console.log("No se puede iterar payload"))
        document.body.appendChild(ul)
        //TALLER GIT
        let navbar = document.createElement("nav")
        payload.length > 0
            ? (payload.map((product) => {
                let contaniner = document.createElement("div")
                contaniner.setAttribute("id", "container")
                navbar.appendChild(contaniner)
                contaniner.innerHTML
            }))
            : (console.log("No se puede iterar payload"))
            

    })
//! 3 - Hacer un fetch a fakestoreapi para obtener las categorías de productos (Buscar en la documentación de la API el endpoint correspondiente)
//! 4 - Generar en el DOM un <select> que contenga en sus opciones los nombres de las categorías en fakestoreapi. Las opciones deberán generarse dinámicamente, como los <li> del punto 2, no podrán escribirse a mano. La primera opción de nuestro <select> deberá ser "Todas las categorías".
fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(payload => {
        const category = document.createElement("select")
        category.setAttribute("id", "categories")
        const firstOp = document.createElement("option")
        firstOp.setAttribute("value", "empty")
        category.appendChild(firstOp)
        payload.length > 0
            ? payload.map((cat) => {
                firstOp.innerHTML = "Todas las categorías"
                const categoryOp = document.createElement("option")
                categoryOp.setAttribute("value", cat)
                categoryOp.innerHTML = cat
                category.appendChild(categoryOp)
            })
            : (console.log("Empty"));
        document.body.appendChild(category)
    })
    //! 5 - Al seleccionar una categoría nuestra app deberá hacer un nuevo fetch a fakestoreapi para obtener solo los productos correspondientes a esa categoría. (Buscar en la documentación de la API el endpoint correspondiente)
    //! 6 - Eliminar del DOM la lista anterior y generar los nuevos items con la información de cada elemento.
    .then(() => {
        let valorOpt = document.querySelector("#categories")
        valorOpt.addEventListener("change", (event) => {
            console.log(valorOpt.value)
            let enlace = `https://fakestoreapi.com/products/category/${valorOpt.value}`
            console.log(enlace);
            let deleteUL = document.querySelector("#list")
            //? Si el value es Todas las categorías, no hagas fetch
            document.querySelector("#categories").value !== "empty"
                ?
                fetch(enlace)
                    .then(res => res.json())
                    .then(json => {
                        let containerList = document.querySelector("#list")
                        deleteUL.innerHTML = ""
                        json.map((product) => {
                            console.log(product.title);
                            let productLi = document.createElement("li")
                            productLi.innerHTML = product.title;
                            containerList.appendChild(productLi)
                        })
                        document.body.appendChild(containerList)
                    })
                : console.log("TODAS LAS CATEGORIAS")
        })
    })



