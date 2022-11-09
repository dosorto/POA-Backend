const db = require("../models/");
const bcrypt = require("bcryptjs");
const config = require("./auth.config.js");


//const Sesion = db.sesion;


exports.initial = async () => {
    try {


        await db.role.create({
            id: 1,
            rol: "admin",
            descripcion: "super usuario",
        });

        await db.institucion.create({
            nombre:'CURLP',
            descripcion:'Centro regional'
        })

        await db.pei.create({
            name: "Mantenimiento general",
            initialYear: '2020-08-07',
            finalYear: '2020-09-08',
            isActive:1,
            idInstitucion: 1
        });

        
        

        // await db.pei.create({
        //     name:'UNAH1',
        //     initialYear:'2020-01-01',
        //     finalYear:'2022-01-01',
        //     isActive:1,
        // })

        await db.dimension.create({
            nombre:'Dimension 1',
            descripcion:'descripcion 1',
            idPei:1
        })

        await db.objetivos.create({
            nombre: "IS",
            descripcion:"objetivo descripcion",
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

        await db.empleado.create({
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
        
        await db.user.create({
            email: "cjso0323@gmail.com",
            username: "root",
            password: bcrypt.hashSync(config.secret, 8),
            idEmpleado: 1,
            idRol: 1
        });

        //Agregue tabla catalogo de permisos
        await db.permiso.bulkCreate([{
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

        await db.roles_permiso.bulkCreate([{
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
