import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import Pagination from "../pagination";
import axios from "axios";
interface TableProps {
  items: any[];
  config: {
    positions: [number, number, number][];
  };
}

const Table: React.FC<TableProps> = ({ items, config }) => {
  const mesh = useRef<Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      {items.map((item, index) => (
        <mesh
          key={index}
          position={config.positions[index]}
          ref={mesh}
          scale={hovered ? 1.5 : 1}
          onClick={() => console.log("Clicked")}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        >
          <boxGeometry args={[1, 0.1, 1]} />
          <meshStandardMaterial color={item.color} />
        </mesh>
      ))}
    </>
  );
};

export interface AppProps {
  url: string;
  config: {
    pageSize: number;
    positions: [number, number, number][];
  };
}
export default Table;
