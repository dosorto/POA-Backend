const db = require("../models/");
const empleadoModel = require("../models/empleado.model");
const roleModelb = require("../models/role.model");
const userModel = require("../models/usuario.model");
const PEIModel = require("../models/PEI.model");
const bcrypt = require("bcryptjs");
const config = require("./auth.config.js");
const { DB } = require("./db.config");
const Role = db.role;
const User = db.user;
const Empleado = db.empleado;
const PEI = db.PEI;
//const Sesion = db.sesion;



exports.initial = async () => {
    try {
        

        await Role.create({
            id: 1,
            rol: "admin",
            descripcion: "super usuario",
        });

        await PEI.create({
            name: "Mantenimiento general",
            initialYear:'2020-08-07',
            finalYear:'2020-09-08',
        });
        
        await Empleado.create({
            id: 1,
            dni: "02012",
            nombre: "root",
            apellido: "root",
            direccion: "La libertad",
            telefono: "123",
            fechaNacimiento:'1995-08-07',
            sexo: "M",
        });
        
        await User.create({
            username: "root",
            password: bcrypt.hashSync(config.secret, 8),
            idEmpleado: 1,
            idRol: 1
        });
        } catch (error) {
            console.log(error);
        }


    };