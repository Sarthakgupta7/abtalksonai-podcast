import {ShaderGradient,ShaderGradientCanvas} from '@shadergradient/react';
export default function GoldShader({phone}:{phone:boolean}){
 return <div className="gold-shader"><ShaderGradientCanvas style={{width:'100%',height:'100%'}} pixelDensity={phone?.65:1} pointerEvents="none" powerPreference="low-power" lazyLoad={false}>
  <ShaderGradient control="props" type="waterPlane" animate="on" color1="#171511" color2="#b48a42" color3="#40311e" uSpeed={.12} uStrength={2.2} uDensity={1.4} uFrequency={3.5} uAmplitude={.8} cDistance={4.2} cPolarAngle={80} cAzimuthAngle={180} rotationX={0} rotationY={0} rotationZ={45} lightType="3d" brightness={1.1} grain="off" reflection={0} enableTransition={false}/>
 </ShaderGradientCanvas></div>;
}
