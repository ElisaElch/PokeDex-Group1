<script src="https://cdn.tailwindcss.com"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bungee&family=Baloo+2:wght@500;600;700;800&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          gold:      '#C6A24A',
          cream:     '#FBF6E9',
          cardcream: '#F6ECC9',
          red:       '#C0272D',
          redlt:     '#D8474D',
          forest:    '#1E3A2B',
        },
        fontFamily: {
          display: ['Bungee', 'sans-serif'],
          name: ['Baloo 2', 'sans-serif'],
          body: ['Nunito', 'sans-serif'],
        }
      }
    }
  }
</script>

Add class="font-body bg-cream text-forest" to your <body> tag on both pages — that sets the default font and background site-wide.
Reusable class recipes — since everyone's building different components, paste these exact strings so cards/buttons/inputs look identical no matter who wrote the HTML:
ElementTailwind classesCard containerbg-cardcream border-[3px] border-gold rounded-2xl p-5Primary button (Catch)bg-gold text-forest font-name font-bold py-2 px-5 rounded-fullSecondary button (Search/Release)bg-red text-cream font-name font-bold py-2 px-5 rounded-fullOutline buttonborder-2 border-forest text-forest font-name font-bold py-2 px-5 rounded-fullText inputbg-white/70 border-2 border-gold rounded-full px-4 py-2 font-body font-semiboldPage titlefont-display text-red text-2xlPokémon namefont-name font-extrabold text-lgStats/labelsfont-body font-extrabold text-xs text-forest/60Navbarbg-cardcream border-b-2 border-gold px-8 py-4 flex items-center justify-between