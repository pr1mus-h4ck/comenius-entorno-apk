import { router } from "expo-router";

export function irLogin() {
  router.replace("/login");
}

export function irOtp() {
  router.replace("/otp");
}

export function irInicio() {
  router.replace("/(tabs)/inicio");
}

export function irMateria() {
  router.push("/materia");
}

export function irTrabajo() {
  router.push("/trabajo");
}

export function irNotificaciones() {
  router.push("/(tabs)/notificaciones");
}