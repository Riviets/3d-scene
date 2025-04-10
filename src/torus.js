import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
}) 

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

const geometry = new THREE.TorusGeometry( 12, 3, 30, 100 ) 
const material = new THREE.MeshPhongMaterial( { color: 0xffff00 } ) 
const torus = new THREE.Mesh( geometry, material )
scene.add( torus )

const pointLight = new THREE.PointLight(0xffffff, 40)
pointLight.position.set(10,8,10)

const pointLightHelper = new THREE.PointLightHelper(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)

const gridHelper = new THREE.GridHelper(200,50)

scene.add(pointLight, pointLightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

function addStar(){
  const geometry = new THREE.SphereGeometry(0.15)
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100))

  star.position.set(x,y,z)
  scene.add(star)
}

Array(300).fill().forEach(addStar)

function animate(){
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  renderer.render(scene, camera)
}

animate()