import { Categoria } from "../models/categoria";

const categorias : Categoria[] = [
    new Categoria(1,'Desayuno', 'Recetas deliciosas para comenzar el día con energía', 'https://res.cloudinary.com/djsl4a5py/image/upload/v1700707337/RecetaSabia/Categorias_img/Breakfast_ijaofo.png'),
    new Categoria(2,'Almuerzo', 'Platos principales para disfrutar durante el almuerzo', 'https://res.cloudinary.com/djsl4a5py/image/upload/v1700707337/RecetaSabia/Categorias_img/Lunch_rwd136.png'),
    new Categoria(3,'Cena', 'Ideas para cenas ligeras y sabrosas', 'https://res.cloudinary.com/djsl4a5py/image/upload/v1700707337/RecetaSabia/Categorias_img/Dinner_rnxxj1.png'),
    new Categoria(4,'Postres', 'Dulces y postres para satisfacer tu lado más goloso', 'https://res.cloudinary.com/djsl4a5py/image/upload/v1700707337/RecetaSabia/Categorias_img/Desserts_bsr0xn.png'),
    new Categoria(5,'Vegetariano', 'Recetas sin carne para aquellos que prefieren una dieta vegetariana', 'https://res.cloudinary.com/djsl4a5py/image/upload/v1700707337/RecetaSabia/Categorias_img/Vegetarian_l0ck3l.png'),
    new Categoria(6,'Vegano', 'Platos libres de productos de origen animal', 'https://res.cloudinary.com/djsl4a5py/image/upload/v1700707337/RecetaSabia/Categorias_img/Vegan_ixe1dd.png'),
    new Categoria(7,'Saludable', 'Recetas equilibradas y saludables para cuidar tu bienestar', 'https://res.cloudinary.com/djsl4a5py/image/upload/v1700707337/RecetaSabia/Categorias_img/Healthy_auf4tf.png'),
    new Categoria(8,'Internacional', 'Descubre sabores de todo el mundo con estas recetas', 'https://res.cloudinary.com/djsl4a5py/image/upload/v1700707337/RecetaSabia/Categorias_img/World_b4ilng.png')
]

export {
    categorias
}