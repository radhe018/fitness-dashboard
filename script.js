import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';

const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: '#38bdf8' });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

camera.position.z = 3;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Replace with your token
const TOKEN = 'dMLr3v4CEYJVTxjdTs4FhiPEHFhGx6eD';
const BASE_URL = `https://blynk.cloud/external/api/get?token=${TOKEN}`;

const pins = {
  flex1: 'V1',
  flex2: 'V2',
  pressure: 'V3',
  gyroX: 'V4',
  gyroY: 'V5',
  gyroZ: 'V6',
  accX: 'V7',
  accY: 'V8',
  accZ: 'V9'
};

async function fetchData() {
  for (const [key, vpin] of Object.entries(pins)) {
    try {
      const res = await fetch(`${BASE_URL}&${vpin}`);
      const val = await res.text();
      document.querySelector(`#${key} span`).textContent = Number(val).toFixed(1);

      if (key === 'gyroX') cube.rotation.x = Number(val) * 0.017;
      if (key === 'gyroY') cube.rotation.y = Number(val) * 0.017;
      if (key === 'gyroZ') cube.rotation.z = Number(val) * 0.017;
    } catch (e) {
      console.error(`Failed to fetch ${key}:`, e);
    }
  }
}

setInterval(fetchData, 500);
