const { comments, events, user } = require("../models");
const moment = require("moment");

class Comments {
    static async getAllComments(req, res, next) {
        try {
            const data = await comments.findAll({
                attributes: {
                    exclude: ["updatedAt", "deletedAt"],
                },
                include: [
                    {
                        model: user,
                        attributes: ["id", "name"],
                    },

                ],
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

    static async updateComment(req, res, next) {
        try {
            // Comment Table Update Data

            const commentId = await comments.findOne({
                where: { id: req.params.id },
            });


            if (commentId.userId !== req.userData.id) {
                return res
                    .status(401)
                    .json({ errors: ["You do not have permission to access this!"] });
            }

            const updatedData = await comments.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });

            // If no data updated
            if (updatedData[0] === 0) {
                return res.status(404).json({ errors: ["Comment not found"] });
            }

            const updateComment = await comments.findOne(
                {
                    eventId: req.body.eventId,
                    userId: req.userData.id,
                    comment: req.body.id,
                },
                { where: { id: req.params.id } }
            );
            const data = await events.findOne({
                where: { id: req.params.id },
            });

            res.status(201).json({ data, message: ["Succes Update Your Comment"] });
        } catch (error) {
            next(error);
        }
    }
    static async getDetailComment(req, res, next) {
        try {
            var todayStart = new Date().setHours(0, 0, 0, 0);
            var now = new Date().setHours(24, 0, 0, 0);

            const data = await comments.findOne({
                where: { id: req.params.id },
            });

            if (!data) {
                return res.status(404).json({ errors: ["Comment is empty"] });
            }
            console.log(waktu);
            console.log(commentTime);

            res.status(200).json({ data });
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: ["Internal Server Error"] });
        }
    }

    static async createComment(req, res, next) {
        try {
            const userId = req.userData.id;
            // console.log(userId,"user idnya")
            const newData = await comments.create({
                id:req.body.id,
                userId:userId,
                comment:req.body.comment,
                rating:req.body.rating
            });
            // console.log(newData,"new data")

            const data = await comments.findOne({
                where: {
                    id: newData.id,
                },

                include: [
                    {
                        model: user,
                        attributes: ["id", "name"],
                    },

                ],
            });

            res.status(201).json({
                data: data,
                message: ["Anda berhasil menambahkan komen"],
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: ["Internal Server Error"] });
        }
    }

    static async deleteComment(req, res, next) {
        try {
            const deleteId = await comments.findOne({
                where: { id: req.params.id },
            });
            // console.log(deleteId);

            if (deleteId.userId !== req.userData.id) {
                return res
                    .status(401)
                    .json({ errors: ["You do not have permission to access this!"] });
            }
            let data = await comments.destroy({ where: { id: req.params.id } });

            if (!data) {
                return res.status(404).json({ errors: ["Comment not found"] });
            }

            res
                .status(200)
                .json({ data: data, message: ["Success delete your comment!"] });
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: ["Internal Server Error"] });
        }
    }
}

module.exports = Comments;
