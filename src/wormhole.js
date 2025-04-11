import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/Addons.js"
import spline from "./assets/spline"

const width = window.innerWidth
const height = window.innerHeight

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 100)
camera.position.z = 5
const scene = new THREE.Scene()

const tubeGeometry = new THREE.TubeGeometry(spline, 255, 0.65, 16, true)
const tubeMaterial = new THREE.MeshStandardMaterial({color: 0x8800ff, wireframe:true, side: THREE.DoubleSide})
const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial)
scene.add(tubeMesh)

const edgesGeometry = new THREE.EdgesGeometry(tubeGeometry, 15)
const lineMaterial = new THREE.MeshStandardMaterial({color: 0xffffff})
const line = new THREE.LineSegments(edgesGeometry, lineMaterial)
scene.add(line)

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x706e6e, 8)
scene.add(hemiLight)

scene.fog = new THREE.FogExp2(0x000000, 0.4)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.03

function updateCamera(t){
    const time = t * 0.1
    const looptime = 7000
    const p = (time % looptime) / looptime
    const pos = tubeGeometry.parameters.path.getPointAt(p)
    const lookAt = tubeGeometry.parameters.path.getPointAt((p + 0.03) % 1)
    camera.position.copy(pos)
    camera.lookAt(lookAt)
}

function animate(t = 0){
    requestAnimationFrame(animate)
    updateCamera(t)
    renderer.render(scene, camera)
    controls.update()
}

animate()