import React from "react";

type Props = {
  color:string;
};

export default function CentralLine({ color }: Props) {
  return (
    <div className={`z-10 hidden sm:flex w-full h-0.5`} style={{ backgroundColor: color}} />
  );
}
