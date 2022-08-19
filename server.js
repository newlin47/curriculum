const express = require('express');
const app = express();
const { conn, Author, Book, Publisher } = require('./db');

const init = async () => {
	try {
		await conn.sync({ force: true });
		const [nieto, freire, delpit] = await Promise.all([
			Author.create({ name: 'Sonia Nieto' }),
			Author.create({ name: 'Paulo Freire' }),
			Author.create({ name: 'Lisa Delpit' }),
		]);
		const [penguin, scholastic] = await Promise.all([
			Publisher.create({ company_name: 'Penguin Classics' }),
			Publisher.create({ company_name: 'Scholastic' }),
		]);
		const bookData = [
			{
				title:
					'Affirming Diversity: The Sociopolitical Context of Multicultural Education',
				authorId: nieto.id,
				publisherId: scholastic.id,
				synopsis:
					'Nieto reviews current research methods showing how the affirmation of diverse learners leads to better outcomes. By acknowledging the strengths each learner brings to the classroom, teachers are able to accelerate their learning. Nieto puts forth a strong case for multicultural education with case studies, school reform narratives, and cross-cultural research.',
			},
			{
				title:
					'Language, Culture, and Teaching: Critical Perspectives for a New Century ',
				authorId: nieto.id,
				publisherId: scholastic.id,
				synopsis:
					'Nieto summarizes current research on the critical role cultures and cultural bias plays in the inequitable outcomes seen in students.',
			},
			{
				title: 'Pedagogy of the Oppressed',
				authorId: freire.id,
				publisherId: penguin.id,
				synopsis:
					'Freire proposes a radical shift in educational practices for the working classes in this seminal work. Critiquing traditional teaching as dehumanizing, in the way it treats students as empty vessels to be filled with knowledge, Freire proposes a shift in the relationship between teacher and student. Based on his work with adult literacy programs in Brazil, this text is one of the most cited works in all of the social sciences.',
			},
			{
				title: 'Conscientization',
				authorId: freire.id,
				publisherId: penguin.id,
				synopsis:
					'Freire details the phenomenon of critical consciousness, particularly the critical lens needed to view and then act on necessary changes in society.',
			},
			{
				title: "Other People's Children",
				authorId: delpit.id,
				publisherId: scholastic.id,
				synopsis:
					'Delpit critiques the modern school system through a racial, social, and economic lens, arguing that classroom teachers must be trained explicitly to confront prejudices, biases, racism, sexism, and classism. A modern classic among educators.',
			},
		];
		await Promise.all(bookData.map((text) => Book.create(text)));
		const port = process.env.PORT || 3000;
		app.listen(port, () => console.log(`listening on port ${port}`));
	} catch (ex) {
		console.log(ex);
	}
};

init();
