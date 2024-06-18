import { IProducto } from "../interfaces/producto.interface";
import { Producto } from "../models/producto";


const getAllProductos = async () => {
    const productos = await Producto.find();
    if (!productos) return { status: 404, message: "Productos no encontrados" };
    else return { status: 200, data: productos };
}

const createProducto = async (producto: IProducto) => {
  const productoExistente = await Producto.findOne({
    where: { nombre: producto.nombre },
  });
  if (productoExistente) return { status: 400, message: "Producto ya existe" };

  const newProducto = Producto.create({
    nombre: producto.nombre,
    precio: producto.precio,
    stock: producto.stock,
    descripcion: producto.descripcion,
    imagen: producto.imagen,
  });

  const saveProducto = await Producto.create(newProducto);
  return { status: 200, data: saveProducto };
};

const updateProducto = async (id: string, body: IProducto) => {

    const producto = await Producto.findOne({ where: { productoid: Number(id) } });
    if (!producto) return { status: 404, message: "Producto no encontrado" };
    
    producto.nombre = body.nombre;
    producto.precio = body.precio;
    producto.stock = body.stock;
    producto.descripcion = body.descripcion;
    producto.imagen = body.imagen;
    
    await producto.save();
    return { status: 200, data: producto };
};

const deleteProducto = async (id: string) => {
    const producto = await Producto.findOne({ where: { productoid: Number(id) } });
    if (!producto) return { status: 404, message: "Producto no encontrado" };
    else {
        await producto.remove();
        return { status: 200, message: "Producto eliminado" };
    }
}





export { createProducto, updateProducto, deleteProducto, getAllProductos};
