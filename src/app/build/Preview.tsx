"use client";

import { CameraControls, Environment, Preload, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { useCustomizerControls } from "./context";
import { asImageSrc } from "@prismicio/client";
import { Skateboard } from "@/components/Skateboard";
import * as THREE from "three";

const DEFAULT_WHEEL_TEXTURE = "/skateboard/SkateWheel1.png";
const DEFAULT_DECK_TEXTURE = "/skateboard/Deck.webp";
const DEFAULT_TRUCK_COLOR = "#6F6E6A";
const DEFAULT_BOLT_COLOR = "#6F6E6A";
const ENVIRONMENT_COLOR = "#3B3A3A";

type Props = {
  wheelTextureURLs: string[];
  deckTextureURLs: string[];
};

export default function Preview({ wheelTextureURLs, deckTextureURLs }: Props) {
  const cameraControls = useRef<CameraControls>(null);
  const floorRef = useRef<THREE.Mesh>(null);
  const { selectedWheel, selectedBolt, selectedDeck, selectedTruck } = useCustomizerControls();

  const wheelTextureURL = asImageSrc(selectedWheel?.texture) ?? DEFAULT_WHEEL_TEXTURE;
  const deckTextureURL = asImageSrc(selectedDeck?.texture) ?? DEFAULT_DECK_TEXTURE;
  const truckColor = selectedTruck?.color ?? DEFAULT_TRUCK_COLOR;
  const boltColor = selectedBolt?.color ?? DEFAULT_BOLT_COLOR;

  /**
   * Update camera position based on user selections
   */
  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(0, 0.3, 0),
      new THREE.Vector3(1.5, 0.8, 0)
    );
  }, [selectedDeck]);

  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(-0.12, 0.29, 0.57),
      new THREE.Vector3(0.1, 0.25, 0.9)
    );
  }, [selectedTruck]);

  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(-0.08, 0.54, 0.64),
      new THREE.Vector3(0.09, 1, 0.9)
    );
  }, [selectedWheel]);

  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(-0.25, 0.3, 0.62),
      new THREE.Vector3(0.5, 0.35, 0.8)
    );
  }, [selectedBolt]);

  function setCameraControls(target: THREE.Vector3, pos: THREE.Vector3) {
    const controls = cameraControls.current;
    if (!controls) return;

    controls.setTarget(target.x, target.y, target.z, true);
    controls.setPosition(pos.x, pos.y, pos.z, true);
  }

  function onCameraControlStart() {
    const controls = cameraControls.current;
    const floor = floorRef.current;

    // Prevent repeated assignment
    if (!controls || !floor || controls.colliderMeshes.length > 0) return;

    controls.colliderMeshes = [floor];
  }

  return (
    <Canvas camera={{ position: [2.5, 1, 0], fov: 50 }} shadows>
      <Suspense fallback={null}>
        <Environment files="/hdr/warehouse-512.hdr" environmentIntensity={0.6} />
        <directionalLight
          castShadow
          position={[1, 1, 1]}
          intensity={0.6}
        />
        <fog attach="fog" args={[ENVIRONMENT_COLOR, 3, 10]} />
        <color attach="background" args={[ENVIRONMENT_COLOR]} />

        <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[6, 6]} />
          <meshBasicMaterial visible={false} />
        </mesh>

        <StageFloor />

        <Skateboard
          wheelTextureURLs={wheelTextureURLs}
          wheelTextureURL={wheelTextureURL}
          deckTextureURLs={deckTextureURLs}
          deckTextureURL={deckTextureURL}
          truckColor={truckColor}
          boltColor={boltColor}
          pose="side"
        />

        <CameraControls
          ref={cameraControls}
          onStart={onCameraControlStart}
          minDistance={0.2}
          maxDistance={4}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}

function StageFloor() {
  const normalMap = useTexture("/concrete-normal.avif");
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(30, 30);
  normalMap.anisotropy = 8; // ✅ fixed small bug (was `normalMap.anisotropy - 8`)

  const material = new THREE.MeshStandardMaterial({
    roughness: 0.75,
    color: ENVIRONMENT_COLOR,
    normalMap,
  });

  return (
    <mesh
      castShadow
      receiveShadow
      position={[0, -0.005, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      material={material}
    >
      <circleGeometry args={[20, 32]} />
    </mesh>
  );
}
