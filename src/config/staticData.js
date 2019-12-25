import { Dimensions } from 'react-native';

export const PAQUETES = [
    {
        name: 'VIP',
        content: [
            'Logotipo visible',
            'Número de visitas',
            'Calificación del Cliente',
            'Comentarios visibles',
            'Gráficas de Análisis',
            'Notificaciones extras',
            'Mensajes',
            'Calificación de clientes',
            'Descuentos por temporada',
            'Recomendaciones'
        ],
        price: '500.00',
        note: 'Mensuales',
        color: '#FCD306'
    },
    {
        name: 'Premium',
        content: [
            'Logotipo visible',
            'Número de visitas',
            'Calificación del Cliente',
            'Comentarios visibles',
            'Gráficas de Análisis',
            'Notificaciones extras',
            'Mensajes'
        ],
        price: '200.00',
        note: 'Mensuales',
        color: '#A7CE38'

    },
    {
        name: 'Básico',
        content: [
            'Logotipo visible',
            'Número de visitas',
            'Calificación del Cliente',
            'Comentarios visibles'
        ],
        price: '100.00',
        note: 'Mensuales',
        color: '#F26D06'

    }
]

export const AYUDA = {
    title: 'Esta sección es para que nos contactes si tienes algún problema con:',
    content: [
        'Pagos', 'Vigencias', 'Reclamar posicionamiento de un negocio usado por alguien más'
    ],
    contacto: 'quickb@gmail.com'
}

export const REGISTRAR = {
    title: 'Bienvenido a',
    description1: 'Esta opción es para escoger tu negocio de nuestra base de datos para que puedas usarlo en nuestra app',
    description2: 'En caso de ya estar en uso y no ser de usted contáctenos en ayuda'
}


export const RESULTADOS = [
    {
        avatar: 'https://dailytimes.com.pk/assets/uploads/2018/11/21/howcuttingdo.jpg',
        name: 'Garufa',
        address: 'Jardín Juárez, 135, Centro',
        title: 'Restaurante',
    },
    {
        avatar: 'https://images-na.ssl-images-amazon.com/images/I/41q5iK0d9cL.jpg',
        name: 'Joaquim',
        address: 'Jardín Juárez, 135, Centro',
        title: 'Restaurante',
    },
]

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.004;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const MAPREGION = {
    latitude: 19.432608,
    longitude: -99.133209,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
}

export const REGISTER_CATEGORIA = [
    'Restaurantes',
    'Shopping',
    'Viajes',
    'Talleres',
    'Mercados',
    'Deportes'
]

export const MISComentarios = [{
    title: 'Viajes',
    img: 'http://www.pngmart.com/files/7/Modern-Plane-PNG-Picture.png',
    color: '#a7ce38',
    full: true,
    content: [{
        img: 'https://media-cdn.tripadvisor.com/media/photo-s/0f/46/01/9b/kyo-kaiseki.jpg',
        name: 'Garufa',
        address: 'Excelente servicio, limpio, la comida deliciosa',
    },
    {
        img: 'https://airlinesfleet.com/wp-content/uploads/2018/09/United-Airlines-Aircraft-Fleet-Boeing-777-300ER-Polaris-Business-Class-Cabin-Inflight-Amenities-Food-Meal-Services-Menu-Photos-@rewardflying.jpg',
        name: 'Tierra Roja',
        address: 'Las bebidas no estaban frías, pero el servicio y la comida muy ricas, nos encantó el servicio',
        phone: '01 492 924 29 10',
        rating: 15
    }]
},
{
    title: 'Restaurantes',
    img: 'http://www.clipartquery.com/images/27/pics-photos-clipart-spoon-and-fork-BKPJrF.jpg',
    color: '#f26d03',
    full: false,
    content: [{
        img: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png',
        name: 'Garufa',
        address: 'Excelente servicio, limpio, la comida deliciosa',
    },
    {
        img: 'https://www.freepnglogos.com/uploads/eagle-png-logo/morehead-state-eagle-png-logo-8.png',
        name: 'Tierra Roja',
        address: 'Las bebidas no estaban frías, pero el servicio y la comida muy ricas, nos encantó el servicio',
        phone: '01 492 924 29 10',
        rating: 15
    }]
}

]

export const NOTIFIcaciones = [
    {
        avatar: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/08/09/10/istock-516799356.jpg',
        name: 'Garufa (3.8kms)',
        address: 'Botellas 2x1',
        title: '*Aplican Restricciones',
        note: 'Vigencia',
        time: '25 Feb - 28 Mar',
        color: '#f26d03',
    },
    {
        avatar: 'https://ak4.picdn.net/shutterstock/videos/15734434/thumb/8.jpg',
        name: 'El chopo (10kms)',
        address: '50% Análisis de Glucosa\n20% Química Sanguínea',
        title: '*Aplican Restricciones',
        note: 'Vigencia',
        time: '1 Mar - 28 Mar ',
        color: '#04afee',
    },
    {
        avatar: 'https://dailytimes.com.pk/assets/uploads/2018/11/21/howcuttingdo.jpg',
        name: 'Volaris (50kms)',
        address: '10% Viajes Nacionales',
        title: '',
        note: 'Vigencia',
        time: '15 Abr -1 May',
        color: '#a7ce38',
    },
]

