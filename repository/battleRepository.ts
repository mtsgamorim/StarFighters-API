import connection from "../database.js";

export async function findUser(username: string) {
  const user = await connection.query(
    `SELECT * FROM fighters WHERE username = $1`,
    [username]
  );
  return user.rows[0];
}

export async function createUser(username: string) {
  console.log("entrei aqui");
  await connection.query(
    `INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, 0, 0, 0)`,
    [username]
  );
}

export async function updateUser(username: string, column: string) {
  await connection.query(
    `UPDATE fighters SET ${column} = ${column} + 1 WHERE username = $1`,
    [username]
  );
}

export async function getAll() {
  const result = await connection.query(
    "SELECT * FROM fighters ORDER BY wins DESC, draws DESC"
  );
  return result.rows;
}
