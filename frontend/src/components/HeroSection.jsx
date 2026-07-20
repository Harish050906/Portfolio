import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, useProgress, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Terminal, Cpu, Database, Award, ArrowRight } from 'lucide-react';

// Loader component for the 3D scene
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white glassmorphism p-6 rounded-2xl border border-white/10 shadow-2xl min-w-[200px]">
        <div className="w-16 h-16 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-semibold tracking-wider bg-gradient-to-r from-brand-purple to-brand-cyan bg-clip-text text-transparent">
          LOADING MODEL
        </p>
        <span className="text-xs text-gray-400 mt-1">{progress.toFixed(0)}%</span>
      </div>
    </Html>
  );
}

// 3D Model Component with custom rotation logic
function PortraitModel() {
  const gltf = useGLTF('/models/Meshy_AI_Formal_Portrait_in_a__0717190241_texture.glb');
  const modelRef = useRef();
  const [offset, setOffset] = useState([0, 0, 0]);

  // Auto-center the 3D model geometry inside the scene stably
  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.position.set(0, 0, 0); // Reset to clean state
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());
      setOffset([-center.x, -center.y, -center.z]);
    }
  }, [gltf]);

  // Set initial rotation: Y-axis at 180 degrees (PI radians), facing away from user
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.PI;
    }
  }, []);

  useFrame((state, delta) => {
    if (modelRef.current) {
      // Smoothly rotate from Math.PI (180deg) to 0 (0deg)
      const currentRotation = modelRef.current.rotation.y;
      const targetRotation = 0;
      
      if (currentRotation > 0.005) {
        // Linear interpolation to make the animation butter-smooth
        modelRef.current.rotation.y = THREE.MathUtils.lerp(currentRotation, targetRotation, delta * 2.0);
      } else {
        modelRef.current.rotation.y = 0;
      }
    }
  });

  return (
    <group ref={modelRef} scale={1.9} position={[0, -0.4, 0]}>
      <primitive object={gltf.scene} position={offset} />
    </group>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-16 pt-24 pb-12 overflow-hidden bg-grid-pattern">
      {/* Background ambient glowing spheres */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-brand-cyan/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left Column - 3D Scene */}
        <div className="relative h-[450px] lg:h-[600px] w-full rounded-3xl glassmorphism-card overflow-hidden group border border-white/5 shadow-inner">
          {/* Neon corner indicators */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-purple/40 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-purple/40 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-purple/40 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-purple/40 rounded-br-3xl"></div>

          {/* Model Status HUD */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full glassmorphism text-xs text-brand-cyan font-mono border border-brand-cyan/20">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-ping"></span>
            ACTIVE_3D_LOBBY
          </div>

          <Canvas 
            camera={{ position: [0, 0, 4.5], fov: 45 }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            gl={{ antialias: true, preserveDrawingBuffer: true }}
          >
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
            <directionalLight position={[-5, 5, -5]} intensity={0.5} />
            <pointLight position={[0, 3, 2]} intensity={1.0} color="#8b5cf6" />
            <Suspense fallback={<Loader />}>
              <PortraitModel />
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.8}
                minAzimuthAngle={-Math.PI / 4}
                maxAzimuthAngle={Math.PI / 4}
              />
            </Suspense>
          </Canvas>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
            <span className="text-[10px] tracking-widest text-gray-400 font-mono uppercase bg-dark-900/80 px-4 py-1.5 rounded-full border border-white/5">
              Drag to Rotate &bull; Dynamic Intro
            </span>
          </div>
        </div>

        {/* Right Column - Hero Typography */}
        <div className="flex flex-col space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glassmorphism border border-brand-purple/30 w-fit">
            <span className="text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-brand-purple to-brand-cyan bg-clip-text text-transparent">
              AI Engineer & Full-Stack Developer
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight">
              Hey, I'm <br />
              <span className="bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan bg-clip-text text-transparent text-glow">
                Harish A
              </span>
            </h1>
            
            <p className="text-lg text-brand-cyan font-semibold flex items-center gap-2">
              <Cpu size={18} /> Chennai Institute of Technology
            </p>
            <p className="text-sm text-gray-400 font-mono -mt-1">
              B.Tech in Artificial Intelligence and Machine Learning (Expected Graduation: 2028) &bull; CGPA: 7.78
            </p>
          </div>

          <p className="text-base text-gray-300 leading-relaxed font-light">
            Aspiring <strong className="text-white font-medium">AI Engineer</strong> with knowledge of <strong className="text-white font-medium">Artificial Intelligence</strong>, <strong className="text-white font-medium">Machine Learning</strong>, <strong className="text-white font-medium">Deep Learning</strong>, and <strong className="text-white font-medium">Software Development</strong>. Skilled in <strong className="text-white font-medium">Java</strong>, <strong className="text-white font-medium">Python</strong>, <strong className="text-white font-medium">SQL</strong>, and modern development tools, with hands-on experience in academic and hackathon projects. Eager to contribute to real-world applications while enhancing technical and problem-solving abilities in a collaborative environment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a 
              href="#projects" 
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-purple to-brand-blue rounded-xl font-medium text-white hover:opacity-90 shadow-lg hover:shadow-brand-purple/20 transition-all"
            >
              Explore Projects <ArrowRight size={16} />
            </a>
            <a 
              href="#contact" 
              className="flex items-center justify-center gap-2 px-6 py-3 bg-dark-800 hover:bg-dark-700 border border-white/10 rounded-xl font-medium text-gray-300 hover:text-white transition-all"
            >
              Get In Touch
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
