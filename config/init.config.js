const db = require("../models/puntoDeVentas");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config.js");
const { DB } = require("./db.config");
const Role = db.role;
const User = db.user;
const Empleado = db.empleado;
const Sesion = db.sesion;



exports.initial = async () => {
    try {
        const existeRol = await Role.count();
        if (existeRol !== 0) {
            return existeRol;
        }

        const role = await Role.create({
            id: 1,
            rol: "admin",
            descripcion: "super usuario",
        });
       /*const role2 = await Role.create({
            id: 2,
            rol: "Coordinador",
            descripcion: "Super usuario Empleados",
        });*/
        
        await Empleado.create({
            id: 1,
            dni: "02012",
            nombre: "root",
            apellido: "root",
            direccion: "La libertad",
            telefono: "123",
            fechaNacimiento: Date("2002-20-2"),
            sexo: "M",
        });
        await User.create({
            usuario: "root",
            password: bcrypt.hashSync(config.secret, 8),
            email: "root@soft.com",
            idEmpleado: 1,
            idRol: 1
        });
        } catch (error) {
            console.log(error);
        }


    };