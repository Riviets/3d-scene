import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/Addons.js"

const width = window.innerWidth
const height = window.innerHeight

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10)
camera.position.z = 3
const scene = new THREE.Scene()

const globeGroup = new THREE.Group()
globeGroup.rotation.z = -23.4 * Math.PI / 180
scene.add(globeGroup)

const loader = new THREE.TextureLoader()
const globeGeometry = new THREE.IcosahedronGeometry(1, 12)

const globeMaterial = new THREE.MeshStandardMaterial({
    map: loader.load("../public/earthmap1k.jpg")
})
const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial)
globeGroup.add(globeMesh)

const lightsMaterial = new THREE.MeshBasicMaterial({
    map: loader.load("../public/earthlights1k.jpg"),
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.8
})
const lightsMesh = new THREE.Mesh(globeGeometry, lightsMaterial)
globeGroup.add(lightsMesh)

const sunLight = new THREE.DirectionalLight(0xffffff, 1)
sunLight.position.set(-1, 1.5, 1.5)
scene.add(sunLight)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.3

function animate() {
    requestAnimationFrame(animate)
    globeGroup.rotateY(0.002)
    renderer.render(scene, camera)
}

animate()
