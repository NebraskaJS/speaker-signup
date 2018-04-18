import Typography from 'typography';
import noriegaTheme from 'typography-theme-noriega';

let latoIndex = noriegaTheme.googleFonts.findIndex(
  font => font.name === 'Lato'
);
let lato = noriegaTheme.googleFonts[latoIndex];
lato.styles.push('900');

noriegaTheme.googleFonts[latoIndex] = lato;
noriegaTheme.headerWeight = 900;

export default new Typography(noriegaTheme);
