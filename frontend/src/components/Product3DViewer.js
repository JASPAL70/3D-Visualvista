import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './Product3DViewer.css';

const Product3DViewer = ({ src }) => {
  const viewerRef = useRef();

  useEffect(() => {
    const width = viewerRef.current.clientWidth;
    const height = viewerRef.current.clientHeight;

    // Scene and Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 3); // Improved position for better interaction

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    viewerRef.current.appendChild(renderer.domElement);

    // Light setup
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // OrbitControls for interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.5; // Slow down rotation speed
    controls.zoomSpeed = 3.0; // Increased zoom speed
    controls.panSpeed = 1.5; // Set pan speed
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.enablePan = true;
    controls.target.set(0, 0, 0);

    // Cursor logic for interactivity
    renderer.domElement.style.cursor = 'grab';
    controls.addEventListener('start', () => {
      renderer.domElement.style.cursor = 'grabbing';
    });
    controls.addEventListener('end', () => {
      renderer.domElement.style.cursor = 'grab';
    });

    // Load the image as texture on a 3D plane (for .jpg files)
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      src,
      (texture) => {
        const geometry = new THREE.PlaneGeometry(5, 5); // Bigger plane for the texture
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const imageMesh = new THREE.Mesh(geometry, material);
        scene.add(imageMesh);
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
      }
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = viewerRef.current.clientWidth;
      const newHeight = viewerRef.current.clientHeight;

      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (viewerRef.current) {
        viewerRef.current.removeChild(renderer.domElement);
        controls.dispose();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [src]);

  return (
    <div
      ref={viewerRef}
      className="product-3d-viewer"
      style={{ width: '100%', height: '400px' }} // Adjusted height for a larger viewer
    ></div>
  );
};

export default Product3DViewer;







// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // Import the GLTF loader
// import './Product3DViewer.css';

// const Product3DViewer = ({ src, isModel = false }) => {
//   const viewerRef = useRef();

//   useEffect(() => {
//     const width = viewerRef.current.clientWidth;
//     const height = viewerRef.current.clientHeight;

//     // Scene and Camera setup
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//     camera.position.z = 3;

//     // Renderer setup
//     const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//     renderer.setSize(width, height);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     viewerRef.current.appendChild(renderer.domElement);

//     // Light setup
//     const light = new THREE.AmbientLight(0xffffff, 1);
//     scene.add(light);

//     // OrbitControls for interaction
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.1;
//     controls.rotateSpeed = 0.5;
//     controls.zoomSpeed = 0.5;

//     // Cursor logic for interactivity
//     renderer.domElement.style.cursor = 'grab';
//     controls.addEventListener('start', () => {
//       renderer.domElement.style.cursor = 'grabbing';
//     });
//     controls.addEventListener('end', () => {
//       renderer.domElement.style.cursor = 'grab';
//     });

//     let object;
//     if (isModel) {
//       // Load the 3D model using GLTFLoader (for .glb files)
//       const loader = new GLTFLoader();
//       loader.load(
//         src,
//         (gltf) => {
//           object = gltf.scene;
//           scene.add(object);
//         },
//         undefined,
//         (error) => {
//           console.error('Error loading model:', error);
//         }
//       );
//     } else {
//       // Load the image as texture on a 3D plane (for .jpg files)
//       const textureLoader = new THREE.TextureLoader();
//       textureLoader.load(
//         src,
//         (texture) => {
//           const geometry = new THREE.PlaneGeometry(3, 3); // A plane for the texture
//           const material = new THREE.MeshBasicMaterial({ map: texture });
//           object = new THREE.Mesh(geometry, material);
//           scene.add(object);
//         },
//         undefined,
//         (error) => {
//           console.error('Error loading texture:', error);
//         }
//       );
//     }

//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Cleanup
//     return () => {
//       if (viewerRef.current) {
//         viewerRef.current.removeChild(renderer.domElement);
//         controls.dispose();
//       }
//     };
//   }, [src, isModel]);

//   return (
//     <div
//       ref={viewerRef}
//       className="product-3d-viewer"
//       style={{ width: '100%', height: '300px' }} // Adjust height if needed
//     ></div>
//   );
// };

// export default Product3DViewer;







