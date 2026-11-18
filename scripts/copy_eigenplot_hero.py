"""Copy the locally rendered EigenPlot3D demo image into Next.js public assets."""
from pathlib import Path
import shutil

root = Path(__file__).resolve().parents[2]
source = root / "Nematics3D/packages/eigenplot3d/demo/figures/main.png"
destination = root / "personal-website/public/images/eigenplot3d/vector-field-main.png"
if not source.is_file():
    raise FileNotFoundError(source)
destination.parent.mkdir(parents=True, exist_ok=True)
shutil.copy2(source, destination)
print(f"Copied {source} -> {destination}")
