const eventSchema = require('../model/event.model');
const scheduleSchema = require('../model/schedule.model');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const createEvent = async (req, res) => {
    const data = req.body;

    let start = moment();
    let end = moment().add(90, 'd');

    var schedule = [];
    // Get "next" monday
    let tmp = start.clone().day(data.week_day);
    if (tmp.isAfter(start, 'd')) {
        schedule.push(tmp.format('YYYY-MM-DD'));
    }
    while (tmp.isBefore(end)) {
        tmp.add(7, 'days');
        schedule.push(tmp.format('YYYY-MM-DD'));
    }

    const decodeToken = jwt.verify(req.cookies.auth, '1234');
    data.email = decodeToken.au;

    const scheduleObj = {
        schedules: schedule,
        event_name: data.name,
        start_time: data.start_time,
        end_time: data.end_time,
        email: data.email
    }
    try {
        const dataRes = await eventSchema.create(data);
        await scheduleSchema.create(scheduleObj);
        return res.status(201).send({
            status: true,
            message: 'Event created successfully !',
            data: dataRes
        });
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        });
    }
}

const getSchedules = async (req, res) => {
    const token = req.query.token;
    const decodeToken = jwt.verify(req.cookies.auth, '1234');

    const schedulesRes = await scheduleSchema.find({
        email: decodeToken.au
    });

    if (!schedulesRes) {
        return res.status(404).send({
            status: false,
            message: 'Event not found'
        });
    }
    return res.status(200).send({
        status: true,
        message: 'Event fuound',
        data: schedulesRes
    });
}

module.exports = {
    createEvent,
    getSchedules
}