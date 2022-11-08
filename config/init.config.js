const db = require("../models/");
const empleadoModel = require("../models/empleado.model");
const roleModelb = require("../models/role.model");
const userModel = require("../models/usuario.model");
const permisoModel = require("../models/permiso.model");
const PEIModel = require("../models/PEI.model");
const areasModel = require("../models/areas.model");
const bcrypt = require("bcryptjs");
const config = require("./auth.config.js");
const { DB } = require("./db.config");
const { roles_permiso } = require("../models/");
const Role = db.role;
const User = db.user;
const Empleado = db.empleado;
const Permiso = db.permiso;
const PEI = db.pei;
const Areas = db.areas;
const permiso_role = db.roles_permiso;
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

        await PEI.create({
            name: "Mantenimiento general",
            initialYear: '2020-08-07',
            finalYear: '2020-09-08',
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
            descripcion:"IS",
            idDimension: 1,
            idPei:1
        })

        await db.areas.create({
            nombre:"Area 1",
            idObjetivos: 1,
            idDimension: 1,
            idPei: 1
        })

        await db.resultado.create({
            nombre: "Resultado 1",
            descripcion: "Desripción 1",
            idArea: 1,
            idObjetivos: 1,
            idDimension: 1,
            idPei: 1
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
            email: "cjso0323@gmail.com",
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

        

        /// CATALOGO DE OBJETO DEL GASTO

        await db.grupogasto.bulkCreate([{
            nombre: "Insumos",
            identificador: 3000
        },
        {
            nombre: "Insumos",
            identificador: 3000
        },
        {
            nombre: "Insumos",
            identificador: 3000
        },
        {
            nombre: "Insumos",
            identificador: 3000
        },
        {
            nombre: "Insumos",
            identificador: 3000
        }]);
        ///Grupo del gasto
        await db.objetogasto.bulkCreate([{
            nombre: "Gasolina",
            identificador: 30001,
            idgrupo:1
        },
        {
            nombre: "Gasolina",
            identificador: 30001,
            idgrupo:1
        },
        {
            nombre: "Gasolina",
            identificador: 30001,
            idgrupo:1
        },
        {
            nombre: "Gasolina",
            identificador: 30001,
            idgrupo:1
        },
        {
            nombre: "Gasolina",
            identificador: 30001,
            idgrupo:1
        }]);

    } catch (error) {
        console.log(error);
    }


};
