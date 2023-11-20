const { nutritions} = require("../models");


class Nutrition {
    static async getAllNutrition(req, res, next) {
        try {
            const data = await nutritions.findAll({
                attributes: {
                    exclude: ["updatedAt", "deletedAt"],
                },

            });

            if (data.length === 0) {
                return res.status(404).json({ errors: ["Comment not found"] });
            }

            res.status(200).json({ data });
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: ["Internal Server Error"] });
        }
    }

    static async updateNutrition(req, res, next) {
        try {
            // Comment Table Update Data

          

            const commentId = await nutritions.findOne({
                where: { id: req.params.id },
            });
          

            // if (commentId.userId !== req.userData.id) {
            //     return res
            //         .status(401)
            //         .json({ errors: ["You do not have permission to access this!"] });
            // }

            const updatedData = await nutritions.update(req.body, {
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
            const data = await nutritions.findOne({
                where: { id: req.params.id },
            });

            res.status(201).json({ data, message: ["Sukes Update Nutritions"] });
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

    static async createNutrition(req, res, next) {
        try {
            const userId = req.userData.id;
            // console.log(userId,"user idnya")
            await nutritions.create({


                name: req.body.name,
                photo: req.body.photo,
                link: req.body.link
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

                message: ["Anda berhasil menambahkan Nutritions"],
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

module.exports = Nutrition;
