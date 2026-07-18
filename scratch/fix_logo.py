import os
from PIL import Image

def fix_logo():
    logo_path = r"public\images\logo.png"
    if not os.path.exists(logo_path):
        print(f"Error: {logo_path} does not exist.")
        return
        
    img = Image.open(logo_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    # Run BFS from the border pixels to find all external transparent pixels
    visited = set()
    queue = []
    
    # Add all border pixels to queue if they are transparent
    for x in range(width):
        for y in [0, height - 1]:
            r, g, b, a = pixels[x, y]
            if a < 15: # transparent threshold
                queue.append((x, y))
                visited.add((x, y))
                
    for y in range(height):
        for x in [0, width - 1]:
            r, g, b, a = pixels[x, y]
            if a < 15 and (x, y) not in visited:
                queue.append((x, y))
                visited.add((x, y))
                
    # BFS to find all connected transparent pixels (exterior background)
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]
    while queue:
        cx, cy = queue.pop(0)
        for dx, dy in directions:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < width and 0 <= ny < height:
                if (nx, ny) not in visited:
                    r, g, b, a = pixels[nx, ny]
                    if a < 15:
                        visited.add((nx, ny))
                        queue.append((nx, ny))
                        
    # Now, any transparent pixel (alpha < 15) that is NOT visited is inside the shield.
    # Fill these with solid white (255, 255, 255, 255).
    filled_count = 0
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a < 15 and (x, y) not in visited:
                pixels[x, y] = (255, 255, 255, 255)
                filled_count += 1
                
    img.save(logo_path, "PNG")
    print(f"Success! Filled {filled_count} interior transparent pixels with solid white.")

if __name__ == "__main__":
    fix_logo()
