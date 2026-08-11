import { ICONS } from "../constants/icons";

export default function FileIcon({

  fileName,

  size = 28,

}) {

  if (!fileName) {

    return null;

  }

  const extension = fileName
    .split(".")
    .pop()
    .toLowerCase();

  const icon = ICONS.files?.[extension];

  if (!icon) {

    return null;

  }

  const Svg = icon;

  return (

    <Svg

      width={size}

      height={size}

    />

  );

}