export default function Icon({

  icon,

  active = false,

  size = 24,

}) {

  const Svg = active
    ? icon.white ?? icon
    : icon.black ?? icon;

  return (

    <Svg

      width={size}

      height={size}

    />

  );

}