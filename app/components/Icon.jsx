import { Image } from "expo-image";

export default function Icon({
  icon,
  active = false,
  size = 24,
}) {

  const source = active
    ? icon.white ?? icon
    : icon.black ?? icon;

  return (

    <Image
      source={source}
      style={{
        width: size,
        height: size,
      }}
      contentFit="contain"
    />

  );

}