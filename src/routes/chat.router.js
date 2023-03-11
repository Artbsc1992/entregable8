const router = require('express').Router();
const MessageManager = require('../dao/chatManager.mongo');

const chatManager = new MessageManager();

router.post('/', async (req, res) => {
	try {
		const { user, message } = req.body;
		await chatManager.addMessage(user, message);
		res.status(200).json({ message: 'Message added successfully' });
	} catch (error) {
		res.status(400).json({ message: '[!] Email validation error.' })
	}
});

router.get('/', async (req, res) => {
	const messages = await chatManager.getMessages();
	res.render('chat', { messages });
});

module.exports = router;
