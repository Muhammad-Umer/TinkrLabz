'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { ShaderMaterial } from 'three'

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uAspect;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  varying vec2 vUv;

  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 p = vUv * uAspect;
    float t = uTime * 0.07;
    float n1 = snoise(p * 1.1 + vec2(t, -t * 0.6));
    float n2 = snoise(p * 1.8 - vec2(t * 1.2, t * 0.8) + n1 * 0.6);
    vec3 col = mix(uColor1, uColor2, smoothstep(-0.7, 0.9, n1));
    col = mix(col, uColor3, smoothstep(0.1, 1.0, n2) * 0.85);
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.035;
    gl_FragColor = vec4(col, 1.0);
  }
`

function hexToVec(hex: string): [number, number, number] {
  const n = Number.parseInt(hex.slice(1), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function GradientPlane({ colors }: { colors: readonly [string, string, string] }) {
  const material = useRef<ShaderMaterial>(null)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: [1, 1] },
      uColor1: { value: hexToVec(colors[0]) },
      uColor2: { value: hexToVec(colors[1]) },
      uColor3: { value: hexToVec(colors[2]) },
    }),
    [colors],
  )

  useFrame((state, delta) => {
    if (!material.current) return
    material.current.uniforms.uTime.value += delta
    const { width, height } = state.size
    material.current.uniforms.uAspect.value = [width / Math.max(height, 1), 1]
  })

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function ShaderGradientCanvas({ colors }: { colors: readonly [string, string, string] }) {
  const wrapper = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = wrapper.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '100px',
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div ref={wrapper} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'low-power' }}
        frameloop={visible && !reducedMotion ? 'always' : 'demand'}
      >
        <GradientPlane colors={colors} />
      </Canvas>
    </div>
  )
}
