import os
from PIL import Image

def make_transparent(file_path):
    if not os.path.exists(file_path):
        print(f"Error: {file_path} does not exist.")
        return
        
    img = Image.open(file_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    # BFS to find all external off-white background pixels
    visited = set()
    queue = []
    
    # Threshold for off-white: if all RGB components are >= 230
    def is_bg(x, y):
        r, g, b, a = pixels[x, y]
        # Already transparent or close to white/light-grey
        return a == 0 or (r >= 230 and g >= 230 and b >= 230)

    # Initialize queue with all border pixels
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
                
    # Run BFS
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
                        
    # Make all external background pixels transparent
    changed_count = 0
    for y in range(height):
        for x in range(width):
            if (x, y) in visited:
                pixels[x, y] = (0, 0, 0, 0)
                changed_count += 1
                
    # Save the modified image
    img.save(file_path, "PNG")
    print(f"Processed {os.path.basename(file_path)}: Made {changed_count} pixels transparent.")

def process_all_sports():
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
        make_transparent(path)

if __name__ == "__main__":
    process_all_sports()
