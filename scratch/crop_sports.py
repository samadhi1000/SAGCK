import os
from PIL import Image

def tight_crop(img, bg_color=(255, 255, 255)):
    # Find bounding box of non-white pixels
    img_rgba = img.convert("RGBA")
    width, height = img_rgba.size
    pixels = img_rgba.load()
    
    min_x, min_y = width, height
    max_x, max_y = -1, -1
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            # If the pixel is not white (thresholding for scanning/jpeg artifacts)
            if r < 245 or g < 245 or b < 245:
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y
                
    if max_x == -1: # No non-white pixels found
        return img
        
    # Add a small padding of 15 pixels
    pad = 15
    min_x = max(0, min_x - pad)
    min_y = max(0, min_y - pad)
    max_x = min(width, max_x + pad)
    max_y = min(height, max_y + pad)
    
    return img.crop((min_x, min_y, max_x, max_y))

def crop_sports():
    sheet_path = r"C:\Users\Thusitha\.gemini\antigravity\brain\6bdd30ec-2712-406b-b43c-c95e767ff216\media__1784359222453.jpg"
    cricket_path = r"C:\Users\Thusitha\.gemini\antigravity\brain\6bdd30ec-2712-406b-b43c-c95e767ff216\media__1784359222618.jpg"
    out_dir = r"public\images\sports"
    
    os.makedirs(out_dir, exist_ok=True)
    
    # Load sheet
    sheet = Image.open(sheet_path)
    w, h = sheet.size
    
    # Define quadrants for the 5 sports on the sheet
    # 1. Athletics (top-left runner with blue splash)
    athletics_quad = (0, 0, int(w * 0.40), int(h * 0.48))
    # 2. Basketball & Netball (top-middle player with green splash)
    netball_quad = (int(w * 0.40), 0, int(w * 0.68), int(h * 0.48))
    # 3. Swimming (bottom-right swimmer with teal splash)
    swimming_quad = (int(w * 0.62), int(h * 0.62), w, h)
    # 4. Chess (bottom-left hand with purple splash)
    chess_quad = (0, int(h * 0.52), int(w * 0.38), h)
    # 5. Scouting & Cadet (bottom-middle cadet saluting with gold splash)
    cadet_quad = (int(w * 0.36), int(h * 0.48), int(w * 0.62), h)
    
    # Crops & Saves
    sports_to_crop = {
        "athletics": athletics_quad,
        "basketball_netball": netball_quad,
        "swimming": swimming_quad,
        "chess": chess_quad,
        "scouting_cadet": cadet_quad
    }
    
    for name, quad in sports_to_crop.items():
        cropped_sub = sheet.crop(quad)
        cropped_tight = tight_crop(cropped_sub)
        cropped_tight.save(os.path.join(out_dir, f"{name}.png"), "PNG")
        print(f"Saved {name}.png: size {cropped_tight.size}")
        
    # Load and crop cricket
    cricket_img = Image.open(cricket_path)
    cricket_tight = tight_crop(cricket_img)
    cricket_tight.save(os.path.join(out_dir, "cricket.png"), "PNG")
    print(f"Saved cricket.png: size {cricket_tight.size}")

if __name__ == "__main__":
    crop_sports()
