const db = require("../models");

//Funcion para crear una nueva Institucion
const new_departamento = async (req, res) => {
    try {
        const ue = await db.ue.findOne({ where: { id: req.body.idUE } })
        if (!ue) {
            return res.status(400).json({ message: 'Departamento incorrecto' });
        }
        await db.depto.create({
            name: req.body.name,
            descripcion: req.body.descripcion,
            idUE: ue.id
        });
        return res.status(200).json({ status: "Ok" });
    } catch (error) {
        return res.status(500).json({ status: "Server Error: " + error });
    }
}

// Funcion para obtener una unica departamento
const get_all_departamento = async (req, res) => {
    try {
        const all_depto = await db.depto.findAll({
            where: { isDelete: false },
            include: [{
                model: db.ue,
            }]
        });
        if (!all_depto) {
            return res.status(404).send({ message: 'no hay ningun elemento' });
        }
        return res.status(200).json(all_depto);
    } catch (error) {
        return res.status(500).json({ status: "Server Error: " + error });
    }
}
//Funcion para obtener todas las departamento
const get_all_departamento_UE = async (req, res) => {
    try {
        const all_deptos = await db.depto.findAll(
            {
                where: {
                    isDelete: false,
                    idUE: req.params.idUE
                },
                include: db.ue
            }
        );
        if (!all_deptos) {
            return res.status(404).send({ message: 'No hay ningún elemento' });
        }
        return res.status(200).json(all_deptos);
    } catch (error) {
        return res.status(500).json({ status: "Server Error: " + error });
    }
}

// Funcion para actualizar un departamento
const update_departamento = async (req, res) => {
    try {
        const depto = await db.depto.findByPk(req.body.id);
        if (!depto) {
            return res.status(404).send({ message: 'Departamento not found' })
        }
        await db.depto.update({
            name: req.body.name,
            descripcion: req.body.descripcion,
            idUE: req.body.idUE
        }, { where: { id: req.body.id } })
        return res.status(200).send({ message: "ok" });
    } catch (error) {
        res.status(500).json({
            message: 'error al actualizar ' + error
        })
    }
}

//Funcion para deshabilitar una departamento

const disable_departamento = async (req, res) => {
    try {
        const temporally = await db.depto.update({
            isDelete: true
        }, {
            where: {
                name: req.body.name
            }
        });
        if (temporally) {
            res.status(200).send({
                message: "Departamento eliminado con exito"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "Server Error: " + error });
    }
}

module.exports = {
    new_departamento,
    get_all_departamento,
    disable_departamento,
    update_departamento,
    get_all_departamento_UE
}