export const RECIENTES = [
    { 
        name: 'Hoy',
        content: [
            {
                avatar: 'https://dailytimes.com.pk/assets/uploads/2018/11/21/howcuttingdo.jpg',
                name: 'Garufa (3.8kms)',
                address: 'Jardín Juárez, 135, Centro',
                title: '01 492 924 29 10',
                rate: 20,
                color: '#f26d03',
            },
            {
                avatar: 'https://dailytimes.com.pk/assets/uploads/2018/11/21/howcuttingdo.jpg',
                name: 'Tierra Roja (10kms)',
                address: 'José López Portillo, 224, Las Arboledas',
                title: '01 492 924 29 10',
                rate: 20,
                color: '#f26d03',
            }
        ]
    },
    { 
        name: 'Ayer',
        content: [
            {
                avatar: 'https://dailytimes.com.pk/assets/uploads/2018/11/21/howcuttingdo.jpg',
                name: 'Garufa (3.8kms)',
                address: 'Jardín Juárez, 135, Centro',
                title: '01 492 924 29 10',
                rate: 20,
                color: '#a8aaad'
            },
            {
                avatar: 'https://dailytimes.com.pk/assets/uploads/2018/11/21/howcuttingdo.jpg',
                name: 'Tierra Roja (10kms)',
                address: 'José López Portillo, 224, Las Arboledas',
                title: '01 492 924 29 10',
                rate: 20,
                color: '#a8aaad'
            }
        ]
    }
]

export const FAVORITOS = [{
    title: 'Deportes',
    img: 'https://www.trzcacak.rs/file/max/8/81410_basketball-player-png.png',
    color: '#3c8577',
    full: true,
},
{
    title: 'Restaurantes',
    img: 'http://www.clipartquery.com/images/27/pics-photos-clipart-spoon-and-fork-BKPJrF.jpg',
    color: '#f26d03',
    full: false,
    content: [{
        img: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png',
        name: 'Garufa',
        phone: '01 492 924 29 10',
        address: 'Jardín Juárez, 135, Centro',
    },
    {
        img: 'https://www.freepnglogos.com/uploads/eagle-png-logo/morehead-state-eagle-png-logo-8.png',
        name: 'Tierra Roja',
        address: 'José López Portillo, 224, Las Arboledas',
        phone: '01 492 924 29 10',
        rating: 15
    }]
}

]

export const CATEGORIES_CATEGORIA=[
    'Restaurantes',
    'Shopping',
    'Viajes',
    'Talleres',
    'Mercados',
    'Deportes'
]

export const CATEGORIES_SUBCATEGORIA=[
    'Shoes',
    'Wine',
    'Fitness',
    'Electronic',
    'Watch',
    'Computer',
    'Food'
]

export const CATEGORIES_HORARIOS=[
    '00 : 00 AM',
    '01 : 00 AM',
    '02 : 00 AM',
    '03 : 00 AM',
    '04 : 00 AM',
    '05 : 00 AM',
    '06 : 00 AM',
    '07 : 00 AM',
    '08 : 00 AM',
    '09 : 00 AM',
    '10 : 00 AM',
    '11 : 00 AM',
    '12 : 00 AM',
    '01 : 00 PM',
    '02 : 00 PM',
    '03 : 00 PM',
    '04 : 00 PM',
    '05 : 00 PM',
    '06 : 00 PM',
    '07 : 00 PM',
    '08 : 00 PM',
    '09 : 00 PM',
    '10 : 00 PM',
    '11 : 00 PM',
]

export const FAVORITOS2 = [{
    "idCategory": "CAT_G4S",
    "nameCategory": "Deportes",
    "imagen": "https://admin.quickb.mx/AppDelivery/Imagenes/CAT_G4S/M5K04Z5B87.png",
    "list": [{
        "idCategory": "CAT_G4S",
        "idNegocio": "4631894",
        "nombreNegocio": "SANTINO RESTAURANTE BAR",
        "distancia": "6.58",
        "direccion": "AVENIDA UNIVERSIDAD 201B INT LOMAS DEL PTROCINIO",
        "telefonos": "4924913300",
        "logo": "http://3.bp.blogspot.com/-Or24w3s6KXE/UmMkLjxV5hI/AAAAAAABHo8/b2jYEwPDQrI/s1600/wallpaper-28484.jpg",
        "rating": 0,
        "reviews": 0
    },{
        "idCategory": "CAT_G4S",
        "idNegocio": "4435334",
        "nombreNegocio": "FELIPE RESTAURANTE BAR",
        "distancia": "6.58",
        "direccion": "AVENIDA UNIVERSIDAD 201B INT LOMAS DEL PTROCINIO",
        "telefonos": "4924913300",
        "logo": "http://3.bp.blogspot.com/-Or24w3s6KXE/UmMkLjxV5hI/AAAAAAABHo8/b2jYEwPDQrI/s1600/wallpaper-28484.jpg",
        "rating": 0,
        "reviews": 0
    }]
  },{
    "idCategory": "CAT_EBT",
    "nameCategory": "Restaurantes",
    "imagen": "https://admin.quickb.mx/AppDelivery/Imagenes/CAT_W9O/H38KGMBE48.png",
    "list": [{
        "idCategory": "CAT_EBT",
        "idNegocio": "4631894",
        "nombreNegocio": "SANTINO RESTAURANTE BAR",
        "distancia": "6.58",
        "direccion": "AVENIDA UNIVERSIDAD 201B INT LOMAS DEL PTROCINIO",
        "telefonos": "4924913300",
        "logo": "http://3.bp.blogspot.com/-Or24w3s6KXE/UmMkLjxV5hI/AAAAAAABHo8/b2jYEwPDQrI/s1600/wallpaper-28484.jpg",
        "rating": 0,
        "reviews": 0
    }]
  }];