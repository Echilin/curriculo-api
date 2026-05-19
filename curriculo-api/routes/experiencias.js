const router = require('express').Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const r = await db.query('SELECT * FROM experiencias');
    res.json(r.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const r = await db.query('SELECT * FROM experiencias WHERE id=$1', [req.params.id]);
    res.json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { pessoa_id, empresa, cargo, inicio, fim, descricao } = req.body;
    const r = await db.query(
      'INSERT INTO experiencias(pessoa_id,empresa,cargo,inicio,fim,descricao) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
      [pessoa_id, empresa, cargo, inicio, fim, descricao]
    );
    res.status(201).json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const { pessoa_id, empresa, cargo, inicio, fim, descricao } = req.body;
    const r = await db.query(
      'UPDATE experiencias SET pessoa_id=$1,empresa=$2,cargo=$3,inicio=$4,fim=$5,descricao=$6 WHERE id=$7 RETURNING *',
      [pessoa_id, empresa, cargo, inicio, fim, descricao, req.params.id]
    );
    res.json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM experiencias WHERE id=$1', [req.params.id]);
    res.json({ message: 'Deletado com sucesso' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
