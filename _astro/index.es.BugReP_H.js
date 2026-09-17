function e(){return`precision highp float;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
varying vec2 vUv;
varying vec2 vFlowUv;
varying vec4 v_new_position;
varying vec3 v_color;
varying float v_displacement_amount;
varying vec3 vViewPosition;
varying vec3 vNormal;
varying vec3 vPosition;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_color_pressure;
uniform float u_wave_frequency_x;
uniform float u_wave_frequency_y;
uniform float u_wave_amplitude;
uniform float u_plane_width;
uniform float u_plane_height;
uniform float u_color_blending;
uniform int u_colors_count;
struct ColorStop {
float is_active;
vec3 color;
float influence;
};
uniform ColorStop u_colors[6];
uniform float u_y_offset;
uniform float u_y_offset_wave_multiplier;
uniform float u_y_offset_color_multiplier;
uniform float u_y_offset_flow_multiplier;
uniform float u_flow_distortion_a;
uniform float u_flow_distortion_b;
uniform float u_flow_scale;
uniform float u_flow_ease;
uniform float u_flow_enabled;
uniform float u_fresnel_enabled;
uniform float u_fresnel_power;
uniform float u_fresnel_intensity;
uniform vec3 u_fresnel_color;
uniform float u_shape_type;
uniform float u_flat_shading;`}function t(){return`precision highp float;
varying vec2 vUv;
varying vec2 vFlowUv;
varying vec4 v_new_position;
varying vec3 v_color;
varying float v_displacement_amount;
varying vec3 vViewPosition;
varying vec3 vNormal;
varying vec3 vPosition;
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_plane_height;
uniform float u_shadows;
uniform float u_highlights;
uniform float u_saturation;
uniform float u_brightness;
uniform float u_grain_intensity;
uniform float u_grain_sparsity;
uniform float u_grain_scale;
uniform float u_grain_speed;
uniform float u_y_offset;
uniform float u_y_offset_color_multiplier;
uniform float u_flow_distortion_a;
uniform float u_flow_distortion_b;
uniform float u_flow_scale;
uniform sampler2D u_procedural_texture;
uniform float u_enable_procedural_texture;
uniform float u_texture_ease;
uniform float u_domain_warp_enabled;
uniform float u_domain_warp_intensity;
uniform float u_domain_warp_scale;
uniform float u_vignette_intensity;
uniform float u_vignette_radius;
uniform float u_fresnel_enabled;
uniform float u_fresnel_power;
uniform float u_fresnel_intensity;
uniform vec3 u_fresnel_color;
uniform float u_iridescence_enabled;
uniform float u_iridescence_intensity;
uniform float u_iridescence_speed;
uniform float u_bloom_intensity;
uniform float u_bloom_threshold;
uniform float u_chromatic_aberration;
uniform float u_shape_type;
uniform float u_transparent_texture_void;
uniform float u_silhouette_fade;
uniform float u_cylinder_fade;
uniform float u_ribbon_fade;
uniform float u_flat_shading;`}function n(){return`vec4 permute(vec4 x) {
return floor(fract(sin(x) * 43758.5453123) * 289.0);
}
vec4 taylorInvSqrt(vec4 r) {
return 1.79284291400159 - 0.85373472095314 * r;
}
vec3 fade(vec3 t) {
return t*t*t*(t*(t*6.0-15.0)+10.0);
}
float snoise(vec3 v) {
const vec2 C = vec2(1.0/6.0, 1.0/3.0) ;
const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
vec3 i = floor(v + dot(v, C.yyy) );
vec3 x0 = v - i + dot(i, C.xxx) ;
vec3 g = step(x0.yzx, x0.xyz);
vec3 l = 1.0 - g;
vec3 i1 = min( g.xyz, l.zxy );
vec3 i2 = max( g.xyz, l.zxy );
vec3 x1 = x0 - i1 + C.xxx;
vec3 x2 = x0 - i2 + C.yyy;
vec3 x3 = x0 - D.yyy;
vec4 p = permute( permute( permute(
i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
+ i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
+ i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
float n_ = 0.142857142857;
vec3 ns = n_ * D.wyz - D.xzx;
vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
vec4 x_ = floor(j * ns.z);
vec4 y_ = floor(j - 7.0 * x_ );
vec4 x = x_ *ns.x + ns.yyyy;
vec4 y = y_ *ns.x + ns.yyyy;
vec4 h = 1.0 - abs(x) - abs(y);
vec4 b0 = vec4( x.xy, y.xy );
vec4 b1 = vec4( x.zw, y.zw );
vec4 s0 = floor(b0)*2.0 + 1.0;
vec4 s1 = floor(b1)*2.0 + 1.0;
vec4 sh = -step(h, vec4(0.0));
vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
vec3 p0 = vec3(a0.xy,h.x);
vec3 p1 = vec3(a0.zw,h.y);
vec3 p2 = vec3(a1.xy,h.z);
vec3 p3 = vec3(a1.zw,h.w);
vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
p0 *= norm.x;
p1 *= norm.y;
p2 *= norm.z;
p3 *= norm.w;
vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
m = m * m;
return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
dot(p2,x2), dot(p3,x3) ) );
}
float cnoise(vec3 P)
{
vec3 Pi0 = floor(P);
vec3 Pi1 = Pi0 + vec3(1.0);
vec3 Pf0 = fract(P);
vec3 Pf1 = Pf0 - vec3(1.0);
vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
vec4 iy = vec4(Pi0.yy, Pi1.yy);
vec4 iz0 = Pi0.zzzz;
vec4 iz1 = Pi1.zzzz;
vec4 ixy = permute(permute(ix) + iy);
vec4 ixy0 = permute(ixy + iz0);
vec4 ixy1 = permute(ixy + iz1);
vec4 gx0 = ixy0 * (1.0 / 7.0);
vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
gx0 = fract(gx0);
vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
vec4 sz0 = step(gz0, vec4(0.0));
gx0 -= sz0 * (step(0.0, gx0) - 0.5);
gy0 -= sz0 * (step(0.0, gy0) - 0.5);
vec4 gx1 = ixy1 * (1.0 / 7.0);
vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
gx1 = fract(gx1);
vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
vec4 sz1 = step(gz1, vec4(0.0));
gx1 -= sz1 * (step(0.0, gx1) - 0.5);
gy1 -= sz1 * (step(0.0, gy1) - 0.5);
vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
g000 *= norm0.x;
g010 *= norm0.y;
g100 *= norm0.z;
g110 *= norm0.w;
vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
g001 *= norm1.x;
g011 *= norm1.y;
g101 *= norm1.z;
g111 *= norm1.w;
float n000 = dot(g000, Pf0);
float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
float n111 = dot(g111, Pf1);
vec3 fade_xyz = fade(Pf0);
vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
return 2.2 * n_xyz;
}`}function r(){return`vec3 saturation(vec3 rgb, float adjustment) {
const vec3 W = vec3(0.2125, 0.7154, 0.0721);
vec3 intensity = vec3(dot(rgb, W));
return mix(intensity, rgb, adjustment);
}`}var i=class{elements;constructor(){this.elements=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}identity(){let e=this.elements;return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}translate(e,t,n){return this.elements[12]+=this.elements[0]*e+this.elements[4]*t+this.elements[8]*n,this.elements[13]+=this.elements[1]*e+this.elements[5]*t+this.elements[9]*n,this.elements[14]+=this.elements[2]*e+this.elements[6]*t+this.elements[10]*n,this.elements[15]+=this.elements[3]*e+this.elements[7]*t+this.elements[11]*n,this}rotateX(e){let t=Math.cos(e),n=Math.sin(e),r=this.elements[4],i=this.elements[5],a=this.elements[6],o=this.elements[7],s=this.elements[8],c=this.elements[9],l=this.elements[10],u=this.elements[11];return this.elements[4]=t*r+n*s,this.elements[5]=t*i+n*c,this.elements[6]=t*a+n*l,this.elements[7]=t*o+n*u,this.elements[8]=t*s-n*r,this.elements[9]=t*c-n*i,this.elements[10]=t*l-n*a,this.elements[11]=t*u-n*o,this}rotateY(e){let t=Math.cos(e),n=Math.sin(e),r=this.elements[0],i=this.elements[1],a=this.elements[2],o=this.elements[3],s=this.elements[8],c=this.elements[9],l=this.elements[10],u=this.elements[11];return this.elements[0]=t*r-n*s,this.elements[1]=t*i-n*c,this.elements[2]=t*a-n*l,this.elements[3]=t*o-n*u,this.elements[8]=n*r+t*s,this.elements[9]=n*i+t*c,this.elements[10]=n*a+t*l,this.elements[11]=n*o+t*u,this}rotateZ(e){let t=Math.cos(e),n=Math.sin(e),r=this.elements[0],i=this.elements[1],a=this.elements[2],o=this.elements[3],s=this.elements[4],c=this.elements[5],l=this.elements[6],u=this.elements[7];return this.elements[0]=t*r+n*s,this.elements[1]=t*i+n*c,this.elements[2]=t*a+n*l,this.elements[3]=t*o+n*u,this.elements[4]=-n*r+t*s,this.elements[5]=-n*i+t*c,this.elements[6]=-n*a+t*l,this.elements[7]=-n*o+t*u,this}},a=class{left;right;top;bottom;near;far;position;projectionMatrix;zoom;constructor(e,t,n,r,a,o){this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=a,this.far=o,this.position=[0,0,0],this.zoom=1,this.projectionMatrix=new i,this.updateProjectionMatrix()}updateProjectionMatrix(){let e=1/(this.right-this.left),t=1/(this.top-this.bottom),n=1/(this.far-this.near),r=(this.right+this.left)*e,i=(this.top+this.bottom)*t,a=(this.far+this.near)*n;this.projectionMatrix.elements=new Float32Array([2*e,0,0,0,0,2*t,0,0,0,0,-2*n,0,-r,-i,-a,1])}};function o(e,t,n,r=50,i=50,a=`plane`,o=1){e.zoom=o;let s=t/n;if(a===`plane`){let a=t*n/1e6*r*i/1.5,o=Math.sqrt(a*s),c=a/o,l=-r/2,u=Math.min((l+o)/1.5,r/2),d=i/4,f=Math.max((d-c)/2,-i/4);if(s<1){let e=s;l*=e,u*=e;let t=1.05;l*=t,u*=t,d*=t,f*=t}e.left=l,e.right=u,e.top=d,e.bottom=f}else{let t=25;if(a===`sphere`?t=30:a===`torus`?t=35:a===`cylinder`&&(t=30),s>=1)e.left=-t*s,e.right=t*s,e.top=t,e.bottom=-t;else{e.left=-t,e.right=t,e.top=t/s,e.bottom=-t/s;let n=1.05;e.left*=n,e.right*=n,e.top*=n,e.bottom*=n}}e.left/=o,e.right/=o,e.top/=o,e.bottom/=o,e.near=-100,e.far=1e3,e.updateProjectionMatrix()}function s(e,t,n,r){let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}let g=p.length/3>65535,_=[];for(let e=0;e<f.length;e+=3){let t=f[e],n=f[e+1],r=f[e+2];_.push(t,n,n,r,r,t)}return{position:new Float32Array(p),normal:new Float32Array(m),uv:new Float32Array(h),index:g?new Uint32Array(f):new Uint16Array(f),wireframeIndex:g?new Uint32Array(_):new Uint16Array(_)}}function c(e,t,n){let r=[],i=[],a=[],o=[],s=Math.floor(t),c=Math.floor(n);for(let t=0;t<=c;t++){let n=t/c,o=n*Math.PI;for(let t=0;t<=s;t++){let c=t/s,l=c*Math.PI*2,u=-e*Math.sin(o)*Math.cos(l),d=e*Math.cos(o),f=e*Math.sin(o)*Math.sin(l);r.push(u,d,f);let p=Math.sqrt(u*u+d*d+f*f);i.push(u/p,d/p,f/p),a.push(c,1-n)}}for(let e=0;e<c;e++)for(let t=0;t<s;t++){let n=t+(s+1)*e,r=t+(s+1)*(e+1),i=t+1+(s+1)*(e+1),a=t+1+(s+1)*e;o.push(n,r,a),o.push(r,i,a)}let l=r.length/3>65535,u=[];for(let e=0;e<o.length;e+=3){let t=o[e],n=o[e+1],r=o[e+2];u.push(t,n,n,r,r,t)}return{position:new Float32Array(r),normal:new Float32Array(i),uv:new Float32Array(a),index:l?new Uint32Array(o):new Uint16Array(o),wireframeIndex:l?new Uint32Array(u):new Uint16Array(u)}}function l(e,t,n,r){let i=[],a=[],o=[],s=[],c=Math.floor(n),l=Math.floor(r);for(let n=0;n<=c;n++){let r=n/c*Math.PI*2;for(let s=0;s<=l;s++){let u=s/l*Math.PI*2,d=(e+t*Math.cos(r))*Math.cos(u),f=(e+t*Math.cos(r))*Math.sin(u),p=t*Math.sin(r);i.push(d,f,p);let m=e*Math.cos(u),h=e*Math.sin(u),g=d-m,_=f-h,v=p,y=Math.sqrt(g*g+_*_+v*v);a.push(g/y,_/y,v/y),o.push(s/l,n/c)}}for(let e=1;e<=c;e++)for(let t=1;t<=l;t++){let n=(l+1)*e+t-1,r=(l+1)*(e-1)+t-1,i=(l+1)*(e-1)+t,a=(l+1)*e+t;s.push(n,r,a),s.push(r,i,a)}let u=i.length/3>65535,d=[];for(let e=0;e<s.length;e+=3){let t=s[e],n=s[e+1],r=s[e+2];d.push(t,n,n,r,r,t)}return{position:new Float32Array(i),normal:new Float32Array(a),uv:new Float32Array(o),index:u?new Uint32Array(s):new Uint16Array(s),wireframeIndex:u?new Uint32Array(d):new Uint16Array(d)}}function u(e,t,n,r,i){let a=[],o=[],s=[],c=[],l=Math.floor(r),u=Math.floor(i),d=n/2;for(let r=0;r<=u;r++){let i=r/u,c=i*n-d,f=i*(t-e)+e;for(let e=0;e<=l;e++){let t=e/l,n=t*Math.PI*2,r=Math.sin(n),u=Math.cos(n);a.push(f*r,-c,f*u),o.push(r,0,u),s.push(t,1-i)}}for(let e=0;e<u;e++)for(let t=0;t<l;t++){let n=t+(l+1)*e,r=t+(l+1)*(e+1),i=t+1+(l+1)*(e+1),a=t+1+(l+1)*e;c.push(n,r,a),c.push(r,i,a)}let f=a.length/3>65535,p=[];for(let e=0;e<c.length;e+=3){let t=c[e],n=c[e+1],r=c[e+2];p.push(t,n,n,r,r,t)}return{position:new Float32Array(a),normal:new Float32Array(o),uv:new Float32Array(s),index:f?new Uint32Array(c):new Uint16Array(c),wireframeIndex:f?new Uint32Array(p):new Uint16Array(p)}}function d(e,t,n,r,i,a){let o=e/2,s=t/2,c=Math.floor(n),l=Math.floor(r),u=c+1,d=l+1,f=e/c,p=t/l,m=[],h=[],g=[],_=[];for(let n=0;n<d;n++){let r=n*p-s;for(let s=0;s<u;s++){let u=s*f-o,d=u,p=r,_=0,v=0,y=1;if(Math.abs(i)>.001){let t=e/i,n=u/t;d=t*Math.sin(n),_=t*(1-Math.cos(n)),v=Math.sin(n),y=Math.cos(n)}if(Math.abs(a)>.001){let e=r/t*a,n=Math.cos(e),i=Math.sin(e),o=d*n-_*i,s=d*i+_*n;d=o,_=s;let c=v*n-y*i,l=v*i+y*n;v=c,y=l}m.push(d,-p,_),h.push(v,0,y),g.push(s/c),g.push(1-n/l)}}for(let e=0;e<l;e++)for(let t=0;t<c;t++){let n=t+u*e,r=t+u*(e+1),i=t+1+u*(e+1),a=t+1+u*e;_.push(n,r,a),_.push(r,i,a)}let v=m.length/3>65535,y=[];for(let e=0;e<_.length;e+=3){let t=_[e],n=_[e+1],r=_[e+2];y.push(t,n,n,r,r,t)}return{position:new Float32Array(m),normal:new Float32Array(h),uv:new Float32Array(g),index:v?new Uint32Array(_):new Uint16Array(_),wireframeIndex:v?new Uint32Array(y):new Uint16Array(y)}}var f={kty:`EC`,crv:`P-256`,x:`n9A9jNvLNR6QJaPP4ZdpbXtPFz3ASUfeeQm11Jd53Rg`,y:`EoG5ezJ3hr4c62JjpsyabotdFeU-A1LyH-qHyabnKc0`,key_ops:[`verify`],ext:!0};function p(e){let t=e.replace(/-/g,`+`).replace(/_/g,`/`);for(;t.length%4!=0;)t+=`=`;let n=atob(t),r=new Uint8Array(n.length);for(let e=0;e<n.length;e++)r[e]=n.charCodeAt(e);return r}function m(e){if(typeof window>`u`||!window.location)return!0;let t=window.location.hostname.toLowerCase(),n=e.toLowerCase();return!!(t===`localhost`||t===`127.0.0.1`||t===`0.0.0.0`||t===`[::1]`||t.endsWith(`.localhost`)||t===n||t.endsWith(`.`+n))}async function h(e){try{if(typeof crypto>`u`||!crypto.subtle||typeof crypto.subtle.verify!=`function`)return{valid:!1,reason:`Web Crypto API not available (page must be served over HTTPS)`};let t=e.trim();if(!t.startsWith(`NEAT-`))return{valid:!1,reason:`Key must start with "NEAT-" prefix`};let n=t.slice(5),r=n.indexOf(`.`);if(r===-1)return{valid:!1,reason:`Invalid key format: missing separator`};let i=n.slice(0,r),a=n.slice(r+1);if(!i||!a)return{valid:!1,reason:`Invalid key format: empty payload or signature`};let o=p(i).buffer.slice(0),s=new TextDecoder().decode(o),c=JSON.parse(s);if(!c.domain||typeof c.domain!=`string`)return{valid:!1,reason:`Invalid payload: missing domain`};if(!m(c.domain)){let e=typeof window<`u`&&window.location?window.location.hostname:`unknown`;return{valid:!1,reason:`Domain mismatch: key is for "${c.domain}" but current hostname is "${e}"`}}let l=p(a).buffer.slice(0),u=await crypto.subtle.importKey(`jwk`,f,{name:`ECDSA`,namedCurve:`P-256`},!1,[`verify`]);return await crypto.subtle.verify({name:`ECDSA`,hash:`SHA-256`},u,l,o)?{valid:!0,payload:c}:{valid:!1,reason:`Signature verification failed`}}catch(e){return{valid:!1,reason:`Unexpected error: ${e instanceof Error?e.message:String(e)}`}}}var g=`1.0.2`;function _(){console.info(`%c\u{1F308} Neat Gradients v${g}%c

Licensed under MIT + The Commons Clause.
Free for personal and commercial use.
Selling this software or its derivatives is strictly prohibited.
Get a license key to remove the watermark and this message: https://neat.firecms.co`,`font-weight: bold; font-size: 14px; color: #FF5772;`,`color: inherit;`)}var v=50,y=80,b=6,x=[[`speed`,`_speed`,20,1/20,`u`],[`horizontalPressure`,`_horizontalPressure`,4,1/4,`u`],[`verticalPressure`,`_verticalPressure`,4,1/4,`u`],[`waveFrequencyX`,`_waveFrequencyX`,25,.04,`u`],[`waveFrequencyY`,`_waveFrequencyY`,25,.04,`u`],[`waveAmplitude`,`_waveAmplitude`,1/.75,.75,`u`],[`highlights`,`_highlights`,100,1/100,`u`],[`shadows`,`_shadows`,100,1/100,`u`],[`colorSaturation`,`_saturation`,10,1/10,`u`],[`colorBlending`,`_colorBlending`,10,1/10,`u`],[`yOffsetWaveMultiplier`,`_yOffsetWaveMultiplier`,1e3,1/1e3,`u`],[`yOffsetColorMultiplier`,`_yOffsetColorMultiplier`,1e3,1/1e3,`u`],[`yOffsetFlowMultiplier`,`_yOffsetFlowMultiplier`,1e3,1/1e3,`u`],[`colorBrightness`,`_brightness`,1,1,`u`],[`grainIntensity`,`_grainIntensity`,1,1,`u`],[`grainSparsity`,`_grainSparsity`,1,1,`u`],[`grainSpeed`,`_grainSpeed`,1,1,`u`],[`wireframe`,`_wireframe`,1,1,`u`],[`backgroundAlpha`,`_backgroundAlpha`,1,1,`u`],[`flowDistortionA`,`_flowDistortionA`,1,1,`u`],[`flowDistortionB`,`_flowDistortionB`,1,1,`u`],[`flowScale`,`_flowScale`,1,1,`u`],[`flowEase`,`_flowEase`,1,1,`u`],[`flowEnabled`,`_flowEnabled`,1,1,`u`],[`textureEase`,`_textureEase`,1,1,`u`],[`silhouetteFade`,`_silhouetteFade`,1,1,`u`],[`cylinderFade`,`_cylinderFade`,1,1,`u`],[`ribbonFade`,`_ribbonFade`,1,1,`u`],[`flatShading`,`_flatShading`,1,1,`u`],[`domainWarpEnabled`,`_domainWarpEnabled`,1,1,`u`],[`domainWarpIntensity`,`_domainWarpIntensity`,1,1,`u`],[`domainWarpScale`,`_domainWarpScale`,1,1,`u`],[`vignetteIntensity`,`_vignetteIntensity`,1,1,`u`],[`vignetteRadius`,`_vignetteRadius`,1,1,`u`],[`fresnelEnabled`,`_fresnelEnabled`,1,1,`u`],[`fresnelPower`,`_fresnelPower`,1,1,`u`],[`fresnelIntensity`,`_fresnelIntensity`,1,1,`u`],[`iridescenceEnabled`,`_iridescenceEnabled`,1,1,`u`],[`iridescenceIntensity`,`_iridescenceIntensity`,1,1,`u`],[`iridescenceSpeed`,`_iridescenceSpeed`,1,1,`u`],[`bloomIntensity`,`_bloomIntensity`,1,1,`u`],[`bloomThreshold`,`_bloomThreshold`,1,1,`u`],[`chromaticAberration`,`_chromaticAberration`,1,1,`u`],[`shapeRotationX`,`_shapeRotationX`,1,1,`u`],[`shapeRotationY`,`_shapeRotationY`,1,1,`u`],[`shapeRotationZ`,`_shapeRotationZ`,1,1,`u`],[`shapeAutoRotateSpeedX`,`_shapeAutoRotateSpeedX`,1,1,`u`],[`shapeAutoRotateSpeedY`,`_shapeAutoRotateSpeedY`,1,1,`u`],[`cameraX`,`_cameraX`,1,1,`u`],[`cameraY`,`_cameraY`,1,1,`u`],[`cameraZ`,`_cameraZ`,1,1,`u`],[`cameraRotationX`,`_cameraRotationX`,1,1,`u`],[`cameraRotationY`,`_cameraRotationY`,1,1,`u`],[`cameraRotationZ`,`_cameraRotationZ`,1,1,`u`],[`textureVoidLikelihood`,`_textureVoidLikelihood`,1,1,`t`],[`textureVoidWidthMin`,`_textureVoidWidthMin`,1,1,`t`],[`textureVoidWidthMax`,`_textureVoidWidthMax`,1,1,`t`],[`textureBandDensity`,`_textureBandDensity`,1,1,`t`],[`textureColorBlending`,`_textureColorBlending`,1,1,`t`],[`textureSeed`,`_textureSeed`,1,1,`t`],[`transparentTextureVoid`,`_transparentTextureVoid`,1,1,`t`],[`proceduralBackgroundColor`,`_proceduralBackgroundColor`,1,1,`t`],[`textureShapeTriangles`,`_textureShapeTriangles`,1,1,`t`],[`textureShapeCircles`,`_textureShapeCircles`,1,1,`t`],[`textureShapeBars`,`_textureShapeBars`,1,1,`t`],[`textureShapeSquiggles`,`_textureShapeSquiggles`,1,1,`t`],[`sphereRadius`,`_sphereRadius`,1,1,`g`],[`torusRadius`,`_torusRadius`,1,1,`g`],[`torusTube`,`_torusTube`,1,1,`g`],[`cylinderRadius`,`_cylinderRadius`,1,1,`g`],[`cylinderHeight`,`_cylinderHeight`,1,1,`g`],[`planeBend`,`_planeBend`,1,1,`g`],[`planeTwist`,`_planeTwist`,1,1,`g`]],S=class{_ref;_licensed=!1;_antialias=!1;_speed=-1;_horizontalPressure=-1;_verticalPressure=-1;_waveFrequencyX=-1;_waveFrequencyY=-1;_waveAmplitude=-1;_shadows=-1;_highlights=-1;_saturation=-1;_brightness=-1;_grainScale=-1;_grainIntensity=-1;_grainSparsity=-1;_grainSpeed=-1;_colorBlending=-1;_resolution=1;_colors=[];_wireframe=!1;_backgroundColor=`#FFFFFF`;_backgroundColorRgb=[1,1,1];_backgroundAlpha=1;_flowDistortionA=0;_flowDistortionB=0;_flowScale=1;_flowEase=0;_flowEnabled=!0;glState;_enableProceduralTexture=!1;_textureVoidLikelihood=.45;_textureVoidWidthMin=200;_textureVoidWidthMax=486;_textureBandDensity=2.15;_textureColorBlending=.01;_textureSeed=333;_textureEase=.5;_transparentTextureVoid=!1;_domainWarpEnabled=!1;_domainWarpIntensity=.5;_domainWarpScale=1;_vignetteIntensity=.5;_vignetteRadius=.8;_fresnelEnabled=!1;_fresnelPower=2;_fresnelIntensity=.5;_fresnelColor=`#FFFFFF`;_fresnelColorRgb=[1,1,1];_iridescenceEnabled=!1;_iridescenceIntensity=.5;_iridescenceSpeed=1;_bloomIntensity=0;_bloomThreshold=.7;_chromaticAberration=0;_silhouetteFade=.25;_cylinderFade=.08;_ribbonFade=.05;_flatShading=!0;_shapeType=`plane`;_shapeRotationX=0;_shapeRotationY=0;_shapeRotationZ=0;_shapeAutoRotateSpeedX=0;_shapeAutoRotateSpeedY=0;_sphereRadius=15;_torusRadius=15;_torusTube=5;_cylinderRadius=10;_cylinderHeight=40;_planeBend=0;_planeTwist=0;_cameraLock=!1;_cameraX=0;_cameraY=0;_cameraZ=0;_cameraRotationX=0;_cameraRotationY=0;_cameraRotationZ=0;_cameraZoom=1;_proceduralTexture=null;_proceduralBackgroundColor=`#000000`;_textureShapeTriangles=20;_textureShapeCircles=15;_textureShapeBars=15;_textureShapeSquiggles=10;requestRef=-1;sizeObserver;_currentCursor=``;_initialized=!1;_cachedColorRgb=[];_yOffset=0;_yOffsetWaveMultiplier=.004;_yOffsetColorMultiplier=.004;_yOffsetFlowMultiplier=.004;_sourceCanvas=null;_sourceCtx=null;_maskedCanvas=null;_maskedCtx=null;_resizeTimeoutId=null;_textureNeedsUpdate=!1;_colorsChanged=!0;_uniformsDirty=!0;_textureDirty=!0;_yOffsetDirty=!1;_modelViewMatrix=new i;_isVisible=!0;_visibilityObserver=null;_visibilityHandler=null;_watermarkProgram=null;_watermarkTexture=null;_watermarkBuffer=null;_watermarkTexCoordBuffer=null;_watermarkWidth=0;_watermarkHeight=0;_watermarkMargin=4;_wmLocPos=-1;_wmLocTc=-1;_wmLocTex=null;_wmPosData=new Float32Array(8);_wmClickHandler=null;_wmMoveHandler=null;_wmMoveRafPending=!1;_wmCachedRect=null;_wmRectCacheTime=0;_gradientVAO=null;_watermarkVAO=null;constructor(e){let{ref:t,speed:n=4,horizontalPressure:r=3,verticalPressure:i=3,waveFrequencyX:a=5,waveFrequencyY:s=5,waveAmplitude:c=3,colors:l,highlights:u=4,shadows:d=4,colorSaturation:f=0,colorBrightness:p=1,colorBlending:m=5,grainScale:g=2,grainIntensity:x=.55,grainSparsity:S=0,grainSpeed:T=.1,wireframe:E=!1,backgroundColor:D=`#FFFFFF`,backgroundAlpha:O=1,resolution:k=1,seed:A,yOffset:j=0,yOffsetWaveMultiplier:M=4,yOffsetColorMultiplier:N=4,yOffsetFlowMultiplier:P=4,flowDistortionA:F=0,flowDistortionB:I=0,flowScale:L=1,flowEase:R=0,flowEnabled:z=!0,enableProceduralTexture:B=!1,textureVoidLikelihood:V=.45,textureVoidWidthMin:H=200,textureVoidWidthMax:U=486,textureBandDensity:W=2.15,textureColorBlending:ee=.01,textureSeed:te=333,textureEase:ne=.5,proceduralBackgroundColor:re=`#000000`,transparentTextureVoid:ie=!1,textureShapeTriangles:ae=20,textureShapeCircles:G=15,textureShapeBars:K=15,textureShapeSquiggles:q=10,domainWarpEnabled:J=!1,domainWarpIntensity:oe=.5,domainWarpScale:se=1,vignetteIntensity:ce=0,vignetteRadius:le=.8,fresnelEnabled:ue=!1,fresnelPower:de=2,fresnelIntensity:fe=.5,fresnelColor:pe=`#FFFFFF`,iridescenceEnabled:me=!1,iridescenceIntensity:he=.5,iridescenceSpeed:ge=1,bloomIntensity:_e=0,bloomThreshold:ve=.7,chromaticAberration:ye=0,silhouetteFade:be=.25,cylinderFade:xe=.08,ribbonFade:Se=.05,flatShading:Ce=!0,cameraLock:we=!1,cameraX:Te=0,cameraY:Ee=0,cameraZ:De=0,cameraRotationX:Oe=0,cameraRotationY:ke=0,cameraRotationZ:Ae=0,cameraZoom:je=1,shapeType:Me=`plane`,shapeRotationX:Ne=0,shapeRotationY:Pe=0,shapeRotationZ:Fe=0,shapeAutoRotateSpeedX:Ie=0,shapeAutoRotateSpeedY:Le=0,sphereRadius:Re=15,torusRadius:Y=15,torusTube:ze=5,cylinderRadius:Be=10,cylinderHeight:Ve=40,planeBend:He=0,planeTwist:Ue=0,licenseKey:X,preserveDrawingBuffer:We=!1,antialias:Ge=!1}=e;this._ref=t,this._antialias=Ge,this.destroy=this.destroy.bind(this),this._initScene=this._initScene.bind(this),this.speed=n,this.horizontalPressure=r,this.verticalPressure=i,this.waveFrequencyX=a,this.waveFrequencyY=s,this.waveAmplitude=c,this.colorBlending=m,this._resolution=k,this.grainScale=g,this.grainIntensity=x,this.grainSparsity=S,this.grainSpeed=T,this.colors=l,this.shadows=d,this.highlights=u,this.colorSaturation=f,this.colorBrightness=p,this.wireframe=E,this.backgroundColor=D,this.backgroundAlpha=O,this.yOffset=j,this.yOffsetWaveMultiplier=M,this.yOffsetColorMultiplier=N,this.yOffsetFlowMultiplier=P,this.flowDistortionA=F,this.flowDistortionB=I,this.flowScale=L,this.flowEase=R,this.flowEnabled=z,this.enableProceduralTexture=B,this.textureVoidLikelihood=V,this.textureVoidWidthMin=H,this.textureVoidWidthMax=U,this.textureBandDensity=W,this.textureColorBlending=ee,this.textureSeed=te,this.textureEase=ne,this._proceduralBackgroundColor=re,this.transparentTextureVoid=ie,this._textureShapeTriangles=ae,this._textureShapeCircles=G,this._textureShapeBars=K,this._textureShapeSquiggles=q,this.domainWarpEnabled=J,this.domainWarpIntensity=oe,this.domainWarpScale=se,this.vignetteIntensity=ce,this.vignetteRadius=le,this.fresnelEnabled=ue,this.fresnelPower=de,this.fresnelIntensity=fe,this.fresnelColor=pe,this.iridescenceEnabled=me,this.iridescenceIntensity=he,this.iridescenceSpeed=ge,this.bloomIntensity=_e,this.bloomThreshold=ve,this.chromaticAberration=ye,this.silhouetteFade=be,this.cylinderFade=xe,this.ribbonFade=Se,this._flatShading=Ce,this._cameraLock=we,this._cameraX=Te,this._cameraY=Ee,this._cameraZ=De,this._cameraRotationX=Oe,this._cameraRotationY=ke,this._cameraRotationZ=Ae,this._cameraZoom=je,this._shapeType=Me,this._shapeRotationX=Ne,this._shapeRotationY=Pe,this._shapeRotationZ=Fe,this._shapeAutoRotateSpeedX=Ie,this._shapeAutoRotateSpeedY=Le,this._sphereRadius=Re,this._torusRadius=Y,this._torusTube=ze,this._cylinderRadius=Be,this._cylinderHeight=Ve,this._planeBend=He,this._planeTwist=Ue,this.glState=this._initScene(k,We),this._initWatermark(),w(),X?h(X).then(e=>{this._licensed=e.valid,e.valid||(console.warn(`NEAT license key error: ${e.reason}`),_())}):_();let Z=A===void 0?C():A,Q=performance.now(),$=()=>{let{gl:e,program:t,locations:n,indexCount:r,indexType:i}=this.glState;if(this._initialized){let r=performance.now();Z+=(r-Q)/1e3*this._speed,Q=r,e.useProgram(t),e.uniform1f(n.uniforms.u_time,Z);let i=this.glState.camera,a=this._modelViewMatrix;a.identity(),a.translate(-i.position[0]-this._cameraX,-i.position[1]-this._cameraY,-i.position[2]-this._cameraZ),a.translate(0,0,-1),a.rotateX(-this._cameraRotationX),a.rotateY(-this._cameraRotationY),a.rotateZ(-this._cameraRotationZ);let o=this._shapeRotationX,s=this._shapeRotationY,c=this._shapeRotationZ;this._shapeAutoRotateSpeedX!==0&&(o+=Z*this._shapeAutoRotateSpeedX*.1),this._shapeAutoRotateSpeedY!==0&&(s+=Z*this._shapeAutoRotateSpeedY*.1),this._shapeType===`plane`||this._shapeType===`ribbon`?a.rotateX(o-Math.PI/3.5):a.rotateX(o),a.rotateY(s),a.rotateZ(c);let l=n.uniforms.modelViewMatrix;if(l&&e.uniformMatrix4fv(l,!1,a.elements),this._yOffsetDirty&&!this._uniformsDirty&&(e.uniform1f(n.uniforms.u_y_offset,this._yOffset),this._yOffsetDirty=!1),this._uniformsDirty){e.uniform2f(n.uniforms.u_resolution,this._ref.width,this._ref.height),e.uniform2f(n.uniforms.u_color_pressure,this._horizontalPressure,this._verticalPressure),e.uniform1f(n.uniforms.u_wave_frequency_x,this._waveFrequencyX),e.uniform1f(n.uniforms.u_wave_frequency_y,this._waveFrequencyY),e.uniform1f(n.uniforms.u_wave_amplitude,this._waveAmplitude),e.uniform1f(n.uniforms.u_color_blending,this._colorBlending),e.uniform1f(n.uniforms.u_shadows,this._shadows),e.uniform1f(n.uniforms.u_highlights,this._highlights),e.uniform1f(n.uniforms.u_saturation,this._saturation),e.uniform1f(n.uniforms.u_brightness,this._brightness),e.uniform1f(n.uniforms.u_grain_intensity,this._grainIntensity),e.uniform1f(n.uniforms.u_grain_sparsity,this._grainSparsity),e.uniform1f(n.uniforms.u_grain_speed,this._grainSpeed),e.uniform1f(n.uniforms.u_grain_scale,this._grainScale),e.uniform1f(n.uniforms.u_y_offset,this._yOffset),e.uniform1f(n.uniforms.u_y_offset_wave_multiplier,this._yOffsetWaveMultiplier),e.uniform1f(n.uniforms.u_y_offset_color_multiplier,this._yOffsetColorMultiplier),e.uniform1f(n.uniforms.u_y_offset_flow_multiplier,this._yOffsetFlowMultiplier),e.uniform1f(n.uniforms.u_flow_distortion_a,this._flowDistortionA),e.uniform1f(n.uniforms.u_flow_distortion_b,this._flowDistortionB),e.uniform1f(n.uniforms.u_flow_scale,this._flowScale),e.uniform1f(n.uniforms.u_flow_ease,this._flowEase),e.uniform1f(n.uniforms.u_flow_enabled,+!!this._flowEnabled);let t=0;this._shapeType===`sphere`?t=1:this._shapeType===`torus`?t=2:this._shapeType===`cylinder`?t=3:this._shapeType===`ribbon`&&(t=4),e.uniform1f(n.uniforms.u_shape_type,t),e.uniform1f(n.uniforms.u_enable_procedural_texture,+!!this._enableProceduralTexture),e.uniform1f(n.uniforms.u_texture_ease,this._textureEase),e.uniform1f(n.uniforms.u_transparent_texture_void,+!!this._transparentTextureVoid),e.uniform1f(n.uniforms.u_domain_warp_enabled,+!!this._domainWarpEnabled),e.uniform1f(n.uniforms.u_domain_warp_intensity,this._domainWarpIntensity),e.uniform1f(n.uniforms.u_domain_warp_scale,this._domainWarpScale),e.uniform1f(n.uniforms.u_vignette_intensity,this._vignetteIntensity),e.uniform1f(n.uniforms.u_vignette_radius,this._vignetteRadius),e.uniform1f(n.uniforms.u_fresnel_enabled,+!!this._fresnelEnabled),e.uniform1f(n.uniforms.u_fresnel_power,this._fresnelPower),e.uniform1f(n.uniforms.u_fresnel_intensity,this._fresnelIntensity),e.uniform3fv(n.uniforms.u_fresnel_color,this._fresnelColorRgb),e.uniform1f(n.uniforms.u_iridescence_enabled,+!!this._iridescenceEnabled),e.uniform1f(n.uniforms.u_iridescence_intensity,this._iridescenceIntensity),e.uniform1f(n.uniforms.u_iridescence_speed,this._iridescenceSpeed),e.uniform1f(n.uniforms.u_bloom_intensity,this._bloomIntensity),e.uniform1f(n.uniforms.u_bloom_threshold,this._bloomThreshold),e.uniform1f(n.uniforms.u_chromatic_aberration,this._chromaticAberration),e.uniform1f(n.uniforms.u_silhouette_fade,this._silhouetteFade),e.uniform1f(n.uniforms.u_cylinder_fade,this._cylinderFade),e.uniform1f(n.uniforms.u_ribbon_fade,this._ribbonFade),e.uniform1f(n.uniforms.u_flat_shading,+!!this._flatShading),this._uniformsDirty=!1,this._yOffsetDirty=!1}if(this._textureNeedsUpdate&&this._enableProceduralTexture&&(this._proceduralTexture&&e.deleteTexture(this._proceduralTexture),this._proceduralTexture=this._createProceduralTexture(e),this._textureNeedsUpdate=!1,this._textureDirty=!0),this._textureDirty&&this._proceduralTexture&&(e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,this._proceduralTexture),e.uniform1i(n.uniforms.u_procedural_texture,1),this._textureDirty=!1),this._colorsChanged){this._colorsChanged=!1;for(let t=0;t<b;t++)if(t<this._colors.length){let r=this._colors[t],i=this._cachedColorRgb[t]||[0,0,0];e.uniform1f(n.uniforms[`u_colors[${t}].is_active`],+!!r.enabled),e.uniform3fv(n.uniforms[`u_colors[${t}].color`],i),e.uniform1f(n.uniforms[`u_colors[${t}].influence`],r.influence||0)}else e.uniform1f(n.uniforms[`u_colors[${t}].is_active`],0);e.uniform1i(n.uniforms.u_colors_count,b)}}e.clearColor(this._backgroundColorRgb[0],this._backgroundColorRgb[1],this._backgroundColorRgb[2],this._backgroundAlpha),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),this._wireframe?(e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.glState.buffers.wireframeIndex),e.drawElements(e.LINES,this.glState.wireframeIndexCount,i,0),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.glState.buffers.index)):e.drawElements(e.TRIANGLES,r,i,0),this._licensed||this._renderWatermark(e),this._isVisible&&(this.requestRef=requestAnimationFrame($))};this._visibilityObserver=new IntersectionObserver(e=>{let t=this._isVisible;this._isVisible=e[0].isIntersecting&&document.visibilityState!==`hidden`,this._isVisible&&!t&&(Q=performance.now(),this.requestRef=requestAnimationFrame($))},{threshold:0}),this._visibilityObserver.observe(t),this._visibilityHandler=()=>{let e=this._isVisible;document.visibilityState===`hidden`?this._isVisible=!1:(this._isVisible=!0,e||(Q=performance.now(),this.requestRef=requestAnimationFrame($)))},document.addEventListener(`visibilitychange`,this._visibilityHandler);let Ke=(e,t)=>{if(this._ref.width===e&&this._ref.height===t)return;let{gl:n,camera:r}=this.glState;this._ref.width=e,this._ref.height=t,n.viewport(0,0,e,t),o(r,e,t,v,y,this._shapeType,this._cameraZoom);let i=this.glState.locations.uniforms.projectionMatrix;n.useProgram(this.glState.program),i&&n.uniformMatrix4fv(i,!1,r.projectionMatrix.elements),this._uniformsDirty=!0,$()};this.sizeObserver=new ResizeObserver(e=>{let t=e[e.length-1],n=Math.round(t.contentRect.width),r=Math.round(t.contentRect.height);this._resizeTimeoutId!==null&&clearTimeout(this._resizeTimeoutId),this._resizeTimeoutId=window.setTimeout(()=>{Ke(n,r),this._resizeTimeoutId=null,this._wmCachedRect=null},100)}),this.sizeObserver.observe(t),$()}destroy(){if(cancelAnimationFrame(this.requestRef),this.sizeObserver.disconnect(),this._visibilityObserver&&=(this._visibilityObserver.disconnect(),null),this._visibilityHandler&&=(document.removeEventListener(`visibilitychange`,this._visibilityHandler),null),this._resizeTimeoutId!==null&&(clearTimeout(this._resizeTimeoutId),this._resizeTimeoutId=null),this._wmClickHandler&&=(document.removeEventListener(`click`,this._wmClickHandler,!0),null),this._wmMoveHandler&&=(document.removeEventListener(`mousemove`,this._wmMoveHandler),null),this.glState){let e=this.glState.gl;e.deleteProgram(this.glState.program),e.deleteBuffer(this.glState.buffers.position),e.deleteBuffer(this.glState.buffers.normal),e.deleteBuffer(this.glState.buffers.uv),e.deleteBuffer(this.glState.buffers.index),e.deleteBuffer(this.glState.buffers.wireframeIndex),this._watermarkProgram&&e.deleteProgram(this._watermarkProgram),this._watermarkTexture&&e.deleteTexture(this._watermarkTexture),this._watermarkBuffer&&e.deleteBuffer(this._watermarkBuffer),this._watermarkTexCoordBuffer&&e.deleteBuffer(this._watermarkTexCoordBuffer);let t=e;t.deleteVertexArray&&(this._gradientVAO&&t.deleteVertexArray(this._gradientVAO),this._watermarkVAO&&t.deleteVertexArray(this._watermarkVAO))}this._proceduralTexture&&this.glState&&this.glState.gl.deleteTexture(this._proceduralTexture)}get colors(){return this._colors}set colors(e){this._uniformsDirty=!0,this._colors=e,this._cachedColorRgb=e.map(e=>this._hexToRgb(e.color)),this._colorsChanged=!0}get grainScale(){return this._grainScale}set grainScale(e){this._uniformsDirty=!0,this._grainScale=e==0?1:e}get resolution(){return this._resolution}set resolution(e){this._resolution!==e&&(this._resolution=e,this._updateGeometry())}get antialias(){return this._antialias}set antialias(e){this._antialias!==e&&(this._antialias=e,console.warn(`NeatGradient: Changing 'antialias' at runtime is not supported because the WebGL context is already created. Recreate the NeatGradient instance to apply this change.`))}get backgroundColor(){return this._backgroundColor}set backgroundColor(e){this._uniformsDirty=!0,this._backgroundColor=e,this._backgroundColorRgb=this._hexToRgb(e)}get yOffset(){return this._yOffset}set yOffset(e){this._yOffset!==e&&(this._yOffsetDirty=!0,this._yOffset=e)}get enableProceduralTexture(){return this._enableProceduralTexture}set enableProceduralTexture(e){this._uniformsDirty=!0,this._enableProceduralTexture=e,e&&!this._proceduralTexture&&(this._textureNeedsUpdate=!0)}_updateGeometry(){if(!this.glState)return;let e=this.glState.gl,t=this._resolution||1,n;n=this._shapeType===`sphere`?c(this._sphereRadius,120*t,120*t):this._shapeType===`torus`?l(this._torusRadius,this._torusTube,120*t,120*t):this._shapeType===`cylinder`?u(this._cylinderRadius,this._cylinderRadius,this._cylinderHeight,120*t,120*t):this._shapeType===`ribbon`?d(v,y,240*t,240*t,this._planeBend,this._planeTwist):s(v,y,240*t,240*t);let{position:r,normal:i,uv:a,index:f,wireframeIndex:p}=n;e.bindBuffer(e.ARRAY_BUFFER,this.glState.buffers.position),e.bufferData(e.ARRAY_BUFFER,r,e.STATIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,this.glState.buffers.normal),e.bufferData(e.ARRAY_BUFFER,i,e.STATIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,this.glState.buffers.uv),e.bufferData(e.ARRAY_BUFFER,a,e.STATIC_DRAW),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.glState.buffers.index),e.bufferData(e.ELEMENT_ARRAY_BUFFER,f,e.STATIC_DRAW),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.glState.buffers.wireframeIndex),e.bufferData(e.ELEMENT_ARRAY_BUFFER,p,e.STATIC_DRAW),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.glState.buffers.index),this.glState.indexCount=f.length,this.glState.wireframeIndexCount=p.length,this.glState.indexType=f instanceof Uint32Array?e.UNSIGNED_INT:e.UNSIGNED_SHORT;let m=this._ref.width,h=this._ref.height;o(this.glState.camera,m,h,v,y,this._shapeType,this._cameraZoom);let g=this.glState.locations.uniforms.projectionMatrix;e.useProgram(this.glState.program),g&&e.uniformMatrix4fv(g,!1,this.glState.camera.projectionMatrix.elements),this._uniformsDirty=!0}_hexToRgb(e){let t=parseInt(e.replace(`#`,``),16);return[(t>>16&255)/255,(t>>8&255)/255,(t&255)/255]}_initScene(i,f=!1){let p=this._ref.width,m=this._ref.height;(p===0||m===0||p===300&&m===150)&&(p=this._ref.clientWidth||300,m=this._ref.clientHeight||150,this._ref.width=p,this._ref.height=m);let h=this._ref.getContext(`webgl2`,{alpha:!0,preserveDrawingBuffer:f,antialias:this._antialias})||this._ref.getContext(`webgl`,{alpha:!0,preserveDrawingBuffer:f,antialias:this._antialias});if(!h)throw Error(`WebGL not supported`);h.getExtension(`OES_standard_derivatives`),h.getExtension(`OES_element_index_uint`),h.viewport(0,0,p,m);let g;g=this._shapeType===`sphere`?c(this._sphereRadius,120*i,120*i):this._shapeType===`torus`?l(this._torusRadius,this._torusTube,120*i,120*i):this._shapeType===`cylinder`?u(this._cylinderRadius,this._cylinderRadius,this._cylinderHeight,120*i,120*i):this._shapeType===`ribbon`?d(v,y,240*i,240*i,this._planeBend,this._planeTwist):s(v,y,240*i,240*i);let{position:_,normal:x,uv:S,index:C,wireframeIndex:w}=g,T=h.createBuffer();h.bindBuffer(h.ARRAY_BUFFER,T),h.bufferData(h.ARRAY_BUFFER,_,h.STATIC_DRAW);let E=h.createBuffer();h.bindBuffer(h.ARRAY_BUFFER,E),h.bufferData(h.ARRAY_BUFFER,x,h.STATIC_DRAW);let D=h.createBuffer();h.bindBuffer(h.ARRAY_BUFFER,D),h.bufferData(h.ARRAY_BUFFER,S,h.STATIC_DRAW);let O=h.createBuffer();h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,O),h.bufferData(h.ELEMENT_ARRAY_BUFFER,C,h.STATIC_DRAW);let k=h.createBuffer();h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,k),h.bufferData(h.ELEMENT_ARRAY_BUFFER,w,h.STATIC_DRAW),h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,O);let A=e()+`
`+n()+`
`+r()+`
void main() {
vUv = uv;
vPosition = position;
float waveOffset = -u_y_offset * u_y_offset_wave_multiplier;
float colorOffset = -u_y_offset * u_y_offset_color_multiplier;
float flowOffset = -u_y_offset * u_y_offset_flow_multiplier;
v_displacement_amount = cnoise( vec3(
u_wave_frequency_x * position.x + u_time,
u_wave_frequency_y * (position.y + waveOffset) + u_time,
u_time
));
vec2 baseUv = vUv;
baseUv.y += flowOffset / u_plane_height;
vec2 flowUv = baseUv;
if (u_flow_enabled > 0.5) {
if (u_flow_ease > 0.0 || u_flow_distortion_a > 0.0) {
vec2 ppp = -1.0 + 2.0 * baseUv;
ppp += 0.1 * cos((1.5 * u_flow_scale) * ppp.yx + 1.1 * u_time + vec2(0.1, 1.1));
ppp += 0.1 * cos((2.3 * u_flow_scale) * ppp.yx + 1.3 * u_time + vec2(3.2, 3.4));
ppp += 0.1 * cos((2.2 * u_flow_scale) * ppp.yx + 1.7 * u_time + vec2(1.8, 5.2));
ppp += u_flow_distortion_a * cos((u_flow_distortion_b * u_flow_scale) * ppp.yx + 1.4 * u_time + vec2(6.3, 3.9));
float r = length(ppp);
flowUv = mix(baseUv, vec2(baseUv.x * (1.0 - u_flow_ease) + r * u_flow_ease, baseUv.y), u_flow_ease);
}
}
vFlowUv = flowUv;
vec3 color = u_colors[0].color;
vec3 distortedPos = position;
if (u_flat_shading < 0.5) {
if (u_flow_enabled > 0.5) {
if (u_flow_ease > 0.0 || u_flow_distortion_a > 0.0) {
vec3 ppp = position / 25.0;
ppp.xyz += 0.1 * cos((1.5 * u_flow_scale) * ppp.yxz + 1.1 * u_time + vec3(0.1, 1.1, 2.1));
ppp.xyz += 0.1 * cos((2.3 * u_flow_scale) * ppp.zxy + 1.3 * u_time + vec3(3.2, 3.4, 1.2));
ppp.xyz += 0.1 * cos((2.2 * u_flow_scale) * ppp.yxz + 1.7 * u_time + vec3(1.8, 5.2, 3.1));
ppp.xyz += u_flow_distortion_a * cos((u_flow_distortion_b * u_flow_scale) * ppp.zxy + 1.4 * u_time + vec3(6.3, 3.9, 4.5));
float r = length(ppp);
distortedPos = mix(position, vec3(
position.x * (1.0 - u_flow_ease) + r * u_flow_ease * 25.0,
position.y,
position.z * (1.0 - u_flow_ease) + r * u_flow_ease * 25.0
), u_flow_ease);
}
}
}
vec3 noise_cord;
if (u_flat_shading < 0.5) {
noise_cord = vec3(distortedPos.x / 50.0, (distortedPos.y + colorOffset) / 50.0, distortedPos.z / 50.0);
} else {
vec2 adjustedUv = flowUv;
adjustedUv.y += colorOffset / u_plane_height;
noise_cord = vec3(adjustedUv, 0.0);
}
const float minNoise = .0;
const float maxNoise = .9;
for (int i = 1; i < 6; i++) {
if (i < u_colors_count) {
if (u_colors[i].is_active > 0.5) {
float noiseFlow = (1. + float(i)) / 30.;
float noiseSpeed = (1. + float(i)) * 0.11;
float noiseSeed = 13. + float(i) * 7.;
float noise_z = u_time * noiseSpeed;
if (u_flat_shading < 0.5) {
noise_z = noise_cord.z * u_color_pressure.x * u_color_pressure.x + u_time * noiseSpeed;
}
float noise = snoise(
vec3(
noise_cord.x * u_color_pressure.x * u_color_pressure.x + u_time * noiseFlow * 2.,
noise_cord.y * u_color_pressure.y * u_color_pressure.y,
noise_z
) + noiseSeed
) - (.1 * float(i)) + (.5 * u_color_blending);
noise = clamp(noise, minNoise, maxNoise + float(i) * 0.02);
color = mix(color, u_colors[i].color, smoothstep(0.0, u_color_blending, noise));
}
}
}
v_color = color;
vec3 newPosition = position + normal * v_displacement_amount * u_wave_amplitude;
vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
vViewPosition = mvPosition.xyz;
vNormal = normalize((modelViewMatrix * vec4(normal, 0.0)).xyz);
gl_Position = projectionMatrix * mvPosition;
v_new_position = gl_Position;
}`,j=h.createShader(h.VERTEX_SHADER);h.shaderSource(j,A),h.compileShader(j),h.getShaderParameter(j,h.COMPILE_STATUS)||(console.log(`VERTEX_SHADER_ERROR_START`),console.log(`Vertex shader error: `,h.getShaderInfoLog(j)),console.log(`GL Error Code:`,h.getError()),console.log(`Vertex Shader Source Dump:`),console.log(A.split(`
`).map((e,t)=>`${t+1}: ${e}`).join(`
`)),console.log(`VERTEX_SHADER_ERROR_END`));let M=t()+`
`+r()+`
`+n()+`
float random(vec2 p) {
return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453);
}
float fbm(vec3 x) {
float value = 0.0;
float amplitude = 0.5;
float frequency = 1.0;
for (int i = 0; i < 2; i++) {
value += amplitude * snoise(x * frequency);
frequency *= 2.0;
amplitude *= 0.5;
}
return value;
}
vec3 hsl2rgb(float h, float s, float l) {
vec3 rgb = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
return l + s * (rgb - 0.5) * (1.0 - abs(2.0 * l - 1.0));
}
void main() {
vec2 finalUv = vFlowUv;
vec3 baseColor;
float texAlpha = 1.0;
if (u_enable_procedural_texture > 0.5) {
if (u_flat_shading < 0.5) {
float parallaxFactor = 0.25;
float scrollOffset = (u_y_offset * u_y_offset_color_multiplier) * parallaxFactor;
vec3 scrolledPos = vPosition;
scrolledPos.y -= scrollOffset;
vec3 p = (scrolledPos * 1.5) / 50.0;
vec2 uvX = p.yz + vec2(0.5);
vec2 uvY = p.zx + vec2(0.5);
vec2 uvZ = p.xy + vec2(0.5);
vec4 colX = texture2D(u_procedural_texture, uvX);
vec4 colY = texture2D(u_procedural_texture, uvY);
vec4 colZ = texture2D(u_procedural_texture, uvZ);
vec3 n = normalize(vNormal);
vec3 blendWeights = abs(n);
blendWeights = blendWeights / (blendWeights.x + blendWeights.y + blendWeights.z + 0.0001);
vec4 texSample = colX * blendWeights.x + colY * blendWeights.y + colZ * blendWeights.z;
baseColor = texSample.rgb;
if (u_transparent_texture_void > 0.5) {
texAlpha = texSample.a;
}
} else {
vec2 ppp = -1.0 + 2.0 * finalUv;
ppp += 0.1 * cos((1.5 * u_flow_scale) * ppp.yx + 1.1 * u_time + vec2(0.1, 1.1));
ppp += 0.1 * cos((2.3 * u_flow_scale) * ppp.yx + 1.3 * u_time + vec2(3.2, 3.4));
ppp += 0.1 * cos((2.2 * u_flow_scale) * ppp.yx + 1.7 * u_time + vec2(1.8, 5.2));
ppp += u_flow_distortion_a * cos((u_flow_distortion_b * u_flow_scale) * ppp.yx + 1.4 * u_time + vec2(6.3, 3.9));
float r = length(ppp);
float vx = (finalUv.x * u_texture_ease) + (r * (1.0 - u_texture_ease));
float vy = (finalUv.y * u_texture_ease) + (0.0 * (1.0 - u_texture_ease));
vec2 texUv = vec2(vx, vy);
float parallaxFactor = 0.25;
texUv.y -= (u_y_offset * u_y_offset_color_multiplier / u_plane_height) * parallaxFactor;
texUv *= 1.5;
vec4 texSample = texture2D(u_procedural_texture, texUv);
baseColor = texSample.rgb;
if (u_transparent_texture_void > 0.5) {
texAlpha = texSample.a;
}
}
} else {
baseColor = v_color;
}
vec3 color = baseColor;
if (u_domain_warp_enabled > 0.5) {
vec3 p;
if (u_flat_shading < 0.5) {
p = vec3((vPosition / 50.0 + vec3(0.5)) * u_domain_warp_scale);
p.z += u_time * 0.15;
} else {
p = vec3(finalUv * u_domain_warp_scale, u_time * 0.15);
}
vec2 q = vec2(fbm(p), fbm(p + vec3(5.2, 1.3, 0.0)));
float f = fbm(p + vec3(4.0 * q, 0.0));
vec3 warpColor = color * (1.0 + f * 0.8 * u_domain_warp_intensity);
float pattern = clamp(f * f * f + 0.6 * f * f + 0.5 * f, 0.0, 1.0);
color = mix(color, warpColor * (0.6 + pattern * 0.8), u_domain_warp_intensity * 0.7);
}
vec3 normal = normalize(vNormal);
vec3 viewDir = vec3(0.0, 0.0, 1.0);
float ndotv = dot(normal, viewDir);
if (u_shape_type > 0.5 && u_shape_type < 3.5) {
if (ndotv < 0.0) {
discard;
}
} else {
if (ndotv < 0.0) {
normal = -normal;
ndotv = -ndotv;
}
}
vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
float diffuse = max(dot(normal, lightDir), 0.0);
vec3 halfDir = normalize(lightDir + viewDir);
float specular = pow(max(dot(normal, halfDir), 0.0), 32.0);
if (u_flat_shading > 0.5) {
color += v_displacement_amount * u_highlights;
float heightShadow = 1.0 - v_displacement_amount;
color -= heightShadow * heightShadow * u_shadows;
} else {
color += specular * u_highlights;
color += v_displacement_amount * u_highlights * 0.5;
float heightShadow = 1.0 - v_displacement_amount;
color -= heightShadow * heightShadow * u_shadows * 0.5;
color -= (1.0 - diffuse) * u_shadows * 0.5;
}
color = saturation(color, 1.0 + u_saturation);
color = color * u_brightness;
if (u_iridescence_enabled > 0.5) {
float hue = fract(v_displacement_amount * 0.5 + 0.5 + u_time * u_iridescence_speed * 0.05);
vec3 iriColor = hsl2rgb(hue, 0.8, 0.6);
color = mix(color, iriColor, u_iridescence_intensity * abs(v_displacement_amount) * 0.6);
}
if (u_fresnel_enabled > 0.5) {
float slope = 1.0 - abs(v_displacement_amount);
float fresnel = pow(max(slope, 0.0), u_fresnel_power);
color += u_fresnel_color * fresnel * u_fresnel_intensity;
}
if (u_vignette_intensity > 0.0) {
vec2 vigUv = vUv;
if (u_flat_shading < 0.5) {
vigUv = (v_new_position.xy / v_new_position.w) * 0.5 + vec2(0.5);
}
float dist = length(vigUv - vec2(0.5));
float vig = smoothstep(u_vignette_radius, u_vignette_radius * 0.3, dist);
color *= mix(1.0, vig, u_vignette_intensity);
}
if (u_bloom_intensity > 0.0) {
float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
float bloomMask = smoothstep(u_bloom_threshold, 1.0, luma);
color += color * bloomMask * u_bloom_intensity;
}
if (u_chromatic_aberration > 0.0) {
float caAmount = u_chromatic_aberration * 0.008;
vec2 caUv = vUv;
if (u_flat_shading < 0.5) {
caUv = (v_new_position.xy / v_new_position.w) * 0.5 + vec2(0.5);
}
float dist = length(caUv - vec2(0.5));
float rShift = v_displacement_amount + caAmount * dist;
float bShift = v_displacement_amount - caAmount * dist;
color.r *= 1.0 + rShift * caAmount * 10.0;
color.b *= 1.0 - bShift * caAmount * 10.0;
}
float grain = 0.0;
if (u_grain_intensity > 0.0) {
vec2 noiseCoords = gl_FragCoord.xy / u_grain_scale;
if (u_grain_speed != 0.0 || u_flat_shading > 0.5) {
grain = fbm(vec3(noiseCoords, u_time * u_grain_speed));
} else {
grain = random(noiseCoords) - 0.5;
}
grain = grain * 0.5 + 0.5;
grain -= 0.5;
grain = (grain > u_grain_sparsity) ? grain : 0.0;
grain *= u_grain_intensity;
}
color += vec3(grain);
float edgeAlpha = 1.0;
if (u_silhouette_fade > 0.0 && u_flat_shading < 0.5) {
edgeAlpha = smoothstep(0.0, u_silhouette_fade, ndotv);
}
if (u_shape_type == 3.0) {
float vFade = smoothstep(0.0, u_cylinder_fade, vUv.y) * smoothstep(1.0, 1.0 - u_cylinder_fade, vUv.y);
edgeAlpha *= vFade;
} else if (u_shape_type == 4.0) {
float uFade = smoothstep(0.0, u_ribbon_fade, vUv.x) * smoothstep(1.0, 1.0 - u_ribbon_fade, vUv.x);
float vFade = smoothstep(0.0, u_ribbon_fade, vUv.y) * smoothstep(1.0, 1.0 - u_ribbon_fade, vUv.y);
edgeAlpha *= uFade * vFade;
}
edgeAlpha *= texAlpha;
gl_FragColor = vec4(color, edgeAlpha);
}`,N=h.createShader(h.FRAGMENT_SHADER);h.shaderSource(N,M),h.compileShader(N),h.getShaderParameter(N,h.COMPILE_STATUS)||(console.log(`FRAGMENT_SHADER_ERROR_START`),console.log(`Fragment shader error: `,h.getShaderInfoLog(N)),console.log(`GL Error Code:`,h.getError()),console.log(`Fragment Shader Source Dump:`),console.log(M.split(`
`).map((e,t)=>`${t+1}: ${e}`).join(`
`)),console.log(`FRAGMENT_SHADER_ERROR_END`));let P=h.createProgram();h.attachShader(P,j),h.attachShader(P,N),h.linkProgram(P),h.getProgramParameter(P,h.LINK_STATUS)||(console.log(`PROGRAM_LINK_ERROR_START`),console.log(`Program linking error: `,h.getProgramInfoLog(P)),console.log(`GL Error Code:`,h.getError()),console.log(`PROGRAM_LINK_ERROR_END`)),h.useProgram(P);let F=new a(0,0,0,0,0,1e3);F.position=[0,0,5],o(F,p,m,v,y,this._shapeType,this._cameraZoom);let I=h.getAttribLocation(P,`position`),L=h.getAttribLocation(P,`normal`),R=h.getAttribLocation(P,`uv`);h.enableVertexAttribArray(I),h.bindBuffer(h.ARRAY_BUFFER,T),h.vertexAttribPointer(I,3,h.FLOAT,!1,0,0),h.enableVertexAttribArray(L),h.bindBuffer(h.ARRAY_BUFFER,E),h.vertexAttribPointer(L,3,h.FLOAT,!1,0,0),h.enableVertexAttribArray(R),h.bindBuffer(h.ARRAY_BUFFER,D),h.vertexAttribPointer(R,2,h.FLOAT,!1,0,0),h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,O);let z=h.getUniformLocation(P,`projectionMatrix`);h.uniformMatrix4fv(z,!1,F.projectionMatrix.elements);let B=h.getUniformLocation(P,`u_plane_width`);h.uniform1f(B,v);let V=h.getUniformLocation(P,`u_plane_height`);h.uniform1f(V,y);let H=h.getUniformLocation(P,`u_colors_count`);h.uniform1i(H,b);let U=`projectionMatrix.modelViewMatrix.u_time.u_resolution.u_color_pressure.u_wave_frequency_x.u_wave_frequency_y.u_wave_amplitude.u_colors_count.u_plane_width.u_plane_height.u_shadows.u_highlights.u_grain_intensity.u_grain_sparsity.u_grain_scale.u_grain_speed.u_flow_distortion_a.u_flow_distortion_b.u_flow_scale.u_flow_ease.u_flow_enabled.u_y_offset.u_y_offset_wave_multiplier.u_y_offset_color_multiplier.u_y_offset_flow_multiplier.u_procedural_texture.u_enable_procedural_texture.u_texture_ease.u_transparent_texture_void.u_saturation.u_brightness.u_color_blending.u_domain_warp_enabled.u_domain_warp_intensity.u_domain_warp_scale.u_vignette_intensity.u_vignette_radius.u_fresnel_enabled.u_fresnel_power.u_fresnel_intensity.u_fresnel_color.u_iridescence_enabled.u_iridescence_intensity.u_iridescence_speed.u_bloom_intensity.u_bloom_threshold.u_chromatic_aberration.u_shape_type.u_silhouette_fade.u_cylinder_fade.u_ribbon_fade.u_flat_shading`.split(`.`),W={attributes:{position:I,normal:L,uv:R},uniforms:{}};U.forEach(e=>{W.uniforms[e]=h.getUniformLocation(P,e)});for(let e=0;e<b;e++)W.uniforms[`u_colors[${e}].is_active`]=h.getUniformLocation(P,`u_colors[${e}].is_active`),W.uniforms[`u_colors[${e}].color`]=h.getUniformLocation(P,`u_colors[${e}].color`),W.uniforms[`u_colors[${e}].influence`]=h.getUniformLocation(P,`u_colors[${e}].influence`);return this._initialized=!0,this._uniformsDirty=!0,this._colorsChanged=!0,this._textureDirty=!0,h.enable(h.BLEND),h.blendFunc(h.SRC_ALPHA,h.ONE_MINUS_SRC_ALPHA),h.enable(h.DEPTH_TEST),{gl:h,program:P,buffers:{position:T,normal:E,uv:D,index:O,wireframeIndex:k},locations:W,camera:F,indexCount:C.length,wireframeIndexCount:w.length,indexType:C instanceof Uint32Array?h.UNSIGNED_INT:h.UNSIGNED_SHORT}}_createProceduralTexture(e){this._sourceCanvas||(this._sourceCanvas=document.createElement(`canvas`),this._sourceCanvas.width=1024,this._sourceCanvas.height=1024,this._sourceCtx=this._sourceCanvas.getContext(`2d`));let t=this._sourceCanvas,n=this._sourceCtx;if(!n)return null;let r=this._textureSeed,i=this._textureSeed;function a(){let e=Math.sin(r++)*1e4;return e-Math.floor(e)}let o=e=>{r=i+e},s=this._colors.filter(e=>e.enabled).map(e=>e.color);if(s.length===0)return null;let c=this._shapeType!==`plane`,l=c?[-1,0,1]:[0],u=c?[-1,0,1]:[0];function d(e){let t=parseInt(e.replace(`#`,``),16);return{r:t>>16&255,g:t>>8&255,b:t&255}}function f(e,t,n){return`#`+((1<<24)+(Math.round(e)<<16)+(Math.round(t)<<8)+Math.round(n)).toString(16).slice(1).padStart(6,`0`)}let p=()=>{let e=s[Math.floor(a()*s.length)],t=s[Math.floor(a()*s.length)],n=a()*this._textureColorBlending,r=d(e),i=d(t);return f(r.r+(i.r-r.r)*n,r.g+(i.g-r.g)*n,r.b+(i.b-r.b)*n)},m=this._proceduralBackgroundColor||`#000000`;n.fillStyle=m,n.fillRect(0,0,1024,1024);let h=n.createLinearGradient(0,0,0,1024);h.addColorStop(0,p()),h.addColorStop(1,p()),n.fillStyle=h,n.fillRect(0,0,1024,1024);for(let e=0;e<this._textureShapeTriangles;e++){let e=p(),t=a()*1024,r=a()*1024,i=100+a()*300,o=(a()-.5)*i,s=(a()-.5)*i,c=(a()-.5)*i,d=(a()-.5)*i;for(let i of l)for(let a of u){n.fillStyle=e,n.beginPath();let l=t+i*1024,u=r+a*1024;n.moveTo(l,u),n.lineTo(l+o,u+s),n.lineTo(l+c,u+d),n.fill()}}for(let e=0;e<this._textureShapeCircles;e++){let e=p(),t=10+a()*50,r=a()*1024,i=a()*1024,o=50+a()*150;for(let a of l)for(let s of u)n.strokeStyle=e,n.lineWidth=t,n.beginPath(),n.arc(r+a*1024,i+s*1024,o,0,Math.PI*2),n.stroke()}for(let e=0;e<this._textureShapeBars;e++){let e=p(),t=a()*1024,r=a()*1024,i=a()*Math.PI;for(let a of l)for(let o of u)n.fillStyle=e,n.save(),n.translate(t+a*1024,r+o*1024),n.rotate(i),n.fillRect(-150,-25,300,50),n.restore()}n.lineWidth=15,n.lineCap=`round`;for(let e=0;e<this._textureShapeSquiggles;e++){let e=p(),t=a()*1024,r=a()*1024,i=[],o=0,s=0;for(let e=0;e<4;e++){let e=o+(a()-.5)*300,t=s+(a()-.5)*300;i.push({cx1:o+(a()-.5)*300,cy1:s+(a()-.5)*300,cx2:o+(a()-.5)*300,cy2:s+(a()-.5)*300,ex:e,ey:t}),o=e,s=t}for(let a of l)for(let o of u){n.strokeStyle=e,n.beginPath();let s=t+a*1024,c=r+o*1024;n.moveTo(s,c);for(let e of i)n.bezierCurveTo(s+e.cx1,c+e.cy1,s+e.cx2,c+e.cy2,s+e.ex,c+e.ey);n.stroke()}}o(5e4),this._maskedCanvas||(this._maskedCanvas=document.createElement(`canvas`),this._maskedCanvas.width=1024,this._maskedCanvas.height=1024,this._maskedCtx=this._maskedCanvas.getContext(`2d`));let g=this._maskedCanvas,_=this._maskedCtx;if(!_)return null;this._transparentTextureVoid?_.clearRect(0,0,1024,1024):(_.fillStyle=m,_.fillRect(0,0,1024,1024));let v=0,y=[];for(;v<1024;)if(a()<this._textureVoidLikelihood){let e=this._textureVoidWidthMin+a()*(this._textureVoidWidthMax-this._textureVoidWidthMin);y.push({type:`void`,x:v,width:e}),v+=e}else{let e=50+a()*200;y.push({type:`matter`,x:v,width:e}),v+=e}for(let e of y)if(e.type===`matter`){let n=e.x,r=Math.min(e.x+e.width,1024),i=n;for(;i<r;){let e=(2+a()*20)/this._textureBandDensity,n=Math.floor(a()*1024);_.drawImage(t,n,0,e,1024,i,0,e,1024),i+=e}}let b=e.createTexture();e.bindTexture(e.TEXTURE_2D,b),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,g),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.generateMipmap(e.TEXTURE_2D);let x=e.getExtension(`EXT_texture_filter_anisotropic`)||e.getExtension(`MOZ_EXT_texture_filter_anisotropic`)||e.getExtension(`WEBKIT_EXT_texture_filter_anisotropic`);if(x){let t=e.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT);e.texParameterf(e.TEXTURE_2D,x.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(16,t))}return b}get fresnelColor(){return this._fresnelColor}set fresnelColor(e){this._fresnelColor!==e&&(this._fresnelColor=e,this._fresnelColorRgb=this._hexToRgb(e),this._uniformsDirty=!0)}get shapeType(){return this._shapeType}set shapeType(e){this._shapeType!==e&&(this._shapeType=e,this._updateGeometry())}get cameraLock(){return this._cameraLock}set cameraLock(e){this._cameraLock=e}get cameraZoom(){return this._cameraZoom}set cameraZoom(e){this._cameraZoom!==e&&(this._cameraZoom=e,this._updateCameraFrustum())}_updateCameraFrustum(){if(!this.glState)return;let e=this.glState.gl,t=this._ref.width,n=this._ref.height;o(this.glState.camera,t,n,v,y,this._shapeType,this._cameraZoom);let r=this.glState.locations.uniforms.projectionMatrix;e.useProgram(this.glState.program),r&&e.uniformMatrix4fv(r,!1,this.glState.camera.projectionMatrix.elements),this._uniformsDirty=!0}_initWatermark(){let e=this.glState.gl,t=e,n=typeof t.createVertexArray==`function`,r=e.createShader(e.VERTEX_SHADER);e.shaderSource(r,T),e.compileShader(r);let i=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(i,E),e.compileShader(i);let a=e.createProgram();e.attachShader(a,r),e.attachShader(a,i),e.linkProgram(a),this._watermarkProgram=a,e.deleteShader(r),e.deleteShader(i);let o=document.createElement(`canvas`).getContext(`2d`);o.font=`bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;let s=o.measureText(`NEAT`),c=Math.ceil(s.width)+12;this._watermarkWidth=c,this._watermarkHeight=23;let l=document.createElement(`canvas`);l.width=c,l.height=23;let u=l.getContext(`2d`);u.clearRect(0,0,c,23),u.shadowColor=`rgba(0,0,0,0.4)`,u.shadowBlur=2,u.shadowOffsetX=1,u.shadowOffsetY=1,u.font=`bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,u.textAlign=`center`,u.textBaseline=`middle`,u.fillStyle=`rgba(255,255,255,0.5)`,u.fillText(`NEAT`,c/2,23/2);let d=e.createTexture();e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,d),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,l),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),this._watermarkTexture=d;let f=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,f),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,1,1,1,0,0,1,0]),e.STATIC_DRAW),this._watermarkTexCoordBuffer=f;let p=e.createBuffer();if(e.bindBuffer(e.ARRAY_BUFFER,p),e.bufferData(e.ARRAY_BUFFER,new Float32Array(8),e.DYNAMIC_DRAW),this._watermarkBuffer=p,this._wmLocPos=e.getAttribLocation(a,`a_wm_position`),this._wmLocTc=e.getAttribLocation(a,`a_wm_texcoord`),this._wmLocTex=e.getUniformLocation(a,`u_wm_texture`),n){this._watermarkVAO=t.createVertexArray(),t.bindVertexArray(this._watermarkVAO),e.enableVertexAttribArray(this._wmLocPos),e.bindBuffer(e.ARRAY_BUFFER,p),e.vertexAttribPointer(this._wmLocPos,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(this._wmLocTc),e.bindBuffer(e.ARRAY_BUFFER,f),e.vertexAttribPointer(this._wmLocTc,2,e.FLOAT,!1,0,0),this._gradientVAO=t.createVertexArray(),t.bindVertexArray(this._gradientVAO);let n=this.glState.locations.attributes;e.enableVertexAttribArray(n.position),e.bindBuffer(e.ARRAY_BUFFER,this.glState.buffers.position),e.vertexAttribPointer(n.position,3,e.FLOAT,!1,0,0),e.enableVertexAttribArray(n.normal),e.bindBuffer(e.ARRAY_BUFFER,this.glState.buffers.normal),e.vertexAttribPointer(n.normal,3,e.FLOAT,!1,0,0),e.enableVertexAttribArray(n.uv),e.bindBuffer(e.ARRAY_BUFFER,this.glState.buffers.uv),e.vertexAttribPointer(n.uv,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.glState.buffers.index),t.bindVertexArray(this._gradientVAO)}this._wmClickHandler=e=>{this._licensed||this._isOverWatermark(e)&&(e.preventDefault(),e.stopPropagation(),window.open(`https://neat.firecms.co`,`_blank`,`noopener`))},this._wmMoveHandler=e=>{if(this._licensed){this._currentCursor!==``&&(this._currentCursor=``,this._ref.style.cursor=``,document.body.style.cursor=``);return}this._wmMoveRafPending||(this._wmMoveRafPending=!0,requestAnimationFrame(()=>{this._wmMoveRafPending=!1;let t=performance.now();(!this._wmCachedRect||t-this._wmRectCacheTime>500)&&(this._wmCachedRect=this._ref.getBoundingClientRect(),this._wmRectCacheTime=t);let n=this._wmCachedRect,r=e.clientX-n.left,i=e.clientY-n.top,a=n.width,o=n.height,s=``;if(r>=0&&i>=0&&r<=a&&i<=o){let e=this._watermarkMargin,t=this._watermarkWidth,n=this._watermarkHeight,c=a-e-t,l=o-e-n;r>=c&&r<=a-e&&i>=l&&i<=o-e&&(s=`pointer`)}this._currentCursor!==s&&(this._currentCursor=s,this._ref.style.cursor=s,document.body.style.cursor=s)}))},document.addEventListener(`click`,this._wmClickHandler,!0),document.addEventListener(`mousemove`,this._wmMoveHandler)}_isOverWatermark(e){this._wmCachedRect||(this._wmCachedRect=this._ref.getBoundingClientRect(),this._wmRectCacheTime=performance.now());let t=this._wmCachedRect,n=e.clientX-t.left,r=e.clientY-t.top,i=t.width,a=t.height;if(n<0||r<0||n>i||r>a)return!1;let o=this._watermarkMargin,s=this._watermarkWidth,c=this._watermarkHeight,l=i-o-s,u=a-o-c;return n>=l&&n<=i-o&&r>=u&&r<=a-o}_renderWatermark(e){let t=this._watermarkProgram,n=this._watermarkTexture,r=this._watermarkBuffer;if(!t||!n||!r)return;let i=this._ref.width,a=this._ref.height;if(i===0||a===0)return;let o=this._watermarkWidth,s=this._watermarkHeight,c=1-4/i*2,l=c-o/i*2,u=-1+4/a*2,d=u+s/a*2,f=this._wmPosData;f[0]=l,f[1]=u,f[2]=c,f[3]=u,f[4]=l,f[5]=d,f[6]=c,f[7]=d,e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferSubData(e.ARRAY_BUFFER,0,f);let p=e,m=this._watermarkVAO!==null;if(e.useProgram(t),e.disable(e.DEPTH_TEST),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),m?(p.bindVertexArray(this._watermarkVAO),e.bindBuffer(e.ARRAY_BUFFER,r),e.vertexAttribPointer(this._wmLocPos,2,e.FLOAT,!1,0,0)):(e.enableVertexAttribArray(this._wmLocPos),e.bindBuffer(e.ARRAY_BUFFER,r),e.vertexAttribPointer(this._wmLocPos,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(this._wmLocTc),e.bindBuffer(e.ARRAY_BUFFER,this._watermarkTexCoordBuffer),e.vertexAttribPointer(this._wmLocTc,2,e.FLOAT,!1,0,0)),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,n),e.uniform1i(this._wmLocTex,2),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.enable(e.DEPTH_TEST),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.useProgram(this.glState.program),m)p.bindVertexArray(this._gradientVAO);else{let t=this.glState.locations.attributes;e.enableVertexAttribArray(t.position),e.bindBuffer(e.ARRAY_BUFFER,this.glState.buffers.position),e.vertexAttribPointer(t.position,3,e.FLOAT,!1,0,0),e.enableVertexAttribArray(t.normal),e.bindBuffer(e.ARRAY_BUFFER,this.glState.buffers.normal),e.vertexAttribPointer(t.normal,3,e.FLOAT,!1,0,0),e.enableVertexAttribArray(t.uv),e.bindBuffer(e.ARRAY_BUFFER,this.glState.buffers.uv),e.vertexAttribPointer(t.uv,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.glState.buffers.index)}}};for(let[e,t,n,r,i]of x)Object.defineProperty(S.prototype,e,{get(){return n===1?this[t]:this[t]*n},set(e){let n=r===1?e:e*r;this[t]!==n&&(this[t]=n,this._uniformsDirty=!0,i===`t`&&this._enableProceduralTexture?this._textureNeedsUpdate=!0:i===`g`&&this._updateGeometry())},enumerable:!0,configurable:!0});function C(){let e=new Date,t=e.getMinutes(),n=e.getSeconds();return t*60+n}function w(){if(document.querySelector(`meta[name="generator"][content*="NEAT"]`))return;let e=document.createElement(`meta`);e.name=`generator`,e.content=`NEAT by FireCMS — https://neat.firecms.co`,document.head.appendChild(e)}var T=`
attribute vec2 a_wm_position;
attribute vec2 a_wm_texcoord;
varying vec2 v_wm_texcoord;
void main() {
    gl_Position = vec4(a_wm_position, 0.0, 1.0);
    v_wm_texcoord = a_wm_texcoord;
}
`,E=`
precision mediump float;
varying vec2 v_wm_texcoord;
uniform sampler2D u_wm_texture;
void main() {
    gl_FragColor = texture2D(u_wm_texture, v_wm_texcoord);
}
`;export{S as NeatGradient};