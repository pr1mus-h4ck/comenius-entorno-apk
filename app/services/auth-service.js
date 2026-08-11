import { post } from "../api/api";
import { API } from "../api/endpoints";

export async function login(correo, contrasena) {

  return await post(API.LOGIN, {

    correo,

    contrasena,

  });

}