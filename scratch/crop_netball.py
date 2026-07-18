import os
from PIL import Image

def tight_crop(img):
    img_rgba = img.convert("RGBA")
    width, height = img_rgba.size
    pixels = img_rgba.load()
    
    min_x, min_y = width, height
    max_x, max_y = -1, -1
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if r < 248 or g < 248 or b < 248:
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y
                
    if max_x == -1:
        return img
        
    pad = 4
    min_x = max(0, min_x - pad)
    min_y = max(0, min_y - pad)
    max_x = min(width, max_x + pad)
    max_y = min(height, max_y + pad)
    
    return img.crop((min_x, min_y, max_x, max_y))

def make_transparent(img):
    width, height = img.size
    pixels = img.load()
    
    visited = set()
    queue = []
    
    def is_bg(x, y):
        r, g, b, a = pixels[x, y]
        return a == 0 or (r >= 230 and g >= 230 and b >= 230)

    for x in range(width):
        for y in [0, height - 1]:
            if is_bg(x, y):
                queue.append((x, y))
                visited.add((x, y))
                
    for y in range(height):
        for x in [0, width - 1]:
            if is_bg(x, y) and (x, y) not in visited:
                queue.append((x, y))
                visited.add((x, y))
                
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]
    while queue:
        cx, cy = queue.pop(0)
        for dx, dy in directions:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < width and 0 <= ny < height:
                if (nx, ny) not in visited:
                    if is_bg(nx, ny):
                        visited.add((nx, ny))
                        queue.append((nx, ny))
                        
    for y in range(height):
        for x in range(width):
            if (x, y) in visited:
                pixels[x, y] = (0, 0, 0, 0)
                
    return img

def fix_netball():
    sheet_path = r"C:\Users\Thusitha\.gemini\antigravity\brain\6bdd30ec-2712-406b-b43c-c95e767ff216\media__1784359222453.jpg"
    out_path = r"public\images\sports\basketball_netball.png"
    
    sheet = Image.open(sheet_path).convert("RGBA")
    w, h = sheet.size
    
    # 1. Crop a wider quadrant to ensure hand/arm is 100% inside
    # (from 37% of width to 67% of width)
    netball_quad = (int(w * 0.37), 0, int(w * 0.67), int(h * 0.48))
    cropped = sheet.crop(netball_quad)
    
    cw, ch = cropped.size
    pixels = cropped.load()
    
    # 2. Erase neighbor colors (blue runner splash on left, red sprinter splash on right)
    # A pixel is blueish if B is dominant, reddish if R is dominant.
    # We turn them to solid white so the crop & transparency ignores them!
    for y in range(ch):
        for x in range(cw):
            r, g, b, a = pixels[x, y]
            # Detect blue splash (B is significantly greater than R and G)
            if b > 90 and (b - g) > 15 and (b - r) > 15:
                pixels[x, y] = (255, 255, 255, 255)
            # Detect red splash (R is significantly greater than G and B)
            elif r > 90 and (r - g) > 15 and (r - b) > 15:
                pixels[x, y] = (255, 255, 255, 255)
                
    # 3. Apply tight crop on the cleaned image
    cropped_tight = tight_crop(cropped)
    
    # 4. Make background transparent
    transparent_img = make_transparent(cropped_tight)
    
    # 5. Save output
    transparent_img.save(out_path, "PNG")
    print(f"Success! Saved basketball_netball.png with size {transparent_img.size}")

if __name__ == "__main__":
    fix_netball()
