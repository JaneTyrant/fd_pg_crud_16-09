const { Thing } = require("../models");

module.exports.createThing = async (req, res, next) => {
    try {
        const { body } = req;
        const [newThing] = await Thing.create(body);
        if (!newThing) {
            return res.status(400).send();
        }
        return res.status(201).send(newThing);
    } catch (error) {
        next(error)
    }
}

module.exports.findAllThings = async (req, res, next) => {
    try {
        const things = await Thing.findAll();
        if (!things) {
            return res.status(400).send();
        }
        return res.status(200).send(things);
    } catch (error) {
        next(error)
    }
}

module.exports.findThingById = async (req, res, next) => {
    try {
        const {params: {idThing}} = req;
        const things = await Thing.findByPk(idThing);
        if (!things) {
            return res.status(400).send();
        }
        return res.status(200).send(things);
    } catch (error) {
        next(error)
    }
}

module.exports.deleteThingById = async (req, res, next) => {
    try {
        const {params: {idThing}} = req;
        const things = await Thing.deleteByPk(idThing);
        if (!things) {
            return res.status(400).send();
        }
        return res.status(200).send(things);
    } catch (error) {
        next(error)
    }
}

module.exports.updateThingById = async (req, res, next) => {
    try {
        const { body } = req;
        const {params: {idThing}} = req;
        const [thing] = await Thing.updateByPk(body, idThing);
        if (!thing) {
            return res.status(400).send();
        }
        return res.status(200).send(thing);
    } catch (error) {
        next(error)
    }
}