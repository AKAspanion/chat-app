import express from 'express';

const app = express();

const port = 8021;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
