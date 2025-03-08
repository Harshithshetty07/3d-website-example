// pages/index.js
'use client'
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, useAnimation } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PresentationControls, Environment, ContactShadows, Html } from '@react-three/drei';
// import LaptopImage from '../public/images/Intellipod1.png'
// import LaptopImage from '../public/images/Intellipod1.png'
const { nodes, materials } = useGLTF('../public/images/Intellipod1.gltf');
import LaptopImage from '/images/Intellipod1.png'

// 3D Laptop Model Component
function Model(props) {
  const { nodes, materials } = useGLTF('/images/Intellipod1.gltf');
  const group = useRef();
  
  // Subtle animation for the laptop
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.x = Math.sin(t / 4) / 8;
    group.current.rotation.y = Math.sin(t / 4) / 4;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-0.3, 0, 0]} position={[0, -0.2, 0]}>
        <group position={[0, 0.9, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.lid.geometry}
            material={materials.aluminium}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.screen.geometry}
            material={materials.screen}
          >
            <Html 
              transform 
              wrapperClass="screen-content"
              scale={0.15} 
              position={[0, 0.05, -0.09]}
              rotation-x={-0.256}
            >
              <div className="screen-content-inner">
                <div className="flex flex-col items-center justify-center h-full">
                  <h3 className="text-xl font-bold text-white mb-4">Interactive Display</h3>
                  <p className="text-sm text-gray-200">Your content can display here</p>
                </div>
              </div>
            </Html>
          </mesh>
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.base.geometry}
          material={materials.aluminium}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.keyboard.geometry}
          material={materials.keys}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.touchpad.geometry}
          material={materials.trackpad}
        />
      </group>
    </group>
  );
}

// Feature Section Component
const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-gray-900 p-6 rounded-xl shadow-lg"
    >
      <div className="text-blue-500 text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

export default function Home() {
  const controls = useAnimation();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
    controls.start({ 
      opacity: 1, 
      y: 0,
      transition: { duration: 1 }
    });
  }, [controls]);

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen text-white">
      <Head>
        <title>Quantum Laptop | Revolutionary Computing</title>
        <meta name="description" content="Discover our revolutionary 3D laptop technology" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20"></div>
        </div>
        
        <div className="container mx-auto px-4 z-30">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              The Future of Computing
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 mb-8">
              Experience revolutionary technology in an elegantly designed package
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg"
            >
              Explore Now
            </motion.button>
          </motion.div>
        </div>

        {/* 3D Laptop Model */}
        <div className="absolute inset-0 z-10">
          {isLoaded && (
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 35 }}>
              <color attach="background" args={['transparent']} />
              <ambientLight intensity={0.5} />
              <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
              <PresentationControls
                global
                zoom={0.8}
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
              >
                <Model position={[0, -1.5, 0]} scale={1.5} />
              </PresentationControls>
              <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={1.5} far={4} />
              <Environment preset="city" />
            </Canvas>
          )}
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-6 h-6 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Revolutionary Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Cutting-edge technology wrapped in an elegant design, crafted for tomorrow's challenges.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon="⚡"
              title="Lightning Performance"
              description="Ultra-fast processing power that handles any task with ease and efficiency."
              delay={0.1}
            />
            <FeatureCard 
              icon="🔋"
              title="All-Day Battery"
              description="Work from anywhere with our revolutionary battery technology."
              delay={0.2}
            />
            <FeatureCard 
              icon="🔒"
              title="Advanced Security"
              description="State-of-the-art security features keep your data protected at all times."
              delay={0.3}
            />
            <FeatureCard 
              icon="🌈"
              title="Vivid Display"
              description="Immersive visual experience with our stunning high-resolution screen."
              delay={0.4}
            />
            <FeatureCard 
              icon="🔊"
              title="Immersive Audio"
              description="Crystal clear sound that brings your content to life like never before."
              delay={0.5}
            />
            <FeatureCard 
              icon="🌐"
              title="Seamless Connectivity"
              description="Stay connected everywhere with advanced wireless technology."
              delay={0.6}
            />
          </div>
        </div>
      </section>
      
      {/* Specs Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 mb-12 lg:mb-0"
            >
              <h2 className="text-4xl font-bold mb-6">Technical Specifications</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-blue-500 mb-2">Processor</h3>
                  <p className="text-gray-300">Next-gen CPU with 12 cores, designed for maximum performance</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-500 mb-2">Memory</h3>
                  <p className="text-gray-300">32GB high-speed RAM with expansion capabilities</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-500 mb-2">Storage</h3>
                  <p className="text-gray-300">2TB SSD with lightning-fast read/write speeds</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-500 mb-2">Display</h3>
                  <p className="text-gray-300">15.6" 4K OLED with HDR support and 120Hz refresh rate</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative h-96"
            >
              <div className="absolute inset-0 bg-blue-500 bg-opacity-10 rounded-lg overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  {/* Tech background pattern */}
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(100,150,255,0.3)" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-72 h-72 border-4 border-blue-500 rounded-full animate-pulse opacity-20"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-purple-500 rounded-full animate-pulse opacity-20" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Experience the Future?</h2>
            <p className="text-xl text-gray-400 mb-8">Pre-order today and be among the first to own this revolutionary device.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-10 rounded-full shadow-lg text-lg"
            >
              Pre-Order Now
            </motion.button>
            <p className="mt-6 text-gray-500">Limited quantities available. Expected shipping in Q2 2025.</p>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Quantum Laptop</h3>
              <p className="text-gray-400 mt-2">Redefining what's possible</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© 2025 Quantum Laptop. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Global Styles */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        body {
          background: #000;
          color: #fff;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .screen-content {
          width: 1024px;
          height: 670px;
          padding: 30px;
          background: #2a2a2a;
          overflow: hidden;
        }
        .screen-content-inner {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}