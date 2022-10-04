const db = require("../models/");
const empleadoModel = require("../models/empleado.model");
const roleModelb = require("../models/role.model");
const userModel = require("../models/usuario.model");
const bcrypt = require("bcryptjs");
const config = require("./auth.config.js");
const { DB } = require("./db.config");
const Role = db.role;
const User = db.user;
const Empleado = db.empleado;
const PEI = db.pei;
const Area = db.area;
const Objetivos = db.objetivos;
const Dimension = db.dimension;
const Resultados = db.resultado;
//const Sesion = db.sesion;

exports.initial = async () => {
    try {
        

        await Role.create({
            id: 1,
            rol: "admin",
            descripcion: "super usuario",
        });

        await db.institucion.create({
            nombre:'CURLP',
            descripcion:'Centro regional'
        })
        

        await db.pei.create({
            name:'UNAH1',
            initialYear:'2020-01-01',
            finalYear:'2022-01-01',
            isActive:1,
        })

        await db.dimension.create({
            nombre:'Dimension 1',
            descripcion:'descripcion 1',
            idPei:1
        })
        
        await db.objetivos.create({
            nombre:"IS",
            idDimension: 1,
            idPei:1
        })
        await Empleado.create({
            id: 1,
            dni: "02012",
            nombre: "root",
            apellido: "root",
            direccion: "La libertad",
            telefono: "123",
            fechaNacimiento:'1995-08-07',
            sexo: "M",
            idInstitucion:1
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