app.get('/leaderboard/top100', async (req, res) => {
    try {
      const [rows] = await pool.query(`
        SELECT id, name, points
        FROM users
        ORDER BY points DESC
        LIMIT 100
      `);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
app.get('/leaderboard/top10', async (req, res) => {
    try {
      const [rows] = await pool.query(`
        SELECT id, name, points
        FROM lastyeartop10users
        ORDER BY points DESC
        LIMIT 10
      `);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  