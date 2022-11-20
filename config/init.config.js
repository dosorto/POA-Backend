const db = require("../models/");
const empleadoModel = require("../models/empleado.model");
const roleModelb = require("../models/role.model");
const userModel = require("../models/usuario.model");
const permisoModel = require("../models/permiso.model");
const PEIModel = require("../models/PEI.model");
const areasModel = require("../models/areas.model");
const ActividadModel = require("../models/actividad.model");
const ActividaEncargadodModel = require("../models/actividadEncargado.model");
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
            nombre: 'CURLP',
            descripcion: 'Centro regional'
        })


        await db.pei.create({
            name: 'UNAH1',
            initialYear: '2020-01-01',
            finalYear: '2022-01-01',
            isActive: 1,
        })

        await db.dimension.create({
            nombre: 'Dimension 1',
            descripcion: 'descripcion 1',
            idPei: 1
        })

        await db.objetivos.create({
            nombre: "IS",
            descripcion: "IS",
            idDimension: 1,
            idPei: 1
        })

        await db.areas.create({
            nombre: "Area 1",
            idObjetivos: 1,
            idDimension: 1,
            idPei: 1
        })

        await db.resultado.create({
         
            nombre: "Resultado 1",
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
            fechaNacimiento: '1995-08-07',
            sexo: "M",
            idInstitucion: 1
        });

        await User.create({
            email: "cjso0323@gmail.com",
            username: "root",
            password: bcrypt.hashSync(config.secret, 8),
            idEmpleado: 1,
            idRol: 1
        });
     
        await db.actividad.create({
            nombre: 'Arreglo 1',
            descripcion: 'prueba',
            estado: 'FORMULACION',
            tipoActividad: 'ACADEMICA',
            categoria: 'COORDINACION',
            idResultado: 1,
         
        });
      

        //Agregue tabla catalogo de permisos
        await Permiso.bulkCreate([{
            Permiso: "All_User",
            Descripcion: "Permite al usuario acceder a todo el sistema."
        },
        {
            Permiso: "Crear_PEI",
            Descripcion: "Permite crear PEI."
        },
        {
            Permiso: "Actualizar_PEI",
            Descripcion: "Permite actualizar."
        },
        {
            Permiso: "Deshabilitar_PEI",
            Descripcion: "Permite deshabilitar PEI."
        },
        {
            Permiso: "Gestionar_POA"
        },
        {
            Permiso: "Crear_POA",
            Descripcion: "Permite crear POA."
        },
        {
            Permiso: "Deshabilitar_POA",
            Descripcion: "Permite deshabilitar POA."
        },
        {
            Permiso: "Actualizar_POA",
            Descripcion: "Permite actualizar POA."
        },
        {
            Permiso: "Gestion_Institucion",
        },
        {
            Permiso: "Gestion_Usuario",
            Descripcion: "Permite al usuario editar."
        },
        {
            Permiso: "Gestion_Mis_POAS",
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
        },
        {
            idRol: 1,
            idPermiso: 4
        }])

    } catch (error) {
        console.log(error);
    }













    
};
