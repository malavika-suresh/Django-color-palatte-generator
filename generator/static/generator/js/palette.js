/* Utility: hex <-> hsl conversions */
function hexToRgb(hex){
  hex = hex.replace('#','');
  if(hex.length === 3) hex = hex.split('').map(c=>c+c).join('');
  const n = parseInt(hex,16);
  return { r: (n>>16)&255, g: (n>>8)&255, b: n&255 };
}
function rgbToHex(r,g,b){
  return "#" + [r,g,b].map(x => x.toString(16).padStart(2,'0')).join('').toUpperCase();
}
function rgbToHsl(r,g,b){
  r/=255; g/=255; b/=255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h=0, s=0, l=(max+min)/2;
  if(max!==min){
    const d = max-min;
    s = l>0.5 ? d/(2-max-min): d/(max+min);
    switch(max){
      case r: h=(g-b)/d + (g<b?6:0); break;
      case g: h=(b-r)/d + 2; break;
      case b: h=(r-g)/d + 4; break;
    }
    h = h*60;
  }
  return [Math.round(h), Math.round(s*100), Math.round(l*100)];
}
function hslToRgb(h,s,l){
  s/=100; l/=100;
  const c = (1 - Math.abs(2*l - 1)) * s;
  const hh = h/60;
  const x = c * (1 - Math.abs(hh % 2 - 1));
  let [r1,g1,b1] = [0,0,0];
  if(hh >= 0 && hh < 1){ r1=c; g1=x; b1=0; }
  else if(hh < 2){ r1=x; g1=c; b1=0; }
  else if(hh < 3){ r1=0; g1=c; b1=x; }
  else if(hh < 4){ r1=0; g1=x; b1=c; }
  else if(hh < 5){ r1=x; g1=0; b1=c; }
  else { r1=c; g1=0; b1=x; }
  const m = l - c/2;
  const r = Math.round((r1+m)*255);
  const g = Math.round((g1+m)*255);
  const b = Math.round((b1+m)*255);
  return {r,g,b};
}
function bestTextColor(hex){
  const {r,g,b} = hexToRgb(hex);
  const luminance = (0.299*r + 0.587*g + 0.114*b);
  return luminance > 150 ? '#000' : '#fff';
}

/* Color scheme generators */
function genAnalogous(h,s,l){
  return [-60,-30,0,30,60].map(offset => {
    const H = (h + offset + 360) % 360;
    return rgbToHex(...Object.values(hslToRgb(H,s,l)));
  });
}
function genComplementary(h,s,l){
  const comp = (h+180) % 360;
  return [h, comp, (comp+20)%360, (comp-20+360)%360, (h+10)%360]
    .map(H => rgbToHex(...Object.values(hslToRgb(H,s,l))));
}
function genTriadic(h,s,l){
  return [h, (h+120)%360, (h+240)%360, (h+60)%360, (h+300)%360]
    .map(H => rgbToHex(...Object.values(hslToRgb(H,s,l))));
}
function genSplit(h,s,l){
  const comp = (h + 180) % 360;
  return [h, (comp+30)%360, (comp-30+360)%360, (h+25)%360, (h-25+360)%360]
    .map(H => rgbToHex(...Object.values(hslToRgb(H,s,l))));
}
function genMono(h,s,l){
  const steps = [85,70,55,40,20];
  return steps.map(L => rgbToHex(...Object.values(hslToRgb(h, s, L))));
}

/* UI building */
function buildColumns(colors){
  const palette = document.getElementById('palette');
  palette.innerHTML = '';
  colors.forEach(hex => {
    const col = document.createElement('div');
    col.className = 'color-column';
    col.style.background = hex;
    col.style.color = bestTextColor(hex);
    col.textContent = hex;
    col.addEventListener('click', () => {
      navigator.clipboard.writeText(hex).then(showCopied);
    });
    palette.appendChild(col);
  });
}

const picker = document.getElementById('colorPicker');
const schemeSel = document.getElementById('scheme');
document.getElementById('generateBtn').addEventListener('click', generate);

function showCopied(){
  const el = document.getElementById('copied');
  el.style.display='inline';
  clearTimeout(window._copiedTimeout);
  window._copiedTimeout = setTimeout(()=> el.style.display='none',800);
}

function generate(){
  const base = picker.value;
  const [h,s,l] = rgbToHsl(...Object.values(hexToRgb(base)));
  let colors = [];
  switch(schemeSel.value){
    case 'analogous': colors = genAnalogous(h,s,l); break;
    case 'complementary': colors = genComplementary(h,s,l); break;
    case 'triadic': colors = genTriadic(h,s,l); break;
    case 'split': colors = genSplit(h,s,l); break;
    case 'monochrome': colors = genMono(h,s,l); break;
    default: colors = genTriadic(h,s,l);
  }
  buildColumns(colors);
}
generate();
