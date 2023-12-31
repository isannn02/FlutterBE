const { events, user, contacts } = require("../models");


class Contacts {
    static async getAllcontact(req, res, next) {
        try {
            const data = await contacts.findAll({
                attributes: {
                    exclude: ["updatedAt", "deletedAt"],
                },

            });

            if (data.length === 0) {
                return res.status(404).json({ errors: ["Comment Tidak ada"] });
            }

            res.status(200).json({ data });
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: ["Internal Server Error"] });
        }
    }

    static async updateContact(req, res, next) {
        try {
            // Comment Table Update Data

          

            const commentId = await contacts.findOne({
                where: { id: req.params.id },
            });
          

            // if (commentId.userId !== req.userData.id) {
            //     return res
            //         .status(401)
            //         .json({ errors: ["You do not have permission to access this!"] });
            // }

            const updatedData = await contacts.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });

            // If no data updated
            if (updatedData[0] === 0) {
                return res.status(404).json({ errors: ["Contact tidak di temukan"] });
            }

            // const updateComment = await comments.findOne(
            //     {
            //         eventId: req.body.eventId,
            //         userId: req.userData.id,
            //         comment: req.body.id,
            //     },
            //     { where: { id: req.params.id } }
            // );
            const data = await contacts.findOne({
                where: { id: req.params.id },
            });

            res.status(201).json({ data, message: ["Sukes Update Contact"] });
        } catch (error) {
            next(error);
        }
    }
    // static async getDetailComment(req, res, next) {
    //     try {
    //         var todayStart = new Date().setHours(0, 0, 0, 0);
    //         var now = new Date().setHours(24, 0, 0, 0);

    //         const data = await comments.findOne({
    //             where: { id: req.params.id },
    //         });

    //         if (!data) {
    //             return res.status(404).json({ errors: ["Comment is empty"] });
    //         }
    //         console.log(waktu);
    //         console.log(commentTime);

    //         res.status(200).json({ data });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ errors: ["Internal Server Error"] });
    //     }
    // }

    static async createContact(req, res, next) {
        try {
            const userId = req.userData.id;
            // console.log(userId,"user idnya")
            await contacts.create({


                nama: req.body.nama,
                photo: req.body.photo,
                no_hp: req.body.no_hp
            });
            // console.log(newData,"new data")

            // const data = await comments.findOne({
            //     where: {
            //         id: newData.id,
            //     },

            //     include: [
            //         {
            //             model: user,
            //             attributes: ["id", "name"],
            //         },

            //     ],
            // });

            res.status(201).json({

                message: ["Anda berhasil menambahkan event"],
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: ["Internal Server Error"] });
        }
    }

    // static async deleteComment(req, res, next) {
    //     try {
    //         const deleteId = await comments.findOne({
    //             where: { id: req.params.id },
    //         });
    //         // console.log(deleteId);

    //         if (deleteId.userId !== req.userData.id) {
    //             return res
    //                 .status(401)
    //                 .json({ errors: ["You do not have permission to access this!"] });
    //         }
    //         let data = await comments.destroy({ where: { id: req.params.id } });

    //         if (!data) {
    //             return res.status(404).json({ errors: ["Comment not found"] });
    //         }

    //         res
    //             .status(200)
    //             .json({ data: data, message: ["Success delete your comment!"] });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ errors: ["Internal Server Error"] });
    //     }
    // }
}

module.exports = Contacts;
