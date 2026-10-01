from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
WIDTH, HEIGHT = 1200, 630

background = Image.new("RGB", (WIDTH, HEIGHT), "#09090b")
glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
brush = ImageDraw.Draw(glow)
brush.ellipse((620, -240, 1400, 540), fill=(72, 97, 188, 120))
brush.ellipse((-260, 250, 500, 940), fill=(40, 131, 161, 70))
background = Image.alpha_composite(background.convert("RGBA"), glow.filter(ImageFilter.GaussianBlur(95)))

panel = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
draw = ImageDraw.Draw(panel)
draw.rounded_rectangle((64, 70, 1136, 560), radius=42, fill=(255, 255, 255, 19), outline=(255, 255, 255, 65), width=2)
draw.rounded_rectangle((94, 100, 324, 146), radius=23, fill=(255, 255, 255, 26), outline=(255, 255, 255, 70))
background = Image.alpha_composite(background, panel)

font_dir = Path("C:/Windows/Fonts")
regular = font_dir / "segoeui.ttf"
bold = font_dir / "segoeuib.ttf"
draw = ImageDraw.Draw(background)
draw.text((119, 110), "birolweb.dev", font=ImageFont.truetype(str(regular), 24), fill="#dbeafe")
draw.text((108, 215), "Birol Bulut", font=ImageFont.truetype(str(bold), 78), fill="white")
draw.text((110, 327), "Full Stack Developer", font=ImageFont.truetype(str(regular), 39), fill="#c7d2fe")
draw.text((110, 440), "React   ·   Spring Boot   ·   PostgreSQL", font=ImageFont.truetype(str(regular), 27), fill="#b3b7c6")
background.convert("RGB").save(ROOT / "public" / "social-card.png", optimize=True)
