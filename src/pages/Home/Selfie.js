import { useRef, useEffect } from 'react';
import classNames from 'classnames';
import {
  WebGLRenderer,
  sRGBEncoding,
  Scene,
  PerspectiveCamera,
  SmoothShading,
  AmbientLight,
  DirectionalLight,
  Color,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { spring, value } from 'popmotion';
import { usePrefersReducedMotion, useInViewport } from 'hooks';
import { cleanScene, cleanRenderer, removeLights } from 'utils/three';
import { rgbToThreeColor } from 'utils/style';
import { useTheme } from 'components/ThemeProvider';
import selfieModelPath from 'assets/selfie.glb';
import './Selfie.css';

const Selfie = ({ className, delay, alt, ...rest }) => {
  const { colorWhite, themeId, rgbBackgroundLight } = useTheme();
  const container = useRef();
  const canvas = useRef();
  const renderer = useRef();
  const camera = useRef();
  const scene = useRef();
  const lights = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isInViewport = useInViewport(canvas);

  // Init scene and models
  useEffect(() => {
    const { clientWidth, clientHeight } = container.current;

    renderer.current = new WebGLRenderer({
      canvas: canvas.current,
      powerPreference: 'high-performance',
    });

    renderer.current.setPixelRatio(2);
    renderer.current.setSize(clientWidth, clientHeight);
    renderer.current.outputEncoding = sRGBEncoding;
    renderer.current.physicallyCorrectLights = true;

    camera.current = new PerspectiveCamera(45, clientWidth / clientHeight, 0.1, 800);
    camera.current.position.z = 24;

    scene.current = new Scene();

    const modelLoader = new GLTFLoader();

    modelLoader.load(selfieModelPath, model => {
      model.scene.traverse(node => {
        if (node.isMesh) {
          node.material.shading = SmoothShading;
          node.geometry.computeVertexNormals(true);
        }
      });

      scene.current.add(model.scene);
      model.scene.position.y = -8;
    });

    return () => {
      cleanScene(scene.current);
      cleanRenderer(renderer.current);
    };
  }, []);

  // Lights
  useEffect(() => {
    const ambientLight = new AmbientLight(colorWhite, 0.8);
    const dirLight = new DirectionalLight(colorWhite, themeId === 'light' ? 1.6 : 0.8);

    dirLight.position.set(30, 20, 32);

    lights.current = [ambientLight, dirLight];
    scene.current.background = new Color(...rgbToThreeColor(rgbBackgroundLight));
    lights.current.forEach(light => scene.current.add(light));

    return () => {
      removeLights(lights.current);
    };
  }, [colorWhite, themeId, rgbBackgroundLight]);

  // Handles window resize
  useEffect(() => {
    const handleResize = () => {
      const { clientWidth, clientHeight } = container.current;

      renderer.current.setSize(clientWidth, clientHeight);
      camera.current.aspect = clientWidth / clientHeight;
      camera.current.updateProjectionMatrix();

      if (prefersReducedMotion) {
        renderer.current.render(scene.current, camera.current);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReducedMotion]);

  // Handle mouse move animation
  useEffect(() => {
    let rotationSpring;
    let rotationSpringValue;

    const onMouseMove = event => {
      const { rotation } = scene.current;
      const { innerWidth, innerHeight } = window;

      const position = {
        x: (event.clientX - innerWidth / 2) / innerWidth,
        y: (event.clientY - innerHeight / 2) / innerHeight,
      };

      if (!rotationSpringValue) {
        rotationSpringValue = value({ x: rotation.x, y: rotation.y }, ({ x, y }) => {
          rotation.set(x, y, rotation.z);
        });
      }

      rotationSpring = spring({
        from: rotationSpringValue.get(),
        to: { x: position.y / 2, y: position.x / 2 },
        stiffness: 40,
        damping: 40,
        velocity: rotationSpringValue.getVelocity(),
        restSpeed: 0.00001,
        mass: 1.4,
      }).start(rotationSpringValue);
    };

    if (isInViewport && !prefersReducedMotion) {
      window.addEventListener('mousemove', onMouseMove);
    }

    return function cleanup() {
      window.removeEventListener('mousemove', onMouseMove);

      rotationSpring?.stop();
    };
  }, [isInViewport, prefersReducedMotion]);

  // Handles renders
  useEffect(() => {
    let animation;

    const animate = () => {
      animation = requestAnimationFrame(animate);

      renderer.current.render(scene.current, camera.current);
    };

    if (!prefersReducedMotion && isInViewport) {
      animate();
    } else {
      renderer.current.render(scene.current, camera.current);
    }

    return () => {
      cancelAnimationFrame(animation);
    };
  }, [isInViewport, prefersReducedMotion]);

  return (
    <div
      className={classNames('selfie', className)}
      ref={container}
      style={{ '--delay': delay }}
      role="img"
      aria-label={alt}
      {...rest}
    >
      <canvas aria-hidden className="selfie__canvas" ref={canvas} />
    </div>
  );
};

export default Selfie;
