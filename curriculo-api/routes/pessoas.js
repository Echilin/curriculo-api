const router = require('express').Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const r = await db.query('SELECT * FROM pessoas');
    res.json(r.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const r = await db.query('SELECT * FROM pessoas WHERE id=$1', [req.params.id]);
    res.json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { nome, email, telefone, linkedin, resumo } = req.body;
    const r = await db.query(
      'INSERT INTO pessoas(nome,email,telefone,linkedin,resumo) VALUES($1,$2,$3,$4,$5) RETURNING *',
      [nome, email, telefone, linkedin, resumo]
    );
    res.status(201).json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const { nome, email, telefone, linkedin, resumo } = req.body;
    const r = await db.query(
      'UPDATE pessoas SET nome=$1,email=$2,telefone=$3,linkedin=$4,resumo=$5 WHERE id=$6 RETURNING *',
      [nome, email, telefone, linkedin, resumo, req.params.id]
    );
    res.json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM pessoas WHERE id=$1', [req.params.id]);
    res.json({ message: 'Deletado com sucesso' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
