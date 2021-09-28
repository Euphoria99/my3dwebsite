import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);



const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);


const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

//const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper)

const controls = new OrbitControls( camera,renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('2.jpg');
scene.background = spaceTexture;

const testTexture = new THREE.TextureLoader().load('testpic.jpg');

const test = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( {map: testTexture })
);
scene.add(test);

const fireTexture = new THREE.TextureLoader().load('fire.jpg');
const normalTexture = new THREE.TextureLoader().load('mntxtr.jpg')

const fire = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial( {
    map: fireTexture,
  normalMap: normalTexture
  })
);


scene.add(fire);



fire.position.z = 30;
fire.position.setX(-10);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  fire.rotation.x += 0.06;
  fire.rotation.y += 0.11;
  fire.rotation.z += 0.91;

  test.rotation.y += 0.01;
  test.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0009;
  camera.rotation.y = t * -0.0009;
}

document.body.onscroll = moveCamera;
moveCamera();





function animate() {
  requestAnimationFrame( animate);

  torus.rotation.x += 0.01;
  torus.rotation.y+= 0.05;
  torus.rotation.z += 0.01;
  
  controls.update();
  renderer.render( scene, camera);
}

animate()