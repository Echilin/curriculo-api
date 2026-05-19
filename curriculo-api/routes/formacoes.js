const router = require('express').Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const r = await db.query('SELECT * FROM formacoes');
    res.json(r.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const r = await db.query('SELECT * FROM formacoes WHERE id=$1', [req.params.id]);
    res.json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { pessoa_id, instituicao, curso, nivel, inicio, fim } = req.body;
    const r = await db.query(
      'INSERT INTO formacoes(pessoa_id,instituicao,curso,nivel,inicio,fim) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
      [pessoa_id, instituicao, curso, nivel, inicio, fim]
    );
    res.status(201).json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const { pessoa_id, instituicao, curso, nivel, inicio, fim } = req.body;
    const r = await db.query(
      'UPDATE formacoes SET pessoa_id=$1,instituicao=$2,curso=$3,nivel=$4,inicio=$5,fim=$6 WHERE id=$7 RETURNING *',
      [pessoa_id, instituicao, curso, nivel, inicio, fim, req.params.id]
    );
    res.json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM formacoes WHERE id=$1', [req.params.id]);
    res.json({ message: 'Deletado com sucesso' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
