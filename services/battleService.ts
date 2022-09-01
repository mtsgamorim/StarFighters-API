import axios from "axios";
import * as battleRepository from "../repository/battleRepository.js";

export async function battleService(user1: string, user2: string) {
  const infoUser1: any = await axios.get(
    `https://api.github.com/users/${user1}/repos`
  );
  const infoUser2: any = await axios.get(
    `https://api.github.com/users/${user2}/repos`
  );
  if (!infoUser1 || !infoUser2) {
    throw "Usuarios não sao do github";
  }
  let user1InDB = await battleRepository.findUser(user1);
  let user2InDB = await battleRepository.findUser(user2);

  if (!user1InDB) {
    battleRepository.createUser(user1);
    user1InDB = await battleRepository.findUser(user1);
  }

  if (!user2InDB) {
    battleRepository.createUser(user2);
    user2InDB = await battleRepository.findUser(user2);
  }
  console.log(infoUser1.data[0].stargazers_count);
  if (
    infoUser1.data[0].stargazers_count === infoUser2.data[0].stargazers_count
  ) {
    battleRepository.updateUser(user1, "draws");
    battleRepository.updateUser(user2, "draws");
    return {
      winner: null,
      loser: null,
      draw: true,
    };
  } else if (
    infoUser1.data[0].stargazers_count > infoUser2.data[0].stargazers_count
  ) {
    battleRepository.updateUser(user1, "wins");
    battleRepository.updateUser(user2, "losses");
    return {
      winner: user1,
      loser: user2,
      draw: false,
    };
  } else {
    battleRepository.updateUser(user2, "wins");
    battleRepository.updateUser(user1, "losses");
    return {
      winner: user2,
      loser: user1,
      draw: true,
    };
  }
}
export async function getAll() {
  const response = await battleRepository.getAll();
  return response;
}
