import os
from PIL import Image

def apply_school_theme(file_path):
    if not os.path.exists(file_path):
        print(f"Error: {file_path} does not exist.")
        return
        
    img = Image.open(file_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    # Brand Colors:
    # Navy: (10, 37, 64)
    # Royal Blue: (37, 99, 235)
    # Gold: (212, 175, 55)
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a > 0:
                # Calculate saturation
                sat = max(r, g, b) - min(r, g, b)
                
                # Grayscale value for brightness mapping
                v = int(0.299 * r + 0.587 * g + 0.114 * b)
                
                if sat >= 28: # Colorful Splash
                    # Map v (from ~80 to ~230) to a normalized value t between 0 and 1
                    t = (v - 95) / (225 - 95)
                    t = max(0.0, min(1.0, t))
                    
                    # 3-stop interpolation: Navy -> Royal Blue -> Gold
                    if t < 0.45:
                        # Interpolate Navy (10, 37, 64) -> Royal Blue (37, 99, 235)
                        factor = t / 0.45
                        nr = int((1.0 - factor) * 10 + factor * 37)
                        ng = int((1.0 - factor) * 37 + factor * 99)
                        nb = int((1.0 - factor) * 64 + factor * 235)
                    else:
                        # Interpolate Royal Blue (37, 99, 235) -> Gold (212, 175, 55)
                        factor = (t - 0.45) / 0.55
                        nr = int((1.0 - factor) * 37 + factor * 212)
                        ng = int((1.0 - factor) * 99 + factor * 175)
                        nb = int((1.0 - factor) * 235 + factor * 55)
                        
                    pixels[x, y] = (nr, ng, nb, a)
                else: # Monochrome Sketch (Outlines/Shades)
                    # Convert to clean grayscale to remove JPEG color noise
                    pixels[x, y] = (v, v, v, a)
                    
    img.save(file_path, "PNG")
    print(f"Theme applied successfully to {os.path.basename(file_path)}")

def process_all():
    sports_dir = r"public\images\sports"
    sports_images = [
        "athletics.png",
        "basketball_netball.png",
        "swimming.png",
        "chess.png",
        "scouting_cadet.png",
        "cricket.png"
    ]
    
    for filename in sports_images:
        path = os.path.join(sports_dir, filename)
        apply_school_theme(path)

if __name__ == "__main__":
    process_all()
