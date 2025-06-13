import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { title, description, content, imageUrl, author, category } = req.body;

    // Validate input
    if (!title || !description || !content || !imageUrl || !author || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const article = await prisma.article.create({
      data: {
        title,
        description,
        content,
        imageUrl,
        author,
        category
      }
    });

    return res.status(201).json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}