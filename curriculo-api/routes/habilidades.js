const router = require('express').Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const r = await db.query('SELECT * FROM habilidades');
    res.json(r.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const r = await db.query('SELECT * FROM habilidades WHERE id=$1', [req.params.id]);
    res.json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { pessoa_id, nome, nivel } = req.body;
    const r = await db.query(
      'INSERT INTO habilidades(pessoa_id,nome,nivel) VALUES($1,$2,$3) RETURNING *',
      [pessoa_id, nome, nivel]
    );
    res.status(201).json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const { pessoa_id, nome, nivel } = req.body;
    const r = await db.query(
      'UPDATE habilidades SET pessoa_id=$1,nome=$2,nivel=$3 WHERE id=$4 RETURNING *',
      [pessoa_id, nome, nivel, req.params.id]
    );
    res.json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM habilidades WHERE id=$1', [req.params.id]);
    res.json({ message: 'Deletado com sucesso' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
