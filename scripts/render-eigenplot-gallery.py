"""Regenerate 6 actual EigenPlot3D Gallery screenshots using the public API.

Run in an environment with NumPy, PyVista, ssom and EigenPlot3D installed.
"""
from __future__ import annotations
import sys
from pathlib import Path
import numpy as np
import pyvista as pv

SITE = Path(__file__).resolve().parents[1]
PACKAGES = SITE.parent / "Nematics3D" / "packages"
for package in ("eigenplot3d", "ssom"):
    source = PACKAGES / package / "src"
    if source.is_dir():
        sys.path.insert(0, str(source))
from eigenplot3d.visual import PlotDelaunay, PlotFigure, PlotPolyData, PlotRod, PlotSphere, PlotTube, PlotVector

OUT = SITE / "public" / "images" / "eigenplot3d" / "gallery"
OUT.mkdir(parents=True, exist_ok=True)
BLUE, ORANGE = np.array((.11, .35, .57)), np.array((.97, .44, .22))

def ramp(values):
    values = np.asarray(values, dtype=float).reshape(-1)
    v = (values - values.min()) / max(np.ptp(values), 1e-9)
    return BLUE[None, :] * (1-v[:, None]) + ORANGE[None, :] * v[:, None]

def figure(name):
    fig = PlotFigure(name=name, is_off_screen=True)
    fig.opts.bg_color = (.965, .976, .987)
    return fig

def export(name, fig, zoom=1.20):
    fig.pl.camera_position = "iso"
    fig.pl.reset_camera()
    fig.pl.camera.zoom(zoom)
    output = OUT / f"{name}.png"
    fig.act_savefig(str(output), window_size=(900, 560))
    fig.pl.close()
    if output.stat().st_size < 6000:
        raise RuntimeError(f"Unexpectedly small screenshot: {output}")
    print(f"{name}: {output.stat().st_size:,} bytes", flush=True)

# Sphere centers are coordinates; radius is a per-point input.
t = np.linspace(0, 4.5 * np.pi, 36)
coords = np.column_stack((.75*np.cos(t), .75*np.sin(t), np.linspace(-1,1,len(t))))
fig = figure("PlotSphere")
PlotSphere(coords=coords, radius=.095 + .055*(1+np.sin(1.3*t))/2, color=ramp(t), figure=fig)
export("sphere", fig, 1.23)

# Rod directors are given by centers and axes (head-tail symmetric).
x, y = np.meshgrid(np.linspace(-1.15,1.15,9), np.linspace(-1.15,1.15,9))
coords = np.column_stack((x.ravel(),y.ravel(),np.zeros(x.size)))
phi = .5*np.arctan2(y.ravel(),x.ravel()+.001)
directions = np.column_stack((np.cos(phi),np.sin(phi),.22*np.sin(x.ravel())))
fig = figure("PlotRod")
PlotRod(coords=coords, orient=directions, length=.38, radius=.037, color=ramp(phi), figure=fig)
export("rod", fig, 1.18)

# PlotVector with one length per arrow, derived from the vector field.
x, y = np.meshgrid(np.linspace(-1.55,1.55,9), np.linspace(-1.55,1.55,9))
coords = np.column_stack((x.ravel(),y.ravel(),np.zeros(x.size)))
r2 = x.ravel()**2 + y.ravel()**2
vectors = np.column_stack((-y.ravel(),x.ravel(),.55+.75*np.exp(-r2)))
magnitude = np.linalg.norm(vectors,axis=1)
color = ramp(magnitude)
# PlotVector.length already accepts an (N,) array, as confirmed in source.
lengths = .16 + .65*(magnitude-magnitude.min())/max(np.ptp(magnitude),1e-9)
fig = figure("PlotVector variable")
PlotVector(coords=coords, orient=vectors, length=lengths, radius=.033, color=color, figure=fig)
export("vector-variable",fig,1.15)

# Tube centerline is an ordered 3D curve, with radius defined per sample.
t = np.linspace(0,4*np.pi,220)
coords = np.column_stack((.78*np.cos(t),.78*np.sin(t),.42*(t/np.pi-2)))
radii = .055 + .05*(1+np.sin(1.2*t))/2
fig = figure("PlotTube")
PlotTube(coords=coords, radius=radii, color=ramp(t), figure=fig)
export("tube",fig,1.32)

# Surface reconstruction: xyz samples, with connectivity inferred by Delaunay.
u,v = np.meshgrid(np.linspace(-1.25,1.25,30),np.linspace(-1.25,1.25,30))
z = .45*np.sin(2.3*u)*np.cos(2.5*v)+.18*np.exp(-3*(u*u+v*v))
coords = np.column_stack((u.ravel(),v.ravel(),z.ravel()))
fig = figure("PlotDelaunay")
PlotDelaunay(coords=coords, color=ramp(coords[:,2]), figure=fig)
export("delaunay",fig,1.24)

# Mesh: construct a torus from vertices and explicit triangle faces.
nu,nv = 54,28
u,v = np.meshgrid(np.arange(nu)*2*np.pi/nu,np.arange(nv)*2*np.pi/nv,indexing="ij")
R,r = .88,.32
vertices = np.column_stack(((R+r*np.cos(v)).ravel()*np.cos(u).ravel(),
                            (R+r*np.cos(v)).ravel()*np.sin(u).ravel(),
                            (r*np.sin(v)).ravel()))
faces = []
for i in range(nu):
    for j in range(nv):
        a,b,c,d = i*nv+j,((i+1)%nu)*nv+j,((i+1)%nu)*nv+(j+1)%nv,i*nv+(j+1)%nv
        faces.extend(((3,a,b,c),(3,a,c,d)))
mesh = pv.PolyData(vertices,np.asarray(faces,dtype=np.int64))
fig = figure("PlotPolyData")
PlotPolyData(polydata=mesh, color=ramp(vertices[:,2]), is_show_edges=True, edge_color=(.34,.46,.59), edge_width=.65, figure=fig)
export("polydata",fig)

# Remove screenshots from earlier Gallery versions that are no longer displayed.
for obsolete in ("vector-fixed.png", "extent.png"):
    (OUT / obsolete).unlink(missing_ok=True)

print("Generated six screenshots under",OUT)
