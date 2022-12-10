const router = require("express").Router();

const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/")
	.get(controller.list)
	.post(controller.create)
	.all(methodNotAllowed);

router.route("/:table_id/seat/")
	.put(controller.seat)
	.all(methodNotAllowed);

router.delete('/:table_id/seat/', controller.unseat);

module.exports = router;
