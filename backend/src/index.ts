import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

app.get('/api/deepseek', async (req: Request, res: Response) => {
	try {
		const { message } = req.body;
		const URL = process.env.DEEPSEEK_API_URL;
		const response = await axios.post(
			`${URL}`,
			{
				model: 'deepseek-r1',
				message,
				temperature: 0.7,
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
					'Content-Type': 'application/json',
				},
			},
		);
		res.json(response.data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: (error as Error).message });
	}
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
