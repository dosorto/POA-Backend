const db = require("../models/");
const empleadoModel = require("../models/empleado.model");
const roleModelb = require("../models/role.model");
const userModel = require("../models/usuario.model");
const permisoModel = require("../models/permiso.model");
const PEIModel = require("../models/PEI.model");
const bcrypt = require("bcryptjs");
const config = require("./auth.config.js");
const { DB } = require("./db.config");
const { roles_permiso } = require("../models/");
const Role = db.role;
const User = db.user;
const Empleado = db.empleado;
const Permiso = db.permiso;
const permiso_role = db.roles_permiso;
const PEI = db.pei;
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
            initialYear: '2020-08-07',
            finalYear: '2020-09-08',
        });


        await Empleado.create({
            id: 1,
            dni: "02012",
            nombre: "root",
            apellido: "root",
            direccion: "La libertad",
            telefono: "123",
            fechaNacimiento: '1995-08-07',
            sexo: "M",
        });
        
        await User.create({
            username: "root",
            password: bcrypt.hashSync(config.secret, 8),
            idEmpleado: 1,
            idRol: 1
        });

        //Agregue tabla catalogo de permisos
        await Permiso.bulkCreate([{
            Permiso: "All_User",
            Descripcion: "Permite al usuario acceder a todo el sistema."
        },
        {
            Permiso: "Delete_User",
            Descripcion: "Permite al usuario eliminar."
        },
        {
            Permiso: "Create_User",
            Descripcion: "Permite al usuario crear."
        },
        {
            Permiso: "Read_User",
            Descripcion: "Permite al usuario solamente leer."
        },
        {
            Permiso: "Update_User",
            Descripcion: "Permite al usuario editar."
        }]);

        await roles_permiso.bulkCreate([{
            idRol: 1,
            idPermiso: 1
        },
        {
            idRol: 1,
            idPermiso: 2
        },
        {
            idRol: 1,
            idPermiso: 3
        }])

    } catch (error) {
        console.log(error);
    }


};
