import React, { useRef, useState } from 'react';
import './App.scss';
import { Canvas, useFrame } from 'react-three-fiber';
// import { Box } from '@react-three/drei';
import { softShadows, MeshWobbleMaterial, OrbitControls } from '@react-three/drei';

import { useSpring, a} from 'react-spring/three'

softShadows();

const SpinningMesh = ({ position, color, args, speed }) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01 ));
  const [expand, setExpand] = useState(false);
  const props = useSpring({
    scale: expand ? [1.4,1.4,1.4] : [1,1,1]
  })

  return (
    <a.mesh 
    onClick={() => setExpand(!expand)}
    scale={props.scale}
    castShadow 
    position={position} 
    ref={mesh}>
      <boxBufferGeometry attach='geometry' args={args}/>
      <MeshWobbleMaterial attach='material' color={color} spped={speed} factor={0.6}/>
    </a.mesh>
  )
}


function App() {


  return (
    <>
      <Canvas 
      shadowMap
      colorManagement 
      camera={{position: [-5, 2, 10], fov: 60}}>
        <ambientLight intensity={0.3}/>
        <directionalLight 
        position={[0, 10, 0]} 
        intensity={1.5} 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5}/>
        <pointLight position={[0, -10, 0]} intensity={1.5}/>
        <group>
          <mesh 
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -3, 0]}>
            <planeBufferGeometry attach='geometry' arg={[100, 100]}/>
            {/* <meshStandardMaterial attach='material' color={'yellow'}/> */}
            <shadowMaterial attach='material'/>
          </mesh>
          <SpinningMesh position={[0, 1, 0]} color='blue' args={[1,1,1]} speed={1}/>
        <SpinningMesh position={[-2, 1, -5]}  color='red' args={[3,2,1]} speed={1}/>
        <SpinningMesh position={[5, 1, -2]}  color='yellow' args={[2,1,1]} speed={3} />
        </group>
        {/* <Box>
          <meshStandardMaterial attach='material'/>
        </Box> */}
        <OrbitControls/>
      </Canvas>
    </>
  );
}

export default App;
