
const Products = [{
    id: 1,
    marca: "Waterdog",
    img: "https://http2.mlstatic.com/D_NQ_NP_616575-MLA42441364181_072020-O.webp", 
    categoria: "Termos",
    stock: 20,
    precio: 15000,
    descripcion: "Termo metálico y ultra resistente."
    },
    {
    id: 2,
    marca: "Stanley",
    img: "https://http2.mlstatic.com/D_NQ_NP_823713-MLA46192402341_052021-O.webp" , 
    categoria: "Termos",
    stock: 30,
    precio: 30000,
    descripcion: "Termo militar de excelente calidad y resistencia."
    },
    {
    id: 3,
    marca: "Lumilagro", 
    img: "https://http2.mlstatic.com/D_NQ_NP_934089-MLA42441068436_072020-O.webp" , 
    categoria: "Termos",
    stock: 15,
    precio: 7000,
    descripcion: "Termo de acero de buena calidad y compacto"
    },
    {
    id: 4,
    marca: "Mate Térmico",
    img: "https://http2.mlstatic.com/D_NQ_NP_785664-MLA50717702400_072022-O.webp", 
    categoria: "Mates",
    stock: 50,
    precio: 2500,
    descripcion: "Mate Térmico de acero con bombilla incluida"
    },
    {
    id: 5, 
    marca: "Mate Calabaza",
    img: "https://http2.mlstatic.com/D_NQ_NP_653088-MLA49823408533_052022-O.webp", 
    categoria: "Mates",
    stock: 70,
    precio: 2000,
    descripcion: "Mate Calabaza de madera sin bombilla incluida"
    },
    {
    id: 6,
    marca: "Mate Camionero",
    img: "https://http2.mlstatic.com/D_NQ_NP_687546-MLA43870298631_102020-O.webp" , 
    categoria: "Mates",
    stock: 35,
    precio: 6000,
    descripcion: "Mate Camionero tallado en madera con bombilla incluida"
    },
]

const getProducts = new Promise (( resolve , reject) => {
        setTimeout(() => {
            resolve(Products)
        })
    }, )

export default getProducts
