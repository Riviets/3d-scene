import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/Addons.js"

const width = window.innerWidth
const height = window.innerHeight

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)

document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 10)
camera.position.z = 3
const scene = new THREE.Scene()

const geometry = new THREE.IcosahedronGeometry(1.0, 4)
const material = new THREE.MeshStandardMaterial({color: 0xffffff})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const wireMat = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true})
const wireMash = new THREE.Mesh(geometry, wireMat)
wireMash.scale.setScalar(1.001)
mesh.add(wireMash)

// const light = new THREE.HemisphereLight(0xff4400, 0x0044bb)
// scene.add(light)
const directionalLight = new THREE.DirectionalLight(0x0033ff, 0.5)
directionalLight.position.set(5,5,0)

const pointLight = new THREE.PointLight(0xbbbb55)
pointLight.position.set(-2,-2,0)

scene.add(directionalLight, pointLight)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

function createStar(){
    const geometry = new THREE.SphereGeometry(0.02)
    const material = new THREE.MeshBasicMaterial({color: 0xffffff})
    const mesh = new THREE.Mesh(geometry, material)
    const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(10))
    mesh.position.set(x,y,z)
    scene.add(mesh)
}

Array(100).fill().forEach(createStar)

function animate(){
    requestAnimationFrame(animate)
    mesh.rotation.y += 0.001
    renderer.render(scene, camera)
}

animate()