export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST allowed' });
  const { name, email, message } = req.body;
  console.log(`Contact from ${name} <${email}>: ${message}`);
  return res.status(200).json({ message: 'Thank you for reaching out! We will reply soon.' });
};