import * as Phaser from 'phaser';

export default class Blood {
    constructor () {
        const frag = `
            #ifdef GL_ES
            precision highp float;
            #endif
            
            uniform vec2 resolution;
            uniform float dtime;
            
            float DE( vec2 pp, out bool blood, float t )
            {
                pp.y += (
                    .4 * sin(.5*2.3*pp.x+pp.y) +
                    .2 * sin(.5*5.5*pp.x+pp.y) +
                    0.1*sin(.5*13.7*pp.x)+
                    0.06*sin(.5*23.*pp.x));
                
                pp += vec2(0.,0.4)*t;
                
                float thresh = 5.3;
                
                blood = pp.y > thresh;
                
                float d = abs(pp.y - thresh);
                // todo use proper implicit dist
                //d /= sqrt(1.+grad*grad);
                return d;
            }
            
            vec3 sceneColour( in vec2 pp )
            {
                float endTime = 5.;
                float rewind = 2.;
                float t = dtime * 0.1;
                
                
                bool blood;
                float d = DE( pp, blood, t );
                
                if( !blood )
                {
                    vec3 floorCol = vec3(.25);
                    
                    floorCol = vec3(0.0,0.0,0.0);
                    float floori = (floorCol.x+floorCol.y+floorCol.z)/3.;
                    
                    floori = smoothstep(0.5,.53,floori) ;
                    floori = smoothstep(-5.15,1.,floori);
                    floori = 1.-floori;
                    floorCol = vec3(floori);
                    
                    float ao = clamp( smoothstep(0.,.2,d), 0., 1.);
                    return mix(1.,sqrt(ao),.25) * floorCol;
                }
                else
                {
                    float h = clamp( smoothstep(.0,.25,d), 0., 1.);
                    h = 4.*pow(h,.2);
                    vec3 N = vec3(1., 1., -1. );
                    N = normalize(N);
                    vec3 L = normalize(vec3(.5,.7,-.5));
                    vec3 res = pow(dot(N,L),10.)*vec3(1.);
                    res += vec3(.2,-1.2,-1.2);
                    return res;
                }
            }
            
            void main(void) {
                vec2 uv = gl_FragCoord.xy / resolution.xy;
                uv.x /= resolution.y/resolution.x;
                
                gl_FragColor.a = 0.0;
                gl_FragColor.xyz = sceneColour(uv*8.);
            }
        `

        this.shader = new Phaser.Display.BaseShader('blood', frag, undefined, {
            dtime: {type: '1f', value: 0.0}
        });

        return this.shader;
    }
